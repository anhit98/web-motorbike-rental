import { makeConstantCreator, makeActionCreator } from '../reduxCreator';

export const MotorTypes = makeConstantCreator(
  'FETCH_MOTORTYPES',
  'ADD_MOTORTYPES',
  'EDIT_MOTORTYPES',
  'DEL_MOTORTYPES',
);

export const fetchListMotorTypes = data => makeActionCreator(MotorTypes.FETCH_MOTORTYPES, { data });
export const addListMotorTypes = data => makeActionCreator(MotorTypes.ADD_MOTORTYPES, { data });
export const editListMotorTypes = data => makeActionCreator(MotorTypes.EDIT_MOTORTYPES, { data });
export const delListMotorTypes = data => makeActionCreator(MotorTypes.DEL_MOTORTYPES, { data });
