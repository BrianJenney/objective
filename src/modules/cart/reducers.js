import { 
  REQUEST_CREATE_CART, 
  RECEIVED_CREATE_CART, 
  REQUEST_FETCH_CART, 
  RECEIVED_FETCH_CART,
  REQUEST_PATCH_CART, 
  RECEIVED_PATCH_CART 
} from './types';

const localStorageClient = require('store');

const INITIAL_STATE = {

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
    return { ...state, ...action.payload };
  case REQUEST_PATCH_CART:
    return { ...state };
  case RECEIVED_PATCH_CART:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};