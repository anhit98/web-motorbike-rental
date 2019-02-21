import { Renters } from './actions';
import { makeReducerCreator } from '../reduxCreator';

export const initialState = {
  listRenters: [],
};

const fetchListRenters = (state, action) => {
  return {
    ...state,
    listRenters: action.data,
  };
};

export const renters = makeReducerCreator(initialState, {
  [Renters.FETCH_RENTER]: fetchListRenters,
});
