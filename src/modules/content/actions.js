import { REQUEST_FETCH_CONTENT, RECEIVED_FETCH_CONTENT } from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestFetchContent = url => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    'params': {
      'query': {
        'slug': url
      }
    }
  };

  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/content/content.request.find', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);

  dispatch({
    type: REQUEST_FETCH_CONTENT,
    payload: {}
  });
}

export const receivedFetchContent = content => {
  return {
    type: RECEIVED_FETCH_CONTENT,
    payload: content
  }
}