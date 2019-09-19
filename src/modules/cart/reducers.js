import {
  REQUEST_CREATE_CART,
  RECEIVED_CREATE_CART,
  REQUEST_FETCH_CART,
  RECEIVED_FETCH_CART,
  REQUEST_PATCH_CART,
  RECEIVED_PATCH_CART,
  SET_CART_DRAWER_OPENED,
  REQUEST_FETCH_CART_BY_EMAIL,
  REQUEST_REMOVE_CART_BY_EMAIL
} from './types';

const localStorageClient = require('store');

const INITIAL_STATE = {
  items: [],
  subtotal: 0,
  total: 0,
  cartDrawerOpened: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CREATE_CART:
      return { ...state };
    case RECEIVED_CREATE_CART:
      localStorageClient.set('cartId', action.payload._id);
      return { ...state, ...action.payload };
    case REQUEST_FETCH_CART:
      return { ...state };
    case RECEIVED_FETCH_CART:
      if (action.payload !== undefined)
        localStorageClient.set('cartId', action.payload._id);
      return { ...state, ...action.payload };
    case REQUEST_PATCH_CART:
      return { ...state };
    case RECEIVED_PATCH_CART:
      return { ...state, ...action.payload };
    case SET_CART_DRAWER_OPENED:
      return { ...state, cartDrawerOpened: action.payload };
    case REQUEST_FETCH_CART_BY_EMAIL:
      return { ...state };
    case REQUEST_REMOVE_CART_BY_EMAIL:
      return { ...state };
    default:
      return state;
  }
};
