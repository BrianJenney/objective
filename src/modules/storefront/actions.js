import { REQUEST_FETCH_STOREFRONT, RECEIVED_FETCH_STOREFRONT } from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestFetchStorefront = storefrontCode => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    'params': {
      'query': {
        'code': storefrontCode,
        'status': 'active'
      }
    }
  };

  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/store/store.request.find', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);

  dispatch({
    type: REQUEST_FETCH_STOREFRONT,
    payload: {}
  });
};

export const receivedFetchStorefront = storeFront => {
  return {
    type: RECEIVED_FETCH_STOREFRONT,
    payload: storeFront
  };
};