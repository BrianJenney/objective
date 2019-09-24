import {
  REQUEST_FETCH_CART,
  RECEIVED_FETCH_CART,
  REQUEST_CREATE_CART,
  RECEIVED_CREATE_CART,
  REQUEST_UPDATE_CART,
  RECEIVED_UPDATE_CART,
  REQUEST_PATCH_CART,
  RECEIVED_PATCH_CART,
  SET_CART_DRAWER_OPENED,
  REQUEST_FETCH_CART_BY_EMAIL,
  REQUEST_REMOVE_CART_BY_ID
} from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestFetchCart = cartId => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    params: {
      query: {
        _id: cartId
      }
    }
  };
  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/cart/cart.request.find',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );
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
    data: { storeCode:process.env.REACT_APP_STORE_CODE }
  };
  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/cart/cart.request.create',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );
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

export const requestUpdateCart = (cartId, updates) => async (
  dispatch,
  getState
) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    params: {
      query: {
        _id: cartId
      }
    },
    data: updates
  };
  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/cart/cart.request.update',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );
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

export const requestPatchCart = (cartId, patches) => async (
  dispatch,
  getState
) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const email = getState().account.data.email;
  const realPatches = { ...patches, email };
  const params = {
    id: cartId,
    data: realPatches
  };
  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/cart/cart.request.patch',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );
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

export const setCartDrawerOpened = (open) => {
  return {
    type: SET_CART_DRAWER_OPENED,
    payload: open
  };
};

export const requestFetchCartByEmail = email => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    params: {
      query: {
        email
      }
    }
  };
  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/cart/cart.request.find',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );
  dispatch({
    type: REQUEST_FETCH_CART_BY_EMAIL,
    payload: {}
  });
};

export const requestRemoveCartById = id => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    id,
    params: {}
  };
  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/cart/cart.request.remove',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );
  dispatch({
    type: REQUEST_REMOVE_CART_BY_ID,
    payload: {}
  });
};
