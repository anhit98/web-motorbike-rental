import { apiWrapper } from '../reduxCreator';
import { get, post, put, del } from '../../api/ParseAPI';
import _ from 'lodash';
import {
  fetchListPayment,

} from './actions';

export function fetchListPaymentThunk() {
  return dispatch => {
    apiWrapper(dispatch, get('/classes/payment?&include=order_id&include=user&include=motorbike_id'), false)

      .then(data => {

        dispatch(fetchListPayment(data.results));
        const PaymentsID = _.map(data.results, item => {
          return `${item.objectId}`;
        });
        const query = JSON.stringify({ PaymentID: { $in: PaymentsID } });

      })
      .catch(err => {
        console.log(err);
      });
  };
}





