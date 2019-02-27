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

export function fetchListMotorbikeThunk() {
  return dispatch => {
    apiWrapper(dispatch, get('/classes/motorbike?&include=motorbikeType_id'), false)
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

export function fetchCurrrentMotorbikeThunk(id, check = '') {
  return dispatch => {
    apiWrapper(dispatch, get(`/classes/motorbike/${id}`))
      .then(results => {
        check === '' ? dispatch(addListMotorbike(results)) : dispatch(editListMotorbike(results));
      })
      .catch();
  };
}

export function addListMotorbikeThunk(value) {
  return dispatch => {
    apiWrapper(dispatch, post('/classes/motorbike', value))
      .then(results => {
        dispatch(fetchListMotorbikeThunk());
        // dispatch(fetchCurrrentMotorbikeThunk(results.objectId));
        dispatch(toggleModal('addMotorbikeModal', false));
      })
      .catch();
  };
}

export function editListMotorbikeThunk(id, value) {
  console.log(value, "môtrrthnunkkkkkkk");
  return dispatch => {
    apiWrapper(dispatch, put(`/classes/motorbike/${id}`, value))
      .then(() => {
        // dispatch(fetchCurrrentMotorbikeThunk(id, 'edit'));
        dispatch(fetchListMotorbikeThunk());
        dispatch(toggleModal('editMotorbikeModal', false));
      })
      .catch();
  };
}
export function deleteListMotorbikeThunk(data) {
  return dispatch => {
    apiWrapper(dispatch, del(`/classes/motorbike/${data.objectId}`))
      .then(() => {
        dispatch(fetchListMotorbikeThunk());
        dispatch(delListMotorbike(data));
      })
      .catch();
  };
}
