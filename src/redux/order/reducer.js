import { Order } from './actions';
import { makeReducerCreator } from '../reduxCreator';

export const initialState = {
  listOrder: [],
};

const fetchListOrder = (state, action) => {

  return {
    ...state,
    listOrder: action.data,
  };
};
const updateListOrder = (state, action) => {
  return {
    ...state,
    listOrder: [
      ...state.listOrder.map(
        object => (object.objectId === action.data.objectId ? action.data : object),
      ),
    ],
    isOrderFormOpen: false,
  };
};
const updateListMotor = (state, action) => {
  return {
    ...state,
    listOrder: [
      ...state.listOrder.map(
        object => (object.objectId === action.data.objectId ? action.data : object),
      ),
    ],
    isOrderFormOpen: false,
  };
};

export const order = makeReducerCreator(initialState, {
  [Order.FETCH_ORDER]: fetchListOrder,
  [Order.UPDATE_ORDER]: updateListOrder,
  [Order.UPDATE_MOTOR]: updateListMotor,

});
