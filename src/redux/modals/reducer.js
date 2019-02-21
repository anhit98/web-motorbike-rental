import { modal } from './actions';
import { makeReducerCreator } from '../reduxCreator';

export const initialState = {
  modal: {},
};

const toggleModal = (state, action) => {
  return {
    ...state,
    modal: { ...state.modal, [action.name]: action.status },
  };
};
export const togglemodal = makeReducerCreator(initialState, {
  [modal.TOGGLE_MODAL]: toggleModal,
});
