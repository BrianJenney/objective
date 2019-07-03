import { REQUEST_FETCH_PRODUCTS, RECEIVED_FETCH_PRODUCTS } from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestFetchProducts = productids => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    'params': {
      'query': {
        '_id': { $in: productids }
      }
    }
  };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/product/product.request.find', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: REQUEST_FETCH_PRODUCTS,
    payload: {}
  });
}

export const receivedFetchProducts = products => {
  return {
    type: RECEIVED_FETCH_PRODUCTS,
    payload: products
  }
}