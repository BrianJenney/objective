import { REQUEST_VARIANTS, RECEIVED_VARIANTS } from './types';
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestFetchProductVariants = productId => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    'params': {
      'query': {
        'product_id': productId
      }
    }
  };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/variant/variant.request.find', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: REQUEST_VARIANTS,
    payload: {}
  });
}

export const receivedFetchProductVariants = variants => {
  return {
    type: RECEIVED_VARIANTS,
    payload: variants
  }
}