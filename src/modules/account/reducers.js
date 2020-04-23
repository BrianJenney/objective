import {
  REQUEST_CREATE_ACCOUNT,
  RECEIVED_CREATE_ACCOUNT_SUCCESS,
  RECEIVED_CREATE_ACCOUNT_FAILURE,
  CLEAR_CREATE_ACCOUNT_ERROR,
  REQUEST_FETCH_ACCOUNT,
  RECEIVED_FETCH_ACCOUNT_SUCCESS,
  RECEIVED_FETCH_ACCOUNT_FAILURE,
  CLEAR_FETCH_ACCOUNT_ERROR,
  RECEIVED_FIND_ORDERS_BY_ACCOUNT,
  REQUEST_LOGIN,
  RECEIVED_LOGIN_SUCCESS,
  RECEIVED_LOGIN_FAILURE,
  CLEAR_LOGIN_ERROR,
  REQUEST_PATCH_ACCOUNT,
  RECEIVED_PATCH_ACCOUNT_SUCCESS,
  RECEIVED_PATCH_ACCOUNT_FAILURE,
  CLEAR_PATCH_ACCOUNT_ERROR,
  REQUEST_CHANGE_PASSWORD,
  RECEIVED_CHANGE_PASSWORD_SUCCESS,
  RECEIVED_CHANGE_PASSWORD_FAILURE,
  CLEAR_CHANGE_PASSWORD_ERROR,
  REQUEST_LOGOUT
} from './types';
const localStorageClient = require('store');
const authToken = localStorageClient.get('token');
const INITIAL_STATE = {
  loginError: null,
  signupError: null,
  fetchAccountError: null,
  patchAccountError: null,
  changePasswordError: null,
  loginSubmitting: null,
  signupSubmitting: null,
  fetchAccountLoading: null,
  patchAccountSubmitting: null,
  changePasswordSubmitting: null,
  signupConfirmation: false,
  onLoginSuccess: null,
  onLoginFailure: null,
  onPatchSuccess: null,
  onPatchFailure: null,
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
        signupSubmitting: true
      };
    case RECEIVED_CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        signupError: false,
        signupSubmitting: false,
        signupConfirmation: true,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case RECEIVED_CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        signupError: action.payload,
        signupSubmitting: false
      };
    case CLEAR_CREATE_ACCOUNT_ERROR:
      return {
        ...state,
        signupError: false
      };
    case REQUEST_LOGIN:
      return {
        ...state,
        loginError: false,
        loginSubmitting: true,
        onLoginSuccess: action.onSuccess,
        onLoginFailure: action.onFailure
      };
    case RECEIVED_LOGIN_SUCCESS:
      if (state.hasOwnProperty('onLoginSuccess') && state.onLoginStatus) {
        state.onLoginSuccess();
      }
      return {
        ...state,
        loginError: false,
        loginSubmitting: false,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case RECEIVED_LOGIN_FAILURE:
      if (state.hasOwnProperty('onLoginFailure') && state.onLoginFailure) {
        state.onLoginFailure();
      }
      return {
        ...state,
        loginError: action.payload,
        loginSubmitting: false
      };
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        loginError: false
      };
    case REQUEST_FETCH_ACCOUNT:
      return {
        ...state,
        fetchAccountError: false,
        fetchAccountLoading: true
      };
    case RECEIVED_FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        fetchAccountError: false,
        fetchAccountLoading: false,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case RECEIVED_FETCH_ACCOUNT_FAILURE:
      return {
        ...state,
        fetchAccountError: action.payload,
        fetchAccountLoading: false
      };
    case CLEAR_FETCH_ACCOUNT_ERROR:
      return {
        ...state,
        fetchAccountError: false
      };
    case REQUEST_PATCH_ACCOUNT:
      return {
        ...state,
        patchAccountError: false,
        patchAccountSubmitting: true,
        onPatchSuccess: action.onSuccess,
        onPatchFailure: action.onFailure
      };
    case RECEIVED_PATCH_ACCOUNT_SUCCESS:
      state.onPatchSuccess();
      return {
        ...state,
        patchAccountError: false,
        patchAccountSubmitting: false,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case RECEIVED_PATCH_ACCOUNT_FAILURE:
      state.onPatchFailure();
      return {
        ...state,
        patchAccountError: action.payload,
        patchAccountSubmitting: false
      };
    case CLEAR_PATCH_ACCOUNT_ERROR:
      return {
        ...state,
        patchAccountError: false
      };
    case REQUEST_CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordError: false,
        changePasswordSubmitting: true,
        onPatchSuccess: action.onSuccess,
        onPatchFailure: action.onFailure
      };
    case RECEIVED_CHANGE_PASSWORD_SUCCESS:
      state.onPatchSuccess();
      return {
        ...state,
        changePasswordError: false,
        changePasswordSubmitting: false,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    case RECEIVED_CHANGE_PASSWORD_FAILURE:
      state.onPatchFailure();
      return {
        ...state,
        changePasswordError: action.payload,
        changePasswordSubmitting: false
      };
    case CLEAR_CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        changePasswordError: false
      };
    case RECEIVED_FIND_ORDERS_BY_ACCOUNT:
      return {
        ...state,
        data: {
          ...state.data,
          orders: action.payload
        }
      };
    case REQUEST_LOGOUT:
      return {
        loginError: false,
        signupError: false,
        fetchAccountError: false,
        patchAccountError: false,
        changePasswordError: false,
        loginSubmitting: false,
        signupSubmitting: false,
        fetchAccountLoading: false,
        patchAccountSubmitting: false,
        changePasswordSubmitting: false,
        data: {}
      };
    default:
      return state;
  }
};
