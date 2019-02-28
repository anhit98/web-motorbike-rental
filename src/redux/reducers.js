import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { login } from './login/reducer';
import { loading } from './loading/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import App from './app/reducer';
import { order } from './order/reducer';
import { motorbike } from './motorbike/reducer';
import { payment } from './payment/reducer';
import { motortypes } from './motorbiketype/reducer';
import { toggleModals } from './toggleModal/reducer';
import { togglemodal } from './modals/reducer';
import { renters } from './renters/reducer';


export default combineReducers({
  router: routerReducer,
  login,
  motortypes,
  loading,
  toggleModals,
  togglemodal,
  renters,
  notifications,
  LanguageSwitcher,
  App,
  motorbike,
  payment,
  order,
});
