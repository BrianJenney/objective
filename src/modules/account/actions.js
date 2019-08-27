import {
  REQUEST_CREATE_ACCOUNT,
  RECEIVED_CREATE_ACCOUNT,
  REQUEST_FETCH_ACCOUNT,
  RECEIVED_FETCH_ACCOUNT,
  REQUEST_LOGIN_ATTEMPT,
  RECEIVED_LOGIN_FAILURE,
  RECEIVED_LOGIN_SUCCESS,
  REQUEST_PATCH_ACCOUNT,
  RECEIVED_PATCH_ACCOUNT,
  LOGOUT
} from './types';

const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestCreateAccount = account => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;

  const params = {
    data: {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      password: account.password,
      newsletter: account.newsletter
    }
  };

  let obj = JSON.stringify(msgpack.encode(params));
  console.log(params);
  stompClient.send(
    '/exchange/account/account.request.create',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );

  dispatch({
    type: REQUEST_CREATE_ACCOUNT,
    payload: {}
  });
};

export const receivedCreateAccount = createReply => async (
  dispatch,
  getState
) => {
  localStorageClient.set('token', createReply.jwt);
  dispatch({
    type: RECEIVED_CREATE_ACCOUNT,
    payload: createReply
  });
};

export const requestFetchAccount = url => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    params: {
      query: {
        _id: '5cdc7405da53494ee0f3bafe'
      }
    }
  };

  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/account/account.request.find',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );

  dispatch({
    type: REQUEST_FETCH_ACCOUNT,
    payload: {}
  });
};

export const receivedFetchAccount = account => async (dispatch, getState) => {
  dispatch({
    type: RECEIVED_FETCH_ACCOUNT,
    payload: account
  });
};

export const requestPatchAccount = (accountId, patches) => async (
  dispatch,
  getState
) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    id: accountId,
    data: patches
  };
  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/account/account.request.patch',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );
  await dispatch({
    type: REQUEST_PATCH_ACCOUNT,
    payload: {}
  });
};

export const receivedPatchAccount = account => {
  return {
    type: RECEIVED_PATCH_ACCOUNT,
    payload: account
  };
};

export const requestLoginAttempt = (email, password) => async (
  dispatch,
  getState
) => {
  const stompClient = getState().stomp.client;
  const { replyTo } = getState().stomp;
  const params = {
    params: {
      query: {
        email,
        password
      }
    }
  };

  let obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/account/account.request.login',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );

  dispatch({
    type: REQUEST_LOGIN_ATTEMPT,
    payload: {}
  });
};

export const receivedLoginSuccess = loginReply => async (
  dispatch,
  getState
) => {
  localStorageClient.set('token', loginReply.jwt);
  dispatch({
    type: RECEIVED_LOGIN_SUCCESS,
    payload: loginReply.account.data[0]
  });
};

export const receivedLoginFailure = loginReply => async (
  dispatch,
  getState
) => {
  dispatch({
    type: RECEIVED_LOGIN_FAILURE,
    payload: {}
  });
};

export const logout = () => async (dispatch, getState) => {
  dispatch({
    type: LOGOUT,
    payload: {}
  });
};
