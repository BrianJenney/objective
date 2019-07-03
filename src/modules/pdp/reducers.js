import { 
  REQUEST_PRODUCT, 
  RECEIVED_PRODUCT, 
  REQUEST_VARIANTS, 
  RECEIVED_VARIANTS 
} from './types';

const INITIAL_STATE = {
  selectedProduct: {},
  variants: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case REQUEST_PRODUCT:
        return { ...state };
      case RECEIVED_PRODUCT:
        console.log(action.payload);
        return Object.assign({}, state, {
          selectedProduct: action.payload
        });
      case REQUEST_VARIANTS:
        return { ...state };
      case RECEIVED_VARIANTS:
        return Object.assign({}, state, {
          variants: action.payload
        });
      default:
        return state;
    }
};