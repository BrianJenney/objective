import {
  REQUEST_CREATE_ORDER,
  RECEIVED_CREATE_ORDER,
  REQUEST_FIND_ORDERS_BY_ACCOUNT,
  RECEIVED_FIND_ORDERS_BY_ACCOUNT,
  REQUEST_GET_ORDER,
  RECEIVED_GET_ORDER
} from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestCreateOrder = (cart, nonceOrToken) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: REQUEST_CREATE_ORDER,
    payload: { isLoading: true }
  });
  // The account JWT needs to be passed in as its own argument
  const account_jwt = cart.account_jwt;
  delete cart.account_jwt;
  const { client, replyTo } = getState().stomp;
  const params = {
    data: { cart },
    params: { account_jwt, nonceOrToken }
  };

  const payload = JSON.stringify(msgpack.encode(params));
  client.send(
    '/exchange/order/order.request.create',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      jwt: account_jwt,
      originalRequest: 'order.request.create'
    },
    payload
  );
};

export const receivedCreateOrder = order => {
  return {
    type: RECEIVED_CREATE_ORDER,
    payload: order
  };
};


export const requestFindOrdersByAccount = accountJwt => (
  dispatch,
  getState
) => {
  const { client, replyTo } = getState().stomp;
  const params = {
    params: {
      account_jwt: accountJwt,
      idField: 'account_id', // use this to tell the MS where to substitute the decoded id
      query: { account_id: null }
    }
  };
  const payload = JSON.stringify(msgpack.encode(params));
  client.send(
    '/exchange/order/order.request.find',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    payload
  );
  dispatch({
    type: REQUEST_FIND_ORDERS_BY_ACCOUNT,
    payload: {}
  });
};

export const requestGetOrder = (accountJwt, orderId) => (dispatch, getState) => {
  const { client, replyTo } = getState().stomp;
  dispatch({
    type: REQUEST_GET_ORDER,
    payload: { isLoading: true }
  });
  const getParams = {
    id: orderId,
    params: {
      account_jwt: accountJwt
    }
  };
  const payload = JSON.stringify(msgpack.encode(getParams));

  client.send(
    '/exchange/order/order.request.get',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    payload
  );
};

export const receivedGetOrder = order => {
  return {
    type: RECEIVED_GET_ORDER,
    payload: order
  };
};
