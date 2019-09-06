import {
  REQUEST_CREATE_ACCOUNT,
  RECEIVED_CREATE_ACCOUNT,
  REQUEST_FETCH_ACCOUNT,
  RECEIVED_FETCH_ACCOUNT,
  RECEIVED_FIND_ORDERS_BY_ACCOUNT,
  REQUEST_LOGIN_ATTEMPT,
  RECEIVED_LOGIN_FAILURE,
  RECEIVED_LOGIN_SUCCESS,
  REQUEST_PATCH_ACCOUNT,
  RECEIVED_PATCH_ACCOUNT,
  REQUEST_LOGOUT,
  REQUEST_FORGOT_PASSWORD
} from './types';
const localStorageClient = require('store');
const authToken = localStorageClient.get('token');
const INITIAL_STATE = {
  ...(authToken ? { account_jwt: authToken } : {})
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CREATE_ACCOUNT:
      return state;
    case RECEIVED_CREATE_ACCOUNT:
      return { ...state, ...action.payload };
    case REQUEST_FETCH_ACCOUNT:
      return state;
    case RECEIVED_FETCH_ACCOUNT:
      return { ...state, ...action.payload };
    case REQUEST_PATCH_ACCOUNT:
      return state;
    case RECEIVED_PATCH_ACCOUNT:
      return { ...state, ...action.payload };
    case REQUEST_LOGIN_ATTEMPT:
      return state;
    case RECEIVED_LOGIN_FAILURE:
      return { ...state, msg: action.payload };
    case RECEIVED_LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case RECEIVED_FIND_ORDERS_BY_ACCOUNT:
      return { ...state, orders: action.payload };
    case REQUEST_LOGOUT:
      return INITIAL_STATE;
    case REQUEST_FORGOT_PASSWORD:
      return state;
    default:
      return state;
  }
};
