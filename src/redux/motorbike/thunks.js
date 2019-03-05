import { apiWrapper } from '../reduxCreator';
import { get, post, put, del } from '../../api/ParseAPI';
import _ from 'lodash';
import {
  fetchListMotorbike,
  addListMotorbike,
  editListMotorbike,
  delListMotorbike,
} from './actions';
import { toggleModal } from './../modals/actions';

export function fetchListMotorbikeThunk(id) {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        `/classes/motorbike?&include=motorbikeType_id&where={"shop_id":{"__type":"Pointer","className":"shop","objectId":"${id}"}}`,
      ),
      false,
    )
      .then(data => {
        dispatch(fetchListMotorbike(data.results));
        const motorbikesID = _.map(data.results, item => {
          return `${item.objectId}`;
        });
        const query = JSON.stringify({ motorbikeID: { $in: motorbikesID } });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function addListMotorbikeThunk(value, shopId) {
  console.log(value, 'imagein thunk');
  return dispatch => {
    apiWrapper(dispatch, post('/classes/motorbike', value))
      .then(results => {
        dispatch(fetchListMotorbikeThunk(shopId));
        dispatch(toggleModal('addMotorbikeModal', false));
      })
      .catch();
  };
}

export function editListMotorbikeThunk(id, value, shopId) {
  console.log(value, 'môtrrthnunkkkkkkk');
  return dispatch => {
    apiWrapper(dispatch, put(`/classes/motorbike/${id}`, value))
      .then(() => {
        dispatch(fetchListMotorbikeThunk(shopId));
        dispatch(toggleModal('editMotorbikeModal', false));
      })
      .catch();
  };
}
export function deleteListMotorbikeThunk(data, shopId) {
  return dispatch => {
    apiWrapper(dispatch, del(`/classes/motorbike/${data.objectId}`))
      .then(() => {
        dispatch(fetchListMotorbikeThunk(shopId));
        dispatch(delListMotorbike(data));
      })
      .catch();
  };
}
// uploadPhotoToParse() {
//   // let photoURL = 'file:///Users/wookiem/logo.jpg';

//   fetch('https://api.parse.com/1/files/pic.jpg', {
//     method: 'POST',
//     headers: {
//       'X-Parse-Application-Id': process.env.REACT_APP_PARSE_APP_ID,
//       'X-Parse-REST-API-Key': process.env.REACT_APP_PARSE_REST_API_KEY,
//       'Content-Type': 'image/jpeg',
//     },
//     url: photoURL,
//   })
//     .then(response => {
//       if (response.status === 200 || response.status === 201) {
//         return {};
//       }
//       const res = JSON.parse(response._bodyInit);
//       throw res;
//     })
//     .catch(error => {
//       throw error;
//     });
// }
