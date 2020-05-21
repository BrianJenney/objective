import { SET_CHECKOUT_PAYPAL_PAYLOAD, UNSET_CHECKOUT_PAYPAL_PAYLOAD } from './types';
  
  export default (state = {}, action) => {
    switch (action.type) {
      case SET_CHECKOUT_PAYPAL_PAYLOAD:
        return { ...state, ...action.payload };
      case UNSET_CHECKOUT_PAYPAL_PAYLOAD:
        return {};
      default:
        return state;
    }
  };