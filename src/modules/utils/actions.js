import { SET_CART_NOTIFICATION } from './types';

export const setCartNotification = booleanVal => dispatch => {
  dispatch({
    type: SET_CART_NOTIFICATION,
    payload: booleanVal
  });
};
