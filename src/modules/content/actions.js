import { REQUEST_FETCH_CONTENT, RECEIVED_FETCH_CONTENT } from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestFetchContent = contentId => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  let url = window.location.pathname;
  const params = {
    'params': {
      'query': {
        'contentPage': url
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