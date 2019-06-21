import { REQUEST_STOREFRONT } from './types';
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestFetchStorefront = storefrontId => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    'params': {
      'query': {
        '_id': storefrontId
      }
    }
  };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/store/store.request.find', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: REQUEST_STOREFRONT,
    payload: {}
  });
}

export const receivedFetchStorefront = storeFront => {
  return {
    type: 'RECEIVED_STOREFRONT',
    payload: storeFront
  }
}