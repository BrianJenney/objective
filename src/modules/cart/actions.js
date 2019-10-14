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
  REQUEST_REMOVE_CART_BY_ID,
  REQUEST_ADD_TO_CART,
  REQUEST_REMOVE_FROM_CART,
  REQUEST_UPDATE_QUANTITY,
  REQUEST_MERGE_CARTS,
  REQUEST_ADD_COUPON,
  REQUEST_REMOVE_COUPON,
  REQUEST_SET_SHIPPING_ADDRESS,
  RESET_CART
} from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');
const localStorageClient = require('store');

export const requestAddToCart = (cart, product, quantity) => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    cart,
    product,
    quantity,
    segmentAnonymousId: localStorageClient.get('ajs_anonymous_id')
  };
  const obj = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/cart/cart.request.addtocart',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );

  dispatch({
    type: REQUEST_ADD_TO_CART,
    payload: {}
  });

  // @segment Product Added
  window.analytics.track('Product Added', {
    image_url: 'https:' + product.variant_img,
    quantity: 1,
    sku: product.sku,
    price: Number.parseFloat(product.unit_price),
    product_id: product.variant_id,
    variant: product.variant_id,
    name: product.variant_name,
    brand: cart.storeCode,
    cart_id : cart._id
  });
};

export const requestRemoveFromCart = (cart, product) => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    cart,
    product
  };
  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/cart/cart.request.removefromcart',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );
  dispatch({
    type: REQUEST_REMOVE_FROM_CART,
    payload: {}
  });

  let item = cart.items[product];

  // @segment Product Removed
  window.analytics.track('Product Removed', {
    image_url: 'https:' + item.variant_img,
    quantity: item.quantity,
    sku: item.sku,
    price: Number.parseFloat(item.unit_price),
    product_id: item.variant_id,
    variant: item.variant_id,
    name: item.variant_name,
    brand: cart.storeCode,
    cart_id: cart._id
  });
};

export const requestUpdateQuantity = (cart, product, quantity) => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    cart,
    product,
    quantity
  };
  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/cart/cart.request.updatequantity',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );
  dispatch({
    type: REQUEST_UPDATE_QUANTITY,
    payload: {}
  });
};

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
  let params = {
    data: {
      storeCode: getState().storefront.code,
      catalogId: getState().storefront.catalogId
    }
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
  const params = {
    id: cartId,
    data: patches
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
  dispatch({
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

export const setCartDrawerOpened = open => (dispatch, getState) => {
  let cart = getState().cart;

  if (cart.setCartDrawerOpened != open) {
    let orderItemsTransformed = [];

    cart.items.forEach(item => {
      orderItemsTransformed.push({
        image_url: 'https:' + item.variant_img,
        quantity: item.quantity,
        sku: item.sku,
        price: Number.parseFloat(item.unit_price),
        product_id: item.variant_id,
        variant: item.variant_id,
        name: item.variant_name,
        brand: cart.storeCode
      });
    });
  
    if (open) {
      // @segment Cart Viewed
      window.analytics.track('Cart Viewed', {
        'cart_id': cart._id,
        'num_products': cart.items.reduce((acc, item) => acc + item.quantity, 0),
        'products': orderItemsTransformed
      });
    } else {
      // @segment Cart Dismissed
      window.analytics.track('Cart Dismissed', {
        'cart_id': cart._id,
        'num_products': cart.items.reduce((acc, item) => acc + item.quantity, 0),
        'products': orderItemsTransformed
      });
    }  
  }

  dispatch({
    type: SET_CART_DRAWER_OPENED,
    payload: open
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

export const requestMergeCarts = (cartId, accountId) => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    cartId,
    accountId
  };
  const obj = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/cart/cart.request.mergecarts',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );

  dispatch({
    type: REQUEST_MERGE_CARTS,
    payload: {}
  });
};

export const requestAddCoupon = (cartId, promoCode) => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    cartId,
    promoCode
  };
  const obj = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/cart/cart.request.addcoupon',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );

  dispatch({
    type: REQUEST_ADD_COUPON,
    payload: {}
  });
};

export const requestRemoveCoupon = cartId => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    cartId
  };
  const obj = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/cart/cart.request.removecoupon',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );

  dispatch({
    type: REQUEST_REMOVE_COUPON,
    payload: {}
  });
};

export const requestSetShippingAddress = (cartId, address) => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    cartId,
    address
  };
  const obj = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/cart/cart.request.setshippingaddress',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    },
    obj
  );

  dispatch({
    type: REQUEST_SET_SHIPPING_ADDRESS,
    payload: {}
  });
};

export const resetCart = () => {
  return {
    type: RESET_CART,
  };
};