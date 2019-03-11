import { makeConstantCreator, makeActionCreator } from '../reduxCreator';

export const Dashboard = makeConstantCreator(
  'FETCH_NORENTER',
  'FETCH_NOMOTOR',
  'FETCH_TOTALMOTOR',
  'FETCH_NOPAYMENT',
  'FETCH_LISTMOTORBIKE',
  'FETCH_LISTPAYMENT',
  'FETCH_LISTRENTER',
  'FETCH_LISTPAYMENTHIS',
  'UPDATE_ORDER',
  'FETCH_ORDER',
);
export const countRenters = data => makeActionCreator(Dashboard.FETCH_NORENTER, { data });
export const countMotor = data => makeActionCreator(Dashboard.FETCH_NOMOTOR, { data });
export const countTotalMotors = data => makeActionCreator(Dashboard.FETCH_TOTALMOTOR, { data });
export const countPayments = data => makeActionCreator(Dashboard.FETCH_NOPAYMENT, { data });
export const fetchListRenters = data => makeActionCreator(Dashboard.FETCH_LISTRENTER, { data });
export const fetchListMotorbike = data =>
  makeActionCreator(Dashboard.FETCH_LISTMOTORBIKE, { data });
export const fetchListPayments = data => makeActionCreator(Dashboard.FETCH_LISTPAYMENT, { data });
export const fetchListPaymentHis = data =>
  makeActionCreator(Dashboard.FETCH_LISTPAYMENTHIS, { data });
export const updateListOrder = data => makeActionCreator(Dashboard.UPDATE_ORDER, { data });
export const fetchListOrder = data => makeActionCreator(Dashboard.FETCH_ORDER, { data });

