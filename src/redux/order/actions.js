import { makeConstantCreator, makeActionCreator } from '../reduxCreator';

export const Order = makeConstantCreator(
  'FETCH_ORDER',
  'UPDATE_ORDER',
  'UPDATE_MOTOR',

);

export const fetchListOrder = data => makeActionCreator(Order.FETCH_ORDER, { data });
export const updateListOrder = data => makeActionCreator(Order.UPDATE_ORDER, { data });
export const updateListMotor = data => makeActionCreator(Order.UPDATE_MOTOR, { data });