import { Dashboard } from './actions';
import { makeReducerCreator } from '../reduxCreator';

export const initialState = {
  noRenter: 0,
  noMotor: 0,
  totalMotors: 0,
  noPayment: [],
  listMotorbike: 0,
  listRenters: [],
  listPayment: [],
  listPaymentHis: [],
  listOrder: [],

};

const countRenters = (state, action) => {
  return {
    ...state,
    noRenter: action.data,
  };
};
const countMotor = (state, action) => {
  return {
    ...state,
    noMotor: action.data,
  };
};
const countTotalMotors = (state, action) => {
  return {
    ...state,
    totalMotors: action.data,
  };
};
const countPayments = (state, action) => {
  return {
    ...state,
    noPayment: action.data,
  };
};
const fetchListMotorbike = (state, action) => {
  return {
    ...state,
    listMotorbike: action.data,
  };
};
const fetchListRenters = (state, action) => {
  return {
    ...state,
    listRenters: action.data,
  };
};
const fetchListPayments = (state, action) => {
  return {
    ...state,
    listPayment: action.data,
  };
};
const fetchListPaymentHis = (state, action) => {
  return {
    ...state,
    listPaymentHis: action.data,
  };
};
const updateListOrder = (state, action) => {
  return {
    ...state,
    listOrder: [
      ...state.listOrder.map(
        object => (object.objectId === action.data.objectId ? action.data : object),
      ),
    ],
    isOrderFormOpen: false,
  };
};
const fetchListOrder = (state, action) => {

  return {
    ...state,
    listOrder: action.data,
  };
};
export const dashboard = makeReducerCreator(initialState, {
  [Dashboard.FETCH_NORENTER]: countRenters,
  [Dashboard.FETCH_NOMOTOR]: countMotor,
  [Dashboard.FETCH_TOTALMOTOR]: countTotalMotors,
  [Dashboard.FETCH_NOPAYMENT]: countPayments,
  [Dashboard.FETCH_LISTMOTORBIKE]: fetchListMotorbike,
  [Dashboard.FETCH_LISTPAYMENT]: fetchListPayments,
  [Dashboard.FETCH_LISTRENTER]: fetchListRenters,
  [Dashboard.FETCH_LISTPAYMENTHIS]: fetchListPaymentHis,
  [Dashboard.UPDATE_ORDER]: updateListOrder,
  [Dashboard.FETCH_ORDER]: fetchListOrder,
});
