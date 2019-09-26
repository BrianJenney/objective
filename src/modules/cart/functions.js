import { requestPatchCart } from '../../modules/cart/actions';

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

  let calculatedTax = null;
  if (cart.calculatedTax) {
    calculatedTax = cart.calculatedTax;
    total += calculatedTax;
  }
  return {
    discount,
    subtotal,
    calculatedTax,
    total
  };
};

export const addToCart = (cartId, cart, selectedVariant, quantity) => {
  let localCart = cart;
  let newItems = cart.items;
  let alreadyInCart = false;
console.log(selectedVariant);
  newItems
    .filter(item => item.sku === selectedVariant.sku)
    .forEach(item => {
      alreadyInCart = true;
      item.quantity += quantity;
    });

  if (!alreadyInCart) {
    const newItem = {
      variant_name: selectedVariant.name,
      variant_id: selectedVariant.id,
      variant_img: selectedVariant.assets.imgs,
      sku: selectedVariant.sku,
      variantInfo: selectedVariant.variantInfo,
      attributes: selectedVariant.attributes,
      quantity: quantity,
      unit_price: parseFloat(selectedVariant.effectivePrice),
      discount_price: parseFloat(selectedVariant.effectivePrice),
      varSlug: selectedVariant.slug,
      prodSlug: selectedVariant.prodSlug
    };
    newItems.push(newItem);
  }

  localCart.items = newItems;

  let totals = calculateCartTotals(localCart);

  const patches = {
    items: newItems,
    ...totals
  };

  store.dispatch(requestPatchCart(cartId, patches));
};

export const adjustQty = (cart, product, amount) => {
  let localCart = cart;
  let newItems = cart.items;

  newItems[product].quantity += amount;

  localCart.items = newItems;

  let totals = calculateCartTotals(localCart);

  const patches = {
    items: newItems,
    ...totals
  };

  store.dispatch(requestPatchCart(cart._id, patches));
};

export const removeFromCart = (cart, product) => {
  let localCart = cart;
  let newItems = [...cart.items];

  newItems.splice(product, 1);

  localCart.items = newItems;

  let totals = calculateCartTotals(localCart);

  const patches = {
    items: newItems,
    ...totals
  };

  store.dispatch(requestPatchCart(cart._id, patches));
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
