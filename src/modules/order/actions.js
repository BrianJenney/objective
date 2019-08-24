import { REQUEST_CREATE_ORDER, RECEIVED_CREATE_ORDER } from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestCreateOrder = (cart, nonce) => async (
  dispatch,
  getState
) => {
  const { client, replyTo } = getState().stomp;
  const params = {
    data: { cart, nonce }
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
