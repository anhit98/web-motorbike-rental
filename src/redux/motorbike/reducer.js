import { Motorbike } from './actions';
import { makeReducerCreator } from '../reduxCreator';

export const initialState = {
  listMotorbike: [],
};

const fetchListMotorbike = (state, action) => {
  console.log(action.data, "au");

  return {
    ...state,
    listMotorbike: action.data,
  };
};
const addListMotorbike = (state, action) => {
  return {
    ...state,
    listMotorbike: [...state.listMotorbike, action.data],
    isMotorbikeFormOpen: false,
  };
};

const editListMotorbike = (state, action) => {
  return {
    ...state,
    listMotorbike: [
      ...state.listMotorbike.map(
        object => (object.objectId === action.data.objectId ? action.data : object),
      ),
    ],
    isMotorbikeFormOpen: false,
  };
};
const delListMotorbike = (state, action) => {
  return {
    ...state,
    listMotorbike: state.listMotorbike.filter(motorbike => action.data !== motorbike),
    isMotorbikeFormOpen: false,
  };
};
export const motorbike = makeReducerCreator(initialState, {
  [Motorbike.FETCH_MOTORBIKE]: fetchListMotorbike,
  [Motorbike.ADD_Motorbike]: addListMotorbike,
  [Motorbike.EDIT_Motorbike]: editListMotorbike,
  [Motorbike.DEL_Motorbike]: delListMotorbike,
});
