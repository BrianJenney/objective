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

const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestCreateOrder = (cart, nonceOrToken) => async (dispatch, getState) => {
  dispatch({
    type: REQUEST_CREATE_ORDER,
    payload: { isLoading: true }
  });

  const { client: stompClient, replyTo } = getState().stomp;
  const { merchantAccountId } = getState().storefront;

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

  let params = {
    data: { cart },
    params: {
      nonceOrToken,
      merchantAccountId,
      ...(localStorageClient.get('clickId') && {
        clickId: localStorageClient.get('clickId')
      })
    }
  };

  if (cart.account_jwt) {
    const account_jwt = cart.account_jwt;
    params.params.account_jwt = account_jwt;
    delete cart.account_jwt;
  } else if (cart.accountInfo) {
    const accountInfo = cart.accountInfo;
    params.params.accountInfo = accountInfo;
    delete cart.accountInfo;
  }

  const payload = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/order/order.request.createorder',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );
  // @segment - Order Submitted Event
  window.analytics.track('Order Submitted', {
    cart_id: cart._id
  });
};

export const receivedCreateOrderSuccess = order => async (dispatch, getState) => {
  dispatch({
    type: RECEIVED_CREATE_ORDER_SUCCESS,
    payload: order
  });

  // @segment Order Completed Event
  // @TODO hard coded "Credit Card" in payment_method should be updated once we introduce PayPal
  let orderItemsTransformed = [];
  order.items.map(item => {
    orderItemsTransformed.push({
      brand: order.storeCode,
      image_url: 'https:' + item.variant_img,
      name: item.variant_name,
      price: item.unit_price,
      product_id: item.variant_id,
      quantity: item.quantity,
      sku: item.sku,
      variant: item.variant_name
    });
  });

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
    order_link: 'https://objectivewellness.com/orders/' + order._id,
    payment_method: 'Credit Card',
    payment_method_detail: order.paymentData.cardType,
    products: orderItemsTransformed,
    shipping: order.shippingMethod.price,
    subtotal: order.subtotal,
    tax: order.tax,
    total: order.total
  });
};

export const receivedCreateOrderFailure = order => async (dispatch, getState) => {
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

export const requestCancelOrder = orderId => async (dispatch, getState) => {
  dispatch({
    type: REQUEST_CANCEL_ORDER,
    payload: { isLoading: true }
  });

  const { client: stompClient, replyTo } = getState().stomp;
  const account_jwt = getState().account.data.account_jwt;
  const params = {
    data: { orderId },
    params: { account_jwt }
  };
  const payload = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/order/order.request.cancelorder',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      jwt: account_jwt,
      token: localStorageClient.get('olympusToken')
    },
    payload
  );
};

export const requestFindOrdersByAccount = (accountJwt, query = { accountId: null }) => (dispatch, getState) => {
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

export const requestFindUnauthenticatedOrders = (accountJwt, query = { accountId: null }) => (dispatch, getState) => {
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
  } else if (getState().account.data.hasOwnProperty('account_jwt')) {
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

export const receivedGetOrder = order => (dispatch, getState) => {
  dispatch({
    type: RECEIVED_GET_ORDER,
    payload: order
  });
};

export const resetOrderState = () => {
  return {
    type: RESET_ORDER_STATE
  };
};
