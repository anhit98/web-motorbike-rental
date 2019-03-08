import { apiWrapper } from '../reduxCreator';
import { get, post, put, del } from '../../api/ParseAPI';
import _ from 'lodash';
import { fetchListPayment } from './actions';

export function fetchListPaymentThunk(id) {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        `/classes/payment?&include=order_id&include=user&include=motorbike_id&include=shop&where={"shop":{"__type":"Pointer","className":"shop","objectId":"${id}"}}`,
      ),
      false,
    )
      .then(data => {
        console.log(data, 'pamenyrgung');
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
