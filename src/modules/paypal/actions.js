import { SET_CHECKOUT_PAYPAL_PAYLOAD, UNSET_CHECKOUT_PAYPAL_PAYLOAD } from './types';

export const setCheckoutPaypalPayload = payload => dispatch => {
  dispatch({
    type: SET_CHECKOUT_PAYPAL_PAYLOAD,
    payload
  });
};

export const unsetCheckoutPaypalPayload = () => dispatch => {
  dispatch({
    type: UNSET_CHECKOUT_PAYPAL_PAYLOAD,
    payload: {}
  });
};
