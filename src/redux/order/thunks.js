import { apiWrapper } from '../reduxCreator';
import { get, post, put, del } from '../../api/ParseAPI';
import _ from 'lodash';
import {
  fetchListOrder,
  updateListOrder,
  updateListMotor,
  updateStatus,
  addListPayment,

} from './actions';
import { fetchListMotorbikeThunk } from '../../redux/motorbike/thunks';
import { fetchListPaymentThunk } from '../../redux/payment/thunks';


export function fetchListOrderThunk() {
  return dispatch => {
    apiWrapper(dispatch, get('/classes/order?&include=user_id&include=motor_id'), false)

      .then(data => {

        dispatch(fetchListOrder(data.results));
        const OrdersID = _.map(data.results, item => {
          return `${item.objectId}`;
        });
        const query = JSON.stringify({ OrderID: { $in: OrdersID } });

      })
      .catch(err => {
        console.log(err);
      });
  };
}
export function updateListOrderThunk(data, id) {
  return dispatch => {
    apiWrapper(dispatch, put(`/classes/order/${id}`, data))
      .then(() => {
        dispatch(fetchListOrderThunk());
      })
      .catch();
  };
}
export function updateListMotorbikeThunk(data, id) {
  return dispatch => {
    apiWrapper(dispatch, put(`/classes/motorbike/${id}`, data))
      .then(() => {
        dispatch(fetchListMotorbikeThunk());
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






