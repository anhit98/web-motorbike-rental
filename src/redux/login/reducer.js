import { LoginTypes } from './actions';
import { makeReducerCreator } from '../reduxCreator';

export const initialState = {
  isAuthenticated: false,
  roles: '',
  shop_id: '',
  loginError: false,
  loginSuccess: false,
  listCurents: {},
};

const curent = (state, action) => {
  return {
    ...state,
    listCurents: action.data,
    shop_id: action.data.shop_id,
  };
};

const loginSuccess = state => {
  return {
    ...state,
    isAuthenticated: true,
    loginError: false,
    loginSuccess: true,
  };
};

const loginFail = (state, action) => {
  return {
    ...state,
    isAuthenticated: false,
    loginError: action.error,
    loginSuccess: false,
  };
};

export const login = makeReducerCreator(initialState, {
  [LoginTypes.LOGIN_AUTH_SUCCESS]: loginSuccess,
  [LoginTypes.LOGIN_AUTH_FAIL]: loginFail,
  [LoginTypes.GET_CURENT]: curent,
});
