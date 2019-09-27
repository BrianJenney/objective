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
  REQUEST_FORGOT_PASSWORD
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
