import { REQUEST_FETCH_ACCOUNT, RECEIVED_FETCH_ACCOUNT } from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestFetchAccount = url => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    'params': {
      'query': {
        '_id': '5cdc7405da53494ee0f3bafe'
      }
    }
  };

  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/account/account.request.find', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);

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