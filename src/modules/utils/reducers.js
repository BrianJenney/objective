import { SET_CART_NOTIFICATION } from './types';

const INITIAL_STATE = {
  cartNotification: false,
  notificationVariant: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CART_NOTIFICATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
