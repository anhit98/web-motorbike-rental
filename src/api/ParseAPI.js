import _ from 'lodash';

const TIME_OUT = 15000;

const checkIfErrorOccurs = res => {
  return {
    code: res.status,
    res,
  };
};

async function xfetch(path, headerOptions, ops = { noParse: false }) {
  const normalFetch = fetch(path, headerOptions);
  if (ops.noParse) {
    return timeoutPromise(TIME_OUT, normalFetch);
  }
  const res = await timeoutPromise(TIME_OUT, normalFetch.then(checkIfErrorOccurs));
  const response = await res.res.json();
  if (res.code < 300) {
    return response;
  }
  // eslint-disable-next-line
  throw {
    code: res.code,
    message: response.error,
  };
}

export const timeoutPromise = function(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('request time out'));
    }, ms);
    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });
};

export default xfetch;

function requestWrapper(method) {
  return async function(url, data = null, params = {}) {
    let urlReq = process.env.REACT_APP_SERVER_URL + url;
    let paramsReq = params;
    let dataReq;
    if (method === 'GET') {
      // is it a GET?
      // GET doesn't have data
      paramsReq = data;
      if (paramsReq !== null) {
        urlReq = `${urlReq}?${getQueryString(paramsReq)}`;
      }
    } else if (data === Object(data)) {
      // (data === Object(data)) === _.isObject(data)
      dataReq = JSON.stringify(data);
    }

    // default params for fetch = method + (Content-Type)
    const defaults = {
      method,
      headers: {
        'X-Parse-Application-Id': process.env.REACT_APP_PARSE_APP_ID,
        'X-Parse-REST-API-Key': process.env.REACT_APP_PARSE_REST_API_KEY,
      },
    };

    // check that req url is relative and request was sent to our domain
    let token = null;
    if (sessionStorage.getItem('sessionToken')) {
      token = sessionStorage.getItem('sessionToken');
    }
    if (token) {
      defaults.headers['X-Parse-Session-Token'] = token;
    }

    if (method === 'POST' || method === 'PUT') {
      defaults.headers.Accept = 'application/json';
      defaults.headers['Content-Type'] = 'application/json';
    }

    if (dataReq) {
      defaults.body = dataReq;
    }

    const paramsObj = {
      ...defaults,
      headers: { ...paramsReq, ...defaults.headers },
    };
    return xfetch(urlReq, paramsObj);
  };
}

function getQueryString(params) {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => `${esc(k)}=${esc(JSON.stringify(params[k]))}`)
    .join('&');
}

export const get = requestWrapper('GET');
export const post = requestWrapper('POST');
export const put = requestWrapper('PUT');
export const del = requestWrapper('DELETE');
export function setSessionToken(token) {
  if (_.isUndefined(token) || _.isNull(token)) return;
  sessionStorage.setItem('sessionToken', token);
}
