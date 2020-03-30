import { SET_CART_NOTIFICATION, SET_LP_PROD_ADDED, SET_LP_COUPON_ADDED } from './types';

const INITIAL_STATE = {
  cartNotification: false,
  notificationVariant: null,
  lpProdAdded: false,
  lpCouponAdded: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CART_NOTIFICATION:
      return { ...state, ...action.payload };
    case SET_LP_PROD_ADDED:
      return { ...state, ...action.payload };
    case SET_LP_COUPON_ADDED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
