import { MotorTypes } from './actions';
import { makeReducerCreator } from '../reduxCreator';

export const initialState = {
  listMotorTypes: [],
};

const fetchListMotorTypes = (state, action) => {
  return {
    ...state,
    listMotorTypes: action.data,
  };
};
const addListMotorTypes = (state, action) => {
  return {
    ...state,
    listMotorTypes: [...state.listMotorTypes, action.data],
    isMotorTypesFormOpen: false,
  };
};

const editListMotorTypes = (state, action) => {
  return {
    ...state,
    listMotorTypes: [
      ...state.listMotorTypes.map(object =>
        object.objectId === action.data.objectId ? action.data : object,
      ),
    ],
    isMotorTypesFormOpen: false,
  };
};
const delListMotorTypes = (state, action) => {
  return {
    ...state,
    listMotorTypes: state.listMotorTypes.filter(motorbikeType => action.data !== motorbikeType),
    isMotorTypesFormOpen: false,
  };
};
export const motortypes = makeReducerCreator(initialState, {
  [MotorTypes.FETCH_MOTORTYPES]: fetchListMotorTypes,
  [MotorTypes.ADD_MOTORTYPES]: addListMotorTypes,
  [MotorTypes.EDIT_MOTORTYPES]: editListMotorTypes,
  [MotorTypes.DEL_MOTORTYPES]: delListMotorTypes,
});
