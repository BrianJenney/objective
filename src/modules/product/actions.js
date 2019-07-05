import {
  REQUEST_FETCH_PRODUCTS,
  RECEIVED_FETCH_PRODUCTS,
  REQUEST_FETCH_PRODUCT,
  RECEIVED_FETCH_PRODUCT,
  REQUEST_FETCH_VARIANTS,
  RECEIVED_FETCH_VARIANTS
} from './types';

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
};

export const receivedFetchProducts = products => {
  console.log('***** Received Fetch Products *****');
  console.log(products);
  return {
    type: RECEIVED_FETCH_PRODUCTS,
    payload: products
  };
};

export const requestFetchProduct = productId => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    'id': productId
  };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/product/product.request.get', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: REQUEST_FETCH_PRODUCT,
    payload: {}
  });
};

export const receivedFetchProduct = product => {
  return {
    type: RECEIVED_FETCH_PRODUCT,
    payload: product
  };
};

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
    type: REQUEST_FETCH_VARIANTS,
    payload: {}
  });
};

export const receivedFetchProductVariants = variants => {
  return {
    type: RECEIVED_FETCH_VARIANTS,
    payload: variants
  };
};