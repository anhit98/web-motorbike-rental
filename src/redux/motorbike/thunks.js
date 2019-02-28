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

export function addListMotorbikeThunk(value, id) {
  return dispatch => {
    apiWrapper(dispatch, post('/classes/motorbike', value))
      .then(results => {
        dispatch(fetchListMotorbikeThunk(id));
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
export function deleteListMotorbikeThunk(data, id) {
  return dispatch => {
    apiWrapper(dispatch, del(`/classes/motorbike/${data.objectId}`))
      .then(() => {
        dispatch(fetchListMotorbikeThunk(id));
        dispatch(delListMotorbike(data));
      })
      .catch();
  };
}
