import {
  REQUEST_CREATE_ORDER,
  RECEIVED_CREATE_ORDER_SUCCESS,
  RECEIVED_CREATE_ORDER_FAILURE,
  REQUEST_CANCEL_ORDER,
  RECEIVED_CANCEL_ORDER,
  REQUEST_FIND_ORDERS_BY_ACCOUNT,
  RECEIVED_FIND_ORDERS_BY_ACCOUNT,
  REQUEST_GET_ORDER,
  RECEIVED_GET_ORDER,
  RESET_ORDER_STATE
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
  const { merchantAccountId } = getState().store;

  /**
   * Total hack here, but if you refresh the page, you don't get a these fields
   * in your cart & orders will fail. Just make sure they're all there.
   */
  if (!cart.catalogId || !cart.storeCode || !cart.email) {
    console.log('***** HAD TO LOAD SOME CART DATA FROM HACK *****');
    cart.catalogId = getState().storefront.catalogId;
    cart.storeCode = getState().storefront.code;
    cart.email = getState().account.data.email;
  }

  const params = {
    data: { cart },
    params: { account_jwt, nonceOrToken, merchantAccountId }
  };

  const payload = JSON.stringify(msgpack.encode(params));
  client.send(
    '/exchange/order/order.request.createorder',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      jwt: account_jwt
    },
    payload
  );
  // @segment - Order Submitted Event
  window.analytics.track('Order Submitted', {
    'cart_id': cart._id
  });
};

export const receivedCreateOrderSuccess = order => async (dispatch, getState) => {
  dispatch({
    type: RECEIVED_CREATE_ORDER_SUCCESS,
    payload: order
  });
};

export const receivedCreateOrderFailure = order => async (dispatch, getState) => {
  dispatch({
    type: RECEIVED_CREATE_ORDER_FAILURE,
    payload: order
  });
  // @segment - Order Failed Event
  window.analytics.track('Order Failed', {
    'cart_id': localStorage.cartId,
    'error_message': order
  });
};

export const requestCancelOrder = orderId => async (dispatch, getState) => {
  dispatch({
    type: REQUEST_CANCEL_ORDER,
    payload: { isLoading: true }
  });

  const { client, replyTo } = getState().stomp;
  const account_jwt = getState().account.data.account_jwt;
  const params = {
    data: { orderId },
    params: { account_jwt }
  };
  const payload = JSON.stringify(msgpack.encode(params));
  client.send('/exchange/order/order.request.cancelorder', {
    'reply-to': replyTo,
    'correlation-id': ObjectId(),
    jwt: account_jwt
  }, payload);
};

export const requestFindOrdersByAccount = accountJwt => (
  dispatch,
  getState
) => {
  const { client, replyTo } = getState().stomp;
  const params = {
    params: {
      account_jwt: accountJwt,
      idField: 'accountId', // use this to tell the MS where to substitute the decoded id
      query: { accountId: null }
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

export const requestGetOrder = (accountJwt, orderId) => (
  dispatch,
  getState
) => {
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

export const receivedGetOrder = order => (dispatch, getState) => {
  dispatch({
    type: RECEIVED_GET_ORDER,
    payload: order
  });
};

export const resetOrderState = () => {
  return {
    type: RESET_ORDER_STATE,
  };
};