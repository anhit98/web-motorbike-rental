import { apiWrapper } from '../reduxCreator';
import { get } from '../../api/ParseAPI';
import { fetchListRenters } from './actions';

export function fetchListRentersThunk() {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        '/classes/order?include=user_id&where={"shop_id":{"__type":"Pointer","className":"shop","objectId":"io6LLhBqKm"}}',
      ),
      false,
    )
      // `/classes/Payment?where={ "status": { "$in": [ "Pending", "Debt"] },"isDelete":false,"booking":{"__type":"Pointer","className":"Booking","objectId":"${id}"}}`

      .then(data => {
        console.log(data.results, 'doanhthunk');
        dispatch(fetchListRenters(data.results));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
