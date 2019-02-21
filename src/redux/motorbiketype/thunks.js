import { apiWrapper } from '../reduxCreator';
import { get, post, put, del } from '../../api/ParseAPI';
import {
  fetchListMotorTypes,
  addListMotorTypes,
  editListMotorTypes,
  delListMotorTypes,
} from './actions';
import { toggleModal } from './../modals/actions';

export function fetchListMotorTypesThunk() {
  return dispatch => {
    apiWrapper(dispatch, get('/classes/motorbikeType'), false)
      .then(data => {
        dispatch(fetchListMotorTypes(data.results));
      })
      .catch();
  };
}
export function fetchCurrrentMotorTypesThunk(id, check = '') {
  return dispatch => {
    apiWrapper(dispatch, get(`/classes/motorbikeType/${id}`))
      .then(results => {
        check === '' ? dispatch(addListMotorTypes(results)) : dispatch(editListMotorTypes(results));
      })
      .catch();
  };
}

export function addListMotorTypesThunk(value) {
  return dispatch => {
    apiWrapper(dispatch, post('/classes/motorbikeType', value))
      .then(results => {
        dispatch(fetchCurrrentMotorTypesThunk(results.objectId));
        dispatch(toggleModal('addMotorTModal', false));
      })
      .catch();
  };
}

export function editListMotorTypesThunk(id, value) {
  return dispatch => {
    apiWrapper(dispatch, put(`/classes/motorbikeType/${id}`, value))
      .then(() => {
        dispatch(fetchCurrrentMotorTypesThunk(id, 'edit'));
        dispatch(toggleModal('editMotorTModal', false));
      })
      .catch();
  };
}
export function deleteListMotorTypesThunk(data) {
  return dispatch => {
    apiWrapper(dispatch, del(`/classes/motorbikeType/${data.objectId}`))
      .then(() => {
        dispatch(delListMotorTypes(data));
      })
      .catch();
  };
}
