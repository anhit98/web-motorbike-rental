import { apiWrapper } from '../reduxCreator';
import { login, logout, curent } from './actions';
import { get } from '../../api/ParseAPI';

export function loginThunk(username, password) {
  return dispatch => {
    apiWrapper(dispatch, get(`/login?username=${username}&password=${password}`), false).then(
      response => {
        if (response && response.sessionToken && response.isAdmin === true) {
          sessionStorage.setItem('sessionToken', response.sessionToken);
          dispatch(login(response));
        }
      },
    );
  };
}

export const getCurrentUserThunk = () => {
  return dispatch => {
    apiWrapper(dispatch, get('/users/me'))
      .then(data => {
        console.log(data, 'thunkanhhhhhh');
        dispatch(login(data));
      })
      .catch(err => {
        sessionStorage.removeItem('sessionToken', err);
      });
  };
};

export function getCurentUser() {
  return dispatch => {
    apiWrapper(dispatch, get('/users/me')).then(data => {
      dispatch(curent(data));
    });
  };
}

export function logoutThunk() {
  return dispatch => {
    apiWrapper(
      dispatch,
      new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }),
    )
      .then(() => {
        sessionStorage.removeItem('sessionToken');
        dispatch(logout());
      })
      .catch(err => {
        console.log(err);
      });
  };
}
