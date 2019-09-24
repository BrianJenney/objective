import {
  REQUEST_CALCULATE_TAX,
  RECEIVED_CALCULATE_TAX,
} from './types';
import {updateCartWithTaxCalculation} from "../cart/actions";

// const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestCalculateTax = (shippingAddress, subtotal) => (dispatch, getState) => {
  const { client, replyTo } = getState().stomp;

  dispatch({
    type: REQUEST_CALCULATE_TAX,
  });

  const params = {
    shippingAddress,
    subtotal
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
  dispatch(updateCartWithTaxCalculation(data.tax, data.rate));
  dispatch({
    type: RECEIVED_CALCULATE_TAX,
  });
};
