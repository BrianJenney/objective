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
  REQUEST_LOGOUT,
  REQUEST_FORGOT_PASSWORD,
  REQUEST_SIGNUP_EMAIL
} from './types';
import store from '../../store';
import { requestCreateCart, requestFetchCartByEmail } from '../cart/actions';

const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestCreateAccount = account => (dispatch, getState) => {
  const { client, replyTo } = getState().stomp;
  const { firstName, lastName, email, password, newsletter } = account;

  const params = {
    data: {
      firstName,
      lastName,
      email,
      password,
      newsletter
    }
  };

  const payload = JSON.stringify(msgpack.encode(params));
  client.send(
    '/exchange/account/account.request.create',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    payload
  );

  dispatch({
    type: REQUEST_CREATE_ACCOUNT,
    payload: {}
  });
};

export const receivedCreateAccountSuccess = createReply => dispatch => {
  localStorageClient.set('token', createReply.jwt);
  dispatch({
    type: RECEIVED_CREATE_ACCOUNT_SUCCESS,
    payload: createReply
  });
};

export const receivedCreateAccountFailure = error => dispatch => {
  dispatch({
    type: RECEIVED_CREATE_ACCOUNT_FAILURE,
    payload: error
  });
};

export const clearCreateAccountError = () => dispatch => {
  dispatch({
    type: CLEAR_CREATE_ACCOUNT_ERROR
  });
};

export const requestFetchAccount = id => (dispatch, getState) => {
  const { client, replyTo } = getState().stomp;
  const params = { id };
  const payload = JSON.stringify(msgpack.encode(params));

  client.send(
    '/exchange/account/account.request.get',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    payload
  );

  dispatch({
    type: REQUEST_FETCH_ACCOUNT,
    payload: {}
  });
};

export const receivedFetchAccountSuccess = account => dispatch => {
  dispatch({
    type: RECEIVED_FETCH_ACCOUNT_SUCCESS,
    payload: account
  });
};

export const receivedFetchAccountFailure = error => dispatch => {
  dispatch({
    type: RECEIVED_FETCH_ACCOUNT_FAILURE,
    payload: error
  });
};

export const clearFetchAccountError = () => dispatch => {
  dispatch({
    type: CLEAR_FETCH_ACCOUNT_ERROR
  });
};

export const requestPatchAccount = (authToken, patches) => (
  dispatch,
  getState
) => {
  const { client, replyTo } = getState().stomp;
  const params = {
    id: authToken,
    data: patches,
    params: {
      account_jwt: authToken
    }
  };
  // console.log(params);
  const payload = JSON.stringify(msgpack.encode(params));

  client.send(
    '/exchange/account/account.request.patch',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    payload
  );

  dispatch({
    type: REQUEST_PATCH_ACCOUNT,
    payload: {}
  });
};

export const receivedPatchAccountSuccess = account => dispatch => {
  console.log('ACTION', account);
  dispatch({
    type: RECEIVED_PATCH_ACCOUNT_SUCCESS,
    payload: account
  });
};

export const receivedPatchAccountFailure = patchError => dispatch => {
  console.log('ERROR-ACTION', patchError);
  dispatch({
    type: RECEIVED_PATCH_ACCOUNT_FAILURE,
    payload: patchError
  });
};

export const clearPatchAccountError = () => dispatch => {
  dispatch({
    type: CLEAR_PATCH_ACCOUNT_ERROR
  });
};

export const requestChangePassword = (authToken, patches) => (
  dispatch,
  getState
) => {
  const { client, replyTo } = getState().stomp;
  const params = {
    id: authToken,
    data: patches,
    params: {
      account_jwt: authToken
    }
  };
  // console.log(params);
  const payload = JSON.stringify(msgpack.encode(params));

  client.send(
    '/exchange/account/account.request.changePassword',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    payload
  );

  dispatch({
    type: REQUEST_CHANGE_PASSWORD,
    payload: {}
  });
};

export const receivedChangePasswordSuccess = account => dispatch => {
  console.log('ACTION', account);
  dispatch({
    type: RECEIVED_CHANGE_PASSWORD_SUCCESS,
    payload: account
  });
};

export const receivedChangePasswordFailure = patchError => dispatch => {
  console.log('ERROR-ACTION', patchError);
  dispatch({
    type: RECEIVED_CHANGE_PASSWORD_FAILURE,
    payload: patchError
  });
};

export const clearChangePasswordError = () => dispatch => {
  dispatch({
    type: CLEAR_CHANGE_PASSWORD_ERROR
  });
};

export const requestLogin = ({ email, password }) => (dispatch, getState) => {
  const { client, replyTo } = getState().stomp;
  const params = {
    params: {
      query: {
        email,
        password
      }
    }
  };
  const payload = JSON.stringify(msgpack.encode(params));

  client.send(
    '/exchange/account/account.request.login',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    payload
  );

  dispatch({
    type: REQUEST_LOGIN,
    payload: {}
  });
};

export const receivedLoginSuccess = loginReply => dispatch => {
  localStorageClient.set('token', loginReply.account_jwt);
  dispatch({
    type: RECEIVED_LOGIN_SUCCESS,
    payload: loginReply
  });
  store.dispatch(requestFetchCartByEmail(loginReply.email));
};

export const receivedLoginFailure = loginError => dispatch => {
  dispatch({
    type: RECEIVED_LOGIN_FAILURE,
    payload: loginError
  });
};

export const clearLoginError = () => dispatch => {
  dispatch({
    type: CLEAR_LOGIN_ERROR
  });
};

export const requestLogout = () => dispatch => {
  localStorageClient.remove('token');
  store.dispatch(requestCreateCart());
  dispatch({
    type: REQUEST_LOGOUT,
    payload: {}
  });
};

export const receivedFindOrdersByAccount = orders => dispatch => {
  dispatch({
    type: RECEIVED_FIND_ORDERS_BY_ACCOUNT,
    payload: orders
  });
};

export const requestForgotPassword = email => (dispatch, getState) => {
  const { client, replyTo } = getState().stomp;
  const params = {
    params: {
      query: {
        email
      }
    }
  };
  const payload = JSON.stringify(msgpack.encode(params));

  client.send(
    '/exchange/account/account.request.forgotpassword',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    payload
  );

  dispatch({
    type: REQUEST_FORGOT_PASSWORD,
    payload: {}
  });
};

export const requestSignupEmail = email => (dispatch, getState) => {
  const { client, replyTo } = getState().stomp;
  const params = {
    params: {
      query: {
        email
      }
    }
  };
  const payload = JSON.stringify(msgpack.encode(params));

  client.send(
    '/exchange/account/account.request.signupemail',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    payload
  );

  dispatch({
    type: REQUEST_SIGNUP_EMAIL,
    payload: {}
  });
};
