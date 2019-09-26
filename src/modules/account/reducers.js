import {
  REQUEST_CREATE_ACCOUNT,
  RECEIVED_CREATE_ACCOUNT,
  REQUEST_CREATE_ACCOUNT_FAILURE,
  REQUEST_FETCH_ACCOUNT,
  RECEIVED_FETCH_ACCOUNT,
  RECEIVED_FIND_ORDERS_BY_ACCOUNT,
  REQUEST_LOGIN_ATTEMPT,
  RECEIVED_LOGIN_FAILURE,
  RECEIVED_LOGIN_SUCCESS,
  REQUEST_PATCH_ACCOUNT,
  RECEIVED_PATCH_ACCOUNT,
  RECEIVED_PATCH_ACCOUNT_FAILURE,
  REQUEST_LOGOUT,
  REQUEST_FORGOT_PASSWORD
} from './types';
const localStorageClient = require('store');
const authToken = localStorageClient.get('token');
const INITIAL_STATE = {
  error: null,
  loading: false,
  data: {
    ...(authToken ? { account_jwt: authToken } : {})
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CREATE_ACCOUNT:
    case REQUEST_LOGIN_ATTEMPT:
    case REQUEST_FORGOT_PASSWORD:
    case REQUEST_PATCH_ACCOUNT:
      return {
        error: false,
        loading: true,
        data: {
          ...state.data
        }
      };
    case REQUEST_FETCH_ACCOUNT:
      return {
        error: false,
        loading: false,
        data: {
          ...state.data
        }
      };
    case REQUEST_CREATE_ACCOUNT_FAILURE:
      return {
        error: action.payload,
        loading: false,
        data: {
          ...state.data
        }
      };

    case RECEIVED_CREATE_ACCOUNT:
    case RECEIVED_LOGIN_SUCCESS:
    case RECEIVED_FETCH_ACCOUNT:
    case RECEIVED_PATCH_ACCOUNT:
      return {
        error: false,
        loading: false,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case RECEIVED_PATCH_ACCOUNT_FAILURE:
    case RECEIVED_LOGIN_FAILURE:
      return {
        error: action.payload,
        loading: false,
        data: {
          ...state.data
        }
      };
    case RECEIVED_FIND_ORDERS_BY_ACCOUNT:
      return {
        error: false,
        loading: false,
        data: {
          ...state.data,
          orders: action.payload
        }
      };
    case REQUEST_LOGOUT:
      return {
        error: false,
        loading: false,
        data: {}
      };
    default:
      return state;
  }
};
