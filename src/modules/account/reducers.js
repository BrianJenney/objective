import {
  REQUEST_CREATE_ACCOUNT,
  RECEIVED_CREATE_ACCOUNT_SUCCESS,
  RECEIVED_CREATE_ACCOUNT_FAILURE,
  REQUEST_FETCH_ACCOUNT,
  RECEIVED_FETCH_ACCOUNT_SUCCESS,
  RECEIVED_FETCH_ACCOUNT_FAILURE,
  RECEIVED_FIND_ORDERS_BY_ACCOUNT,
  REQUEST_LOGIN,
  RECEIVED_LOGIN_SUCCESS,
  RECEIVED_LOGIN_FAILURE,
  REQUEST_PATCH_ACCOUNT,
  RECEIVED_PATCH_ACCOUNT_SUCCESS,
  RECEIVED_PATCH_ACCOUNT_FAILURE,
  REQUEST_LOGOUT,
  REQUEST_FORGOT_PASSWORD,
  REQUEST_SIGNUP_EMAIL,
  CLEAR_ACCOUNT_ERROR
} from './types';
const localStorageClient = require('store');
const authToken = localStorageClient.get('token');
const INITIAL_STATE = {
  loginError: null,
  signupError: null,
  error: null,
  loading: null,
  data: {
    ...(authToken ? { account_jwt: authToken } : {})
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CREATE_ACCOUNT:
      return {
        ...state,
        signupError: false,
        loading: true
      };
    case REQUEST_LOGIN:
      return {
        ...state,
        loginError: false,
        loading: true
      };
    case REQUEST_FETCH_ACCOUNT:
    case REQUEST_FORGOT_PASSWORD:
    case REQUEST_SIGNUP_EMAIL:
    case REQUEST_PATCH_ACCOUNT:
      return {
        ...state,
        error: false,
        loading: true
      };
    case RECEIVED_CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        signupError: false,
        loading: false,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case RECEIVED_LOGIN_SUCCESS:
      return {
        ...state,
        loginError: false,
        loading: false,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case RECEIVED_FETCH_ACCOUNT_SUCCESS:
    case RECEIVED_PATCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case RECEIVED_CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        signupError: action.payload,
        loading: false
      };
    case RECEIVED_LOGIN_FAILURE:
      return {
        ...state,
        loginError: action.payload,
        loading: false
      };
    case RECEIVED_FETCH_ACCOUNT_FAILURE:
    case RECEIVED_PATCH_ACCOUNT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case RECEIVED_FIND_ORDERS_BY_ACCOUNT:
      return {
        ...state,
        error: false,
        loading: false,
        data: {
          ...state.data,
          orders: action.payload
        }
      };
    case REQUEST_LOGOUT:
      return {
        loginError: false,
        signupError: false,
        error: false,
        loading: false,
        data: {}
      };
    case CLEAR_ACCOUNT_ERROR:
      return {
        ...state,
        error: false
      };
    default:
      return state;
  }
};
