import { requestPatchCart } from "../../modules/cart/actions";

import store from '../../store';

export function calculateCartTotal(c) {
  const total = c.reduce(function (prev, curr) {
    return prev + curr.unit_price * curr.quantity;
  }, 0);

  return total;
}

export const addToCart = (cartId, cart, selectedVariant, quantity) => {
  const newItems = cart.items;
  // console.log('add to cart', newItems, selectedVariant)
  let alreadyInCart = false;
  newItems.filter(item => item.sku === selectedVariant.sku)
    .forEach(item => {
      alreadyInCart = true;
      item.quantity += quantity;
    });
  if (!alreadyInCart) {
    const newItem = {
      variant_name: selectedVariant.name,
      variant_id: selectedVariant._id,
      variant_img: selectedVariant.assets.imgs,
      sku: selectedVariant.sku,
      variantInfo: selectedVariant.variantInfo,
      attributes: selectedVariant.attributes,
      quantity: quantity,
      unit_price: parseFloat(selectedVariant.effectivePrice),
      varSlug: selectedVariant.slug,
      prodSlug: selectedVariant.productSlug,
    };
    newItems.push(newItem);
  }
  const patches = {
    items: newItems,
    subtotal: calculateCartTotal(newItems),
    total: calculateCartTotal(newItems)
  };
  store.dispatch(requestPatchCart(cartId, patches));
};

export const adjustQty = (cart, product, amount) => {
  let newitems = cart.items;
  newitems[product].quantity += amount;

  let patches = {
    items: newitems,
    subtotal: calculateCartTotal(newitems),
    total: calculateCartTotal(newitems)
  };

  store.dispatch(requestPatchCart(cart._id, patches));
};

export const removeFromCart = (cart, product) => {
  const newItems = [...cart.items];
  newItems.splice(product, 1);

  const patches = {
    items: newItems,
    subtotal: calculateCartTotal(newItems),
    total: calculateCartTotal(newItems)
  };

  store.dispatch(requestPatchCart(cart._id, patches));
};