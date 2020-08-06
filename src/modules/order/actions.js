/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import {
  RECEIVED_CREATE_ORDER_SUCCESS,
  RECEIVED_CREATE_ORDER_FAILURE,
  RECEIVED_CANCEL_ORDER_SUCCESS,
  RECEIVED_CANCEL_ORDER_FAILURE,
  REQUEST_FIND_ORDERS_BY_ACCOUNT,
  REQUEST_GET_ORDER,
  RECEIVED_GET_ORDER,
  RESET_ORDER_STATE
} from './types';

const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const receivedCreateOrderSuccess = order => async dispatch => {
  dispatch({
    type: RECEIVED_CREATE_ORDER_SUCCESS,
    payload: order
  });
  // @segment Order Completed Event
  // @TODO hard coded "Credit Card" in payment_method should be updated once we introduce PayPal
  const orderItemsTransformed = [];
  order.items.forEach(item => {
    orderItemsTransformed.push({
      brand: order.storeCode,
      image_url: `https:${item.variant_img}`,
      name: item.variant_name,
      price: item.unit_price,
      product_id: item.variant_id,
      quantity: item.quantity,
      sku: item.sku,
      free_item: !!item.pipInsertId,
      variant: item.variant_name
    });
  });

  const paymentMethod =
    Object.prototype.hasOwnProperty.call(order, 'method') && order.paymentData.method === 'paypal'
      ? 'paypal'
      : 'creditcard';
  window.analytics.track('Order Completed', {
    affiliation: order.storeCode,
    coupon: order.promo && order.promo.code ? order.promo.code : '',
    currency: 'USD',
    discount: order.discount,
    email: order.email,
    est_ship_date: order.shippingMethod.deliveryEstimate,
    item_count: order.items.length,
    order_date: order.transactions.transactionDate,
    order_id: order.orderNumber,
    order_link: `https://objectivewellness.com/orders/${order._id}`,
    payment_method: paymentMethod === 'creditcard' ? 'Credit Card' : 'PayPal',
    payment_method_detail:
      // prettier-ignore
      // eslint-disable-next-line no-nested-ternary
      paymentMethod === 'creditcard'
        ? order.paymentData.cardType
        : Object.prototype.hasOwnProperty.call(order.paymentData, 'email')
          ? order.paymentData.email
          : '',
    products: orderItemsTransformed,
    shipping: order.shippingMethod.price,
    subtotal: order.subtotal,
    tax: order.tax,
    total: order.total
  });
};

export const receivedCreateOrderFailure = order => async dispatch => {
  dispatch({
    type: RECEIVED_CREATE_ORDER_FAILURE,
    payload: order
  });
  // @segment - Order Failed Event
  window.analytics.track('Order Failed', {
    cart_id: localStorage.cartId,
    error_message: order
  });
};

export const receivedCancelOrderSuccess = order => async dispatch => {
  dispatch({
    type: RECEIVED_CANCEL_ORDER_SUCCESS,
    payload: order
  });

  // @segment Cancel Order Completed Event
  // @TODO hard coded "Credit Card" in payment_method should be updated once we introduce PayPal
  const orderItemsTransformed = [];
  order.items.forEach(item => {
    orderItemsTransformed.push({
      brand: order.storeCode,
      image_url: `https:${item.variant_img}`,
      name: item.variant_name,
      price: item.unit_price,
      product_id: item.variant_id,
      quantity: item.quantity,
      sku: item.sku,
      variant: item.variant_name
    });
  });

  window.analytics.track('Order Cancelled', {
    billing_city: order.billingAddress.city,
    billing_country: order.billingAddress.country,
    billing_state: order.billingAddress.state,
    billing_zip: order.billingAddress.zipcode,
    coupon: order.promo && order.promo.code ? order.promo.code : '',
    currency: 'USD',
    discount: order.discount,
    email: order.email,
    est_ship_date: order.shippingMethod.deliveryEstimate,
    item_count: order.items.length,
    order_date: order.transactions.transactionDate,
    order_id: order.orderNumber,
    order_link: `https://objectivewellness.com/orders/${order._id}`,
    payment_method: 'Credit Card',
    payment_method_detail: order.paymentData.cardType,
    products: orderItemsTransformed,
    shipping: order.shippingMethod.price,
    shipping_city: order.shippingAddress.city,
    shipping_country: order.shippingAddress.country,
    shipping_state: order.shippingAddress.state,
    shipping_zip: order.shippingAddress.zipcode,
    subtotal: order.subtotal,
    tax: order.tax,
    total: order.total
  });
};

export const receivedCancelOrderFailure = order => async dispatch => {
  dispatch({
    type: RECEIVED_CANCEL_ORDER_FAILURE,
    payload: order
  });
  // @segment - Cancel Order Failed Event
  window.analytics.track('Order Cancel Failed', {
    order_id: order.orderNumber,
    error_message: order
  });
};

export const requestFindOrdersByAccount = (accountJwt, query = { accountId: null }) => (
  dispatch,
  getState
) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    params: {
      idField: 'accountId', // use this to tell the MS where to substitute the decoded id
      query
    }
  };

  if (accountJwt) {
    params.params.account_jwt = accountJwt;
  }
  const payload = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/order/order.request.find',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );
  dispatch({
    type: REQUEST_FIND_ORDERS_BY_ACCOUNT,
    payload: {}
  });
};

export const requestFindUnauthenticatedOrders = (accountJwt, query = { accountId: null }) => (
  dispatch,
  getState
) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    params: {
      idField: 'accountId', // use this to tell the MS where to substitute the decoded id
      query
    }
  };

  if (accountJwt) {
    params.params.account_jwt = accountJwt;
  }
  const payload = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/order/order.request.findUnauthenticated',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );
  dispatch({
    type: REQUEST_FIND_ORDERS_BY_ACCOUNT,
    payload: {}
  });
};

export const requestGetOrder = (accountJwt, orderId) => (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  let account_jwt = '';
  if (accountJwt) {
    account_jwt = accountJwt;
  } else if (getState().account.data.account_jwt) {
    // eslint-disable-next-line prefer-destructuring
    account_jwt = getState().account.data.account_jwt;
  }

  dispatch({
    type: REQUEST_GET_ORDER,
    payload: { isLoading: true }
  });

  const getParams = {
    id: orderId,
    params: {
      account_jwt
    }
  };

  const payload = JSON.stringify(msgpack.encode(getParams));

  stompClient.send(
    '/exchange/order/order.request.get',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );
};

export const receivedGetOrder = order => dispatch => {
  dispatch({
    type: RECEIVED_GET_ORDER,
    payload: order
  });
};

export const resetOrderState = () => ({
  type: RESET_ORDER_STATE
});
