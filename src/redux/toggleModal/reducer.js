import { ToggleModal } from './actions';
import { makeReducerCreator } from '../reduxCreator';

export const initialState = {
  modals: {},
};

const motorModals = (state, action) => {
  return {
    ...state,
    modals: { ...state.modals, [action.name]: action.status },
  };
};

export const toggleModals = makeReducerCreator(initialState, {
  [ToggleModal.TOGGLE_MODAL]: motorModals,
});
