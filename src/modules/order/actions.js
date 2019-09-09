import {
  REQUEST_CREATE_ORDER,
  RECEIVED_CREATE_ORDER,
  REQUEST_FIND_ALL_ORDERS,
  RECEIVED_FIND_ALL_ORDERS,
  REQUEST_FIND_ORDERS_BY_ACCOUNT,
  RECEIVED_FIND_ORDERS_BY_ACCOUNT
} from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestCreateOrder = (cart, nonceOrToken) => async (
  dispatch,
  getState
) => {
  // The account JWT needs to be passed in as its own argument
  const account_jwt = { account_jwt: cart.account_jwt}
  const { client, replyTo } = getState().stomp;
  const params = {
    data: { ...account_jwt, cart, nonceOrToken }
  };

  const payload = JSON.stringify(msgpack.encode(params));
  client.send(
    '/exchange/order/order.request.create',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    payload
  );
  await dispatch({
    type: REQUEST_CREATE_ORDER,
    payload: {}
  });
};

export const receivedCreateOrder = order => {
  return {
    type: RECEIVED_CREATE_ORDER,
    payload: order
  };
};

export const requestFindAllOrderIDs = accountJwt => (dispatch, getState) => {
  const { client, replyTo } = getState().stomp;
  const params = {
    params: {
      query: {
        'cart.account_id': accountJwt
      }
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


export const requestFindOrdersByAccount = accountJwt => (
  dispatch,
  getState
) => {
  const { client, replyTo } = getState().stomp;
  const params = {
    params: {
      query: {
        account_id: accountJwt
      }
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
