import { Payment } from './actions';
import { makeReducerCreator } from '../reduxCreator';

export const initialState = {
  listPayment: [],
};

const fetchListPayment = (state, action) => {

  return {
    ...state,
    listPayment: action.data,
  };
};

export const payment = makeReducerCreator(initialState, {
  [Payment.FETCH_PAYMENT]: fetchListPayment,

});
