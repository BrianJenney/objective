import {
  REQUEST_FETCH_CART,
  RECEIVED_FETCH_CART,
  REQUEST_CREATE_CART,
  RECEIVED_CREATE_CART,
  REQUEST_UPDATE_CART,
  RECEIVED_UPDATE_CART,
  REQUEST_PATCH_CART,
  RECEIVED_PATCH_CART,
  REQUEST_ADD_ITEM_CART,
  RECEIVED_ADD_ITEM_CART,
  REQUEST_REMOVE_ITEM_CART,
  RECEIVED_REMOVE_ITEM_CART,
  REQUEST_CLEAR_CART,
  RECEIVED_CLEAR_CART,
  REQUEST_ADD_COUPON_CART,
  RECEIVED_ADD_COUPON_CART,
  REQUEST_REMOVE_COUPON_CART,
  RECEIVED_REMOVE_COUPON_CART
} from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestFetchCart = cartId => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    'params': {
      'query': {
        '_id': cartId
      }
    }
  };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/cart/cart.request.find', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: REQUEST_FETCH_CART,
    payload: {}
  });
};

export const receivedFetchCart = cart => {
  return {
    type: RECEIVED_FETCH_CART,
    payload: cart
  };
};

export const requestCreateCart = () => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    'data': {
    }
  };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/cart/cart.request.create', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: REQUEST_CREATE_CART,
    payload: {}
  });
};

export const receivedCreateCart = cart => {
  return {
    type: RECEIVED_CREATE_CART,
    payload: cart
  };
};

export const requestUpdateCart = (cartId, updates) => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    'params': {
      'query': {
        '_id': cartId
      }
    },
    'data': updates
  };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/cart/cart.request.update', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: REQUEST_UPDATE_CART,
    payload: {}
  });
};

export const receivedUpdateCart = cart => {
  return {
    type: RECEIVED_UPDATE_CART,
    payload: cart
  };
};

export const requestPatchCart = (cartId, patches) => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    id: cartId,
    data: patches
  };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/cart/cart.request.patch', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  await dispatch({
    type: REQUEST_PATCH_CART,
    payload: {}
  });
};

export const receivedPatchCart = cart => {
  return {
    type: RECEIVED_PATCH_CART,
    payload: cart
  };
};

export const requestAddItemCart = product => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = { product };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/cart/cart.item.request.create', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: REQUEST_ADD_ITEM_CART,
    payload: {}
  });
};

export const receivedAddItemCart = cart => {
  return {
    type: RECEIVED_ADD_ITEM_CART,
    payload: cart
  };
};

export const requestRemoveItemCart = product => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = { product };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/cart/cart.item.request.delete', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: REQUEST_REMOVE_ITEM_CART,
    payload: {}
  });
};

export const receivedRemoveItemCart = cart => {
  return {
    type: RECEIVED_REMOVE_ITEM_CART,
    payload: cart
  };
};

export const requestClearCart = product => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = { product };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/cart/cart.item.request.delete', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: REQUEST_CLEAR_CART,
    payload: {}
  });
};

export const receivedClearCart = cart => {
  return {
    type: RECEIVED_CLEAR_CART,
    payload: cart
  };
};

export const requestAddCouponCart = coupon => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = { coupon };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/cart/cart.coupon.request.create', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: REQUEST_ADD_COUPON_CART,
    payload: {}
  });
};

export const receivedAddCouponCart = cart => {
  return {
    type: RECEIVED_ADD_COUPON_CART,
    payload: cart
  };
};

export const requestRemoveCouponCart = coupon => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = { coupon };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/cart/cart.coupon.request.delete', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: REQUEST_REMOVE_COUPON_CART,
    payload: {}
  });
};

export const receivedRemoveCouponCart = cart => {
  return {
    type: RECEIVED_REMOVE_COUPON_CART,
    payload: cart
  };
};