import {
  REQUEST_FETCH_ACCOUNT,
  RECEIVED_FETCH_ACCOUNT,
  REQUEST_PATCH_ACCOUNT,
  RECEIVED_PATCH_ACCOUNT
} from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

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

  var obj = JSON.stringify(msgpack.encode(params));
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

export const receivedFetchAccount = account => {
  return {
    type: RECEIVED_FETCH_ACCOUNT,
    payload: account
  };
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
  var obj = JSON.stringify(msgpack.encode(params));
  console.log(params);
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
