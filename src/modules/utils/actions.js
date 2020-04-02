import { SET_CART_NOTIFICATION, SET_LP_PROD_ADDED, SET_LP_COUPON_ADDED } from './types';

export const setCartNotification = (booleanVal, variant = null) => dispatch => {
  dispatch({
    type: SET_CART_NOTIFICATION,
    payload: {
      cartNotification: booleanVal,
      notificationVariant: variant
    }
  });
};

export const setLpProdAdded = booleanVal => dispatch => {
  dispatch({
    type: SET_LP_PROD_ADDED,
    payload: {
      lpProdAdded: booleanVal
    }
  });
};

export const setLpCouponAdded = booleanVal => dispatch => {
  dispatch({
    type: SET_LP_COUPON_ADDED,
    payload: {
      lpCouponAdded: booleanVal
    }
  });
};
