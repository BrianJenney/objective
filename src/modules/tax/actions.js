import {
  REQUEST_CALCULATE_TAX,
  RECEIVED_CALCULATE_TAX,
} from './types';

// const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestCalculateTax = (shippingAddress, subtotal) => (dispatch, getState) => {
  const { client, replyTo } = getState().stomp;

  dispatch({
    type: REQUEST_CALCULATE_TAX,
  });

  const params = {
    data: {
      shippingAddress,
      subtotal
    }
  };
  const payload = JSON.stringify(msgpack.encode(params));
  client.send(
    '/exchange/tax/tax.request.calculate',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    payload
  );

};

export const receivedCalculateTax = data => dispatch => {
  dispatch({
    type: RECEIVED_CALCULATE_TAX,
    payload: data
  });
};
