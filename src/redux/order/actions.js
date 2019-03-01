import { makeConstantCreator, makeActionCreator } from '../reduxCreator';

export const Order = makeConstantCreator(
  'FETCH_ORDER',
  'UPDATE_ORDER',
  'UPDATE_MOTOR',
  'UPDATE_STATUS',
  'ADD_NEWPAYMENT'

);

export const fetchListOrder = data => makeActionCreator(Order.FETCH_ORDER, { data });
export const updateListOrder = data => makeActionCreator(Order.UPDATE_ORDER, { data });
export const updateListMotor = data => makeActionCreator(Order.UPDATE_MOTOR, { data });
export const updateStatus = data => makeActionCreator(Order.UPDATE_STATUS, { data });
export const addListPayment = data => makeActionCreator(Order.ADD_NEWPAYMENT, { data });