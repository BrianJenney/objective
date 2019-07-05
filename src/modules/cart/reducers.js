import { REQUEST_FETCH_CART, RECEIVED_FETCH_CART } from './types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_FETCH_CART:
    return { ...state };
  case RECEIVED_FETCH_CART:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};