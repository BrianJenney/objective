import { SET_CART_NOTIFICATION } from './types';

export const setCartNotification = (booleanVal, variant = null) => dispatch => {
  dispatch({
    type: SET_CART_NOTIFICATION,
    payload: {
      cartNotification: booleanVal,
      notificationVariant: variant
    }
  });
};
