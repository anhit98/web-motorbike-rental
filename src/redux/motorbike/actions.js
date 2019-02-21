import { makeConstantCreator, makeActionCreator } from '../reduxCreator';

export const Motorbike = makeConstantCreator(
  'FETCH_MOTORBIKE',
  'ADD_MOTORBIKE',
  'EDIT_MOTORBIKE',
  'DEL_MOTORBIKE',
);

export const fetchListMotorbike = data => makeActionCreator(Motorbike.FETCH_MOTORBIKE, { data });
export const addListMotorbike = data => makeActionCreator(Motorbike.ADD_MOTORBIKE, { data });
export const editListMotorbike = data => makeActionCreator(Motorbike.EDIT_MOTORBIKE, { data });
export const delListMotorbike = data => makeActionCreator(Motorbike.DEL_MOTORBIKE, { data });
