import { makeConstantCreator, makeActionCreator } from '../reduxCreator';

export const Renters = makeConstantCreator('FETCH_RENTER');

export const fetchListRenters = data => makeActionCreator(Renters.FETCH_RENTER, { data });
