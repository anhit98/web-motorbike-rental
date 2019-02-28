import { makeConstantCreator, makeActionCreator } from '../reduxCreator';

export const Order = makeConstantCreator(
  'FETCH_ORDER',
  'UPDATE_ORDER',
  'UPDATE_MOTOR',
  'DELETE_ORDER',

);

export const fetchListOrder = data => makeActionCreator(Order.FETCH_ORDER, { data });
export const updateListOrder = data => makeActionCreator(Order.UPDATE_ORDER, { data });
export const updateListMotor = data => makeActionCreator(Order.UPDATE_MOTOR, { data });
export const deleteListOrder = data => makeActionCreator(Order.DELETE_ORDER, { data });