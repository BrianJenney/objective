import {
  requestAddToCart,
  requestRemoveFromCart,
  requestUpdateQuantity,
  requestAddCoupon,
  requestRemoveCoupon,
  requestSetShippingAddress
} from '../../modules/cart/actions';

import store from '../../store';

export const addToCart = (cart, selectedVariant, quantity) => {
  store.dispatch(requestAddToCart(cart, selectedVariant, quantity));
};

export const adjustQty = (cart, product, amount) => {
  store.dispatch(requestUpdateQuantity(cart, product, amount));
};

export const removeFromCart = (cart, product) => {
  store.dispatch(requestRemoveFromCart(cart, product));
};

export const addCoupon = (cartId, promoCode) => {
  store.dispatch(requestAddCoupon(cartId, promoCode));
};

export const removeCoupon = cartId => {
  store.dispatch(requestRemoveCoupon(cartId));
};

export const setShippingAddress = (cartId, address) => {
  store.dispatch(requestSetShippingAddress(cartId, address));
};