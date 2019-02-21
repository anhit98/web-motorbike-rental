import { apiWrapper } from '../reduxCreator';
import { get } from '../../api/ParseAPI';
import { fetchListRenters } from './actions';

export function fetchListRentersThunk() {
  return dispatch => {
    apiWrapper(
      dispatch,
      get('/classes/order?include=user_id&where={ "shop_id":"io6LLhBqKm"}'),
      false,
    )
      .then(data => {
        console.log(data.results, 'doanh');
        dispatch(fetchListRenters(data.results));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
