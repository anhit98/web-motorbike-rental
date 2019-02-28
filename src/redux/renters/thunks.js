import { apiWrapper } from '../reduxCreator';
import { get } from '../../api/ParseAPI';
import { fetchListRenters } from './actions';

export function fetchListRentersThunk(id) {
  return dispatch => {
    apiWrapper(
      dispatch,
      get(
        `/classes/order?include=user_id&where={"shop_id":{"__type":"Pointer","className":"shop","objectId":"${id}"}}`,
      ),
      false,
    )
      .then(data => {
        console.log(data.results, 'doanhthunk');
        dispatch(fetchListRenters(data.results));
      })
      .catch(err => {
        console.log(err);
      });
  };
}
