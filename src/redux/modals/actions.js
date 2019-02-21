import { makeConstantCreator, makeActionCreator } from '../reduxCreator';

export const modal = makeConstantCreator('TOGGLE_MODAL');

export const toggleModal = (name, status) =>
  makeActionCreator(modal.TOGGLE_MODAL, { name, status });
