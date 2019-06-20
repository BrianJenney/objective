import { combineReducers } from 'redux';
import globalReducer from './global';
import storefrontReducer from './storefront';

export default combineReducers({
  global: globalReducer,
  storefront: storefrontReducer
});