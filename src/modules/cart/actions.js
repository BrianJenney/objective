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
  UNSET_CART_MERGE_NOTIFICATION
} from './types';

const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');
const jwt = require('jsonwebtoken');

export const requestAddToCart = (cart, product, quantity) => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  console.log('this cart', cart);
  console.log('this produc', product);
  console.log('this quantity', quantity);
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
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );

  dispatch({
    type: REQUEST_ADD_TO_CART,
    payload: {}
  });

  // @segment Product Added
  window.analytics.track('Product Added', {
    image_url: `https:${product.assets.thumbnail}`,
    quantity: 1,
    sku: product.sku,
    price: Number.parseFloat(product.effectivePrice),
    product_id: product.id,
    variant: product.name,
    name: product.name,
    brand: cart.storeCode,
    cart_id: cart._id
  });
};

export const requestRemoveFromCart = (cart, product) => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    cart,
    product
  };
  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/cart/cart.request.removefromcart',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );
  dispatch({
    type: REQUEST_REMOVE_FROM_CART,
    payload: {}
  });

  const item = cart.items[product];

  // @segment Product Removed
  window.analytics.track('Product Removed', {
    image_url: `https:${item.variant_img}`,
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
  const { client: stompClient, replyTo } = getState().stomp;
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
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );
  dispatch({
    type: REQUEST_UPDATE_QUANTITY,
    payload: {}
  });
};

export const requestFetchCart = cartId => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
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
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );
  dispatch({
    type: REQUEST_FETCH_CART,
    payload: {}
  });
};

export const receivedFetchCart = cart => ({
  type: RECEIVED_FETCH_CART,
  payload: cart
});

export const requestCreateCart = () => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  let params = {
    data: {
      storeCode: getState().storefront.code,
      catalogId: getState().storefront.catalogId
    }
  };

  const account = getState().account;

  if (account.data && account.data.account_jwt) {
    const accountId = jwt.decode(account.data.account_jwt).account_id;
    params.data.accountId = accountId;
  }

  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/cart/cart.request.create',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );
  dispatch({
    type: REQUEST_CREATE_CART,
    payload: {}
  });
};

export const receivedCreateCart = cart => ({
  type: RECEIVED_CREATE_CART,
  payload: cart
});

export const requestUpdateCart = (cartId, updates) => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
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
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );
  dispatch({
    type: REQUEST_UPDATE_CART,
    payload: {}
  });
};

export const receivedUpdateCart = cart => ({
  type: RECEIVED_UPDATE_CART,
  payload: cart
});

export const requestPatchCart = (cartId, patches) => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    id: cartId,
    data: patches
  };
  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/cart/cart.request.patch',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );
  dispatch({
    type: REQUEST_PATCH_CART,
    payload: {}
  });
};

export const receivedPatchCart = cart => ({
  type: RECEIVED_PATCH_CART,
  payload: cart
});

export const setCartDrawerOpened = (open, trackCartDismissed = true) => (dispatch, getState) => {
  const { cart } = getState();

  if (cart.setCartDrawerOpened != open) {
    const orderItemsTransformed = [];

    cart.items.forEach(item => {
      orderItemsTransformed.push({
        image_url: `https:${item.variant_img}`,
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
      if (!cart.cartDrawerOpened) {
        window.analytics.track('Cart Viewed', {
          cart_id: cart._id,
          num_products: cart.items.reduce((acc, item) => acc + item.quantity, 0),
          products: orderItemsTransformed
        });
      }
    } else {
      // @segment Cart Dismissed
      if (cart.cartDrawerOpened) {
        if (trackCartDismissed) {
          window.analytics.track('Cart Dismissed', {
            cart_id: cart._id,
            num_products: cart.items.reduce((acc, item) => acc + item.quantity, 0),
            products: orderItemsTransformed
          });
        }
      }
    }
  }

  dispatch({
    type: SET_CART_DRAWER_OPENED,
    payload: open
  });
};

export const unSetCartMergeNotification = () => dispatch => {
  dispatch({
    type: UNSET_CART_MERGE_NOTIFICATION,
    payload: false
  });
};

export const requestRemoveCartById = id => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    id,
    params: {}
  };
  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/cart/cart.request.remove',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );
  dispatch({
    type: REQUEST_REMOVE_CART_BY_ID,
    payload: {}
  });
};

export const requestMergeCarts = (cartId, accountId) => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    cartId,
    accountId
  };
  const obj = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/cart/cart.request.mergecarts',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );

  dispatch({
    type: REQUEST_MERGE_CARTS,
    payload: {}
  });
};

export const requestAddCoupon = (cartId, promoCode) => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    cartId,
    promoCode
  };
  const obj = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/cart/cart.request.addcoupon',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );

  dispatch({
    type: REQUEST_ADD_COUPON,
    payload: {}
  });
};

/*
 * @description - Tracks Coupon Applied Segment event when
 * cart microservice applies coupon to cart and sends back a response to front end
 * @return - void
 */
export const segmentAddCouponReceived = cart => {
  window.analytics.track('Coupon Applied', {
    cart_id: cart._id,
    coupon_id: cart.promo && cart.promo.code ? cart.promo.code : '',
    coupon_name: cart.promo && cart.promo.code ? cart.promo.code : '',
    discount: cart.discount,
    order_id: cart.accountId
  });
};

/*
 * @description - Tracks Coupon Removed Segment event when
 * cart microservice removes coupon from cart and sends back a response to front end
 * @return - void
 */
export const segmentRemoveCouponReceived = cart => {
  window.analytics.track('Coupon Removed', {
    cart_id: cart._id,
    coupon_id: cart.promo && cart.promo.code ? cart.promo.code : '',
    coupon_name: cart.promo && cart.promo.code ? cart.promo.code : '',
    discount: cart.discount,
    order_id: cart.accountId ? cart.accountId : ''
  });
};

export const requestRemoveCoupon = cartId => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    cartId
  };
  const obj = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/cart/cart.request.removecoupon',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );

  dispatch({
    type: REQUEST_REMOVE_COUPON,
    payload: {}
  });
};

export const requestSetShippingAddress = (cartId, address) => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    cartId,
    address
  };
  const obj = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/cart/cart.request.setshippingaddress',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );

  dispatch({
    type: REQUEST_SET_SHIPPING_ADDRESS,
    payload: {}
  });
};
