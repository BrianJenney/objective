import { REQUEST_FETCH_STOREFRONT, RECEIVED_FETCH_STOREFRONT } from './types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_FETCH_STOREFRONT:
    return { ...state };
  case RECEIVED_FETCH_STOREFRONT:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};