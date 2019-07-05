import { 
  REQUEST_FETCH_PRODUCTS,
  RECEIVED_FETCH_PRODUCTS,
  REQUEST_FETCH_PRODUCT, 
  RECEIVED_FETCH_PRODUCT, 
  REQUEST_FETCH_VARIANTS, 
  RECEIVED_FETCH_VARIANTS
} from './types';

const INITIAL_STATE = {
  products: {},
  product: {},
  variants: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_FETCH_PRODUCTS:
    return { ...state };
  case RECEIVED_FETCH_PRODUCTS:
    return Object.assign({}, state, {
      products: action.payload
    });
  case REQUEST_FETCH_PRODUCT:
    return { ...state };
  case RECEIVED_FETCH_PRODUCT:
    return Object.assign({}, state, {
      product: action.payload
    });
  case REQUEST_FETCH_VARIANTS:
    return { ...state };
  case RECEIVED_FETCH_VARIANTS:
    return Object.assign({}, state, {
      variants: action.payload
    });
  default:
    return state;
  }
};