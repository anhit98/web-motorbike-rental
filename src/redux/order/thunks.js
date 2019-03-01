import _ from 'lodash';
import { apiWrapper } from '../reduxCreator';
import { get, put, del } from '../../api/ParseAPI';
import {
  fetchListOrder,
  deleteListOrder,
  updateListMotor,
  updateStatus,
  addListPayment,
} from './actions';
import { fetchListMotorbikeThunk } from '../../redux/motorbike/thunks';
import { fetchListPaymentThunk } from '../../redux/payment/thunks';

export function fetchListOrderThunk(id) {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        `/classes/order?&include=user_id&include=motor_id&where={"shop_id":{"__type":"Pointer","className":"shop","objectId":"${id}"}}`,
      ),
      false,
    )
      .then(data => {
        dispatch(fetchListOrder(data.results));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function updateListOrderThunk(data, id, shopId) {
  return dispatch => {
    apiWrapper(dispatch, put(`/classes/order/${id}`, data))
      .then(() => {
        dispatch(fetchListOrderThunk(shopId));
      })
      .catch();
  };
}
export function updateListMotorbikeThunk(data, id, shopId) {
  return dispatch => {
    apiWrapper(dispatch, put(`/classes/motorbike/${id}`, data))
      .then(() => {
        dispatch(fetchListMotorbikeThunk(shopId));
      })
      .catch();
  };
}

export function updateStatusThunk(data, id) {
  return dispatch => {
    apiWrapper(dispatch, put(`/classes/order/${id}`, data))
      .then(() => {
        dispatch(fetchListOrderThunk());
      })
      .catch();
  };
}
export function addListPaymentThunk(data, id) {
  return dispatch => {
    apiWrapper(dispatch, post('/classes/payment', data))
      .then(results => {
        // dispatch(fetchCurrrentPaymentThunk(results.objectId));
        dispatch(fetchListPaymentThunk());
        // dispatch(deleteListOrderThunk(id));
      })
      .catch();
  };
}
