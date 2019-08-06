import {
  REQUEST_CREATE_ORDER,
  RECEIVED_CREATE_ORDER
} from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

//is this the proper place for this code?
export const requestCreateOrder = cart => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    data: { 'cart': cart }
  };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/order/order.request.create', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
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