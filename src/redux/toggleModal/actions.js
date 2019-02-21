import { makeConstantCreator, makeActionCreator } from '../reduxCreator';

export const ToggleModal = makeConstantCreator('TOGGLE_MODAL');

export const toggleModal = (name, status) =>
  makeActionCreator(ToggleModal.TOGGLE_MODAL, { name, status });
