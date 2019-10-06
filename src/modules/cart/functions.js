import {
  requestPatchCart,
  requestAddToCart,
  requestRemoveFromCart,
  requestUpdateQuantity
} from '../../modules/cart/actions';

import store from '../../store';

export const calculateCartTotals = cart => {
  let subtotal = cart.items.reduce(function (prev, curr) {
    return prev + curr.unit_price * curr.quantity;
  }, 0.0);

  let discount = 0.0;
  let total = subtotal;

  if (cart.promo) {
    if (cart.promo.discount.type === 'AMOUNT') {
      discount = cart.promo.discount.amount_off / 100;
      total = subtotal - discount;
    } else if (cart.promo.discount.type === 'PERCENT') {
      total = cart.items.reduce(function(prev, curr) {
        return prev + curr.discount_price * curr.quantity;
      }, 0.0);
      discount = subtotal - total;
    }
  }

  let tax = null;
  if (cart.tax) {
    tax = cart.tax;
    total += tax;
  }
  return {
    discount,
    subtotal,
    tax,
    total
  };
};

export const addToCart = (cart, selectedVariant, quantity) => {
  store.dispatch(requestAddToCart(cart, selectedVariant, quantity));
};

export const adjustQty = (cart, product, amount) => {
  store.dispatch(requestUpdateQuantity(cart, product, amount));
};

export const removeFromCart = (cart, product) => {
  store.dispatch(requestRemoveFromCart(cart, product));
};

export const addCoupon = (cart, promo) => {
  const {
    campaign,
    category,
    code,
    discount,
    expiration_date,
    gift,
    is_referral_code,
    loyalty_card,
    metadata,
    object,
    start_date,
    type
  } = promo;
  const promoCode = {
    campaign,
    category,
    code,
    discount,
    expiration_date,
    gift,
    is_referral_code,
    loyalty_card,
    metadata,
    object,
    start_date,
    type
  };

  let localCart = cart;
  let items = cart.items;

  if (promoCode.discount.type === 'PERCENT') {
    const discount = promoCode.discount.percent_off / 100;

    items.forEach(item => {
      item.discount_price = item.unit_price - item.unit_price * discount;
    });

    localCart.items = items;
  }

  localCart.promo = promoCode;

  let totals = calculateCartTotals(localCart);

  const patches = {
    promo: promoCode,
    ...totals
  };

  store.dispatch(requestPatchCart(cart._id, patches));
};

export const removeCoupon = cart => {
  let localCart = cart;
  let items = cart.items;

  items.forEach(item => {
    item.discount_price = item.unit_price;
  });

  delete localCart.promo;

  let totals = calculateCartTotals(localCart);

  const patches = {
    promo: null,
    ...totals
  };

  store.dispatch(requestPatchCart(cart._id, patches));
};
