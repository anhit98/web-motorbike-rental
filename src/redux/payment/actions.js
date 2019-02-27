import { makeConstantCreator, makeActionCreator } from '../reduxCreator';

export const Payment = makeConstantCreator(
  'FETCH_PAYMENT',

);

export const fetchListPayment = data => makeActionCreator(Payment.FETCH_PAYMENT, { data });
