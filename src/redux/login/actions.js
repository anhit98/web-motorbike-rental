import { makeConstantCreator, makeActionCreator } from '../reduxCreator';

export const LoginTypes = makeConstantCreator(
  'LOGIN_AUTH_FAIL',
  'LOGIN_AUTH_SUCCESS',
  // 'GET_SESSION',
  'GET_CURENT',
);

export const login = () => makeActionCreator(LoginTypes.LOGIN_AUTH_SUCCESS);
export const logout = () => makeActionCreator(LoginTypes.LOGIN_AUTH_FAIL);
// export const session = () => makeActionCreator(LoginTypes.GET_SESSION);
export const curent = data => makeActionCreator(LoginTypes.GET_CURENT, { data });
