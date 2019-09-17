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

export const receivedCreateAccount = createReply => dispatch => {
  localStorageClient.set('token', createReply.jwt);
  dispatch({
    type: RECEIVED_CREATE_ACCOUNT,
    payload: createReply
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

export const receivedFetchAccount = account => dispatch => {
  dispatch({
    type: RECEIVED_FETCH_ACCOUNT,
    payload: account
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
  console.log(params);
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

export const receivedPatchAccount = account => dispatch => {
  dispatch({
    type: RECEIVED_PATCH_ACCOUNT,
    payload: account
  });
};

export const requestLoginAttempt = ({ email, password }) => (
  dispatch,
  getState
) => {
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
    type: REQUEST_LOGIN_ATTEMPT,
    payload: {}
  });
};

export const receivedLoginSuccess = loginReply => dispatch => {
  localStorageClient.set('token', loginReply.account_jwt);
  dispatch({
    type: RECEIVED_LOGIN_SUCCESS,
    payload: loginReply
  });
};

export const receivedLoginFailure = loginError => dispatch => {
  dispatch({
    type: RECEIVED_LOGIN_FAILURE,
    payload: loginError
  });
};

export const requestLogout = () => dispatch => {
  localStorageClient.remove('token');
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
