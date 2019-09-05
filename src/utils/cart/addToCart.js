import { requestPatchCart } from "../../modules/cart/actions";

export const calculateCartTotal = cartItems => cartItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);

export const addToCart = (cartId, cart, selectedVariant, quantity, dispatch, isFromGallery=false) => {
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
      unit_price: parseFloat(selectedVariant.effectivePrice)
    };
    newItems.push(newItem);
  }
  const patches = {
    items: newItems,
    subtotal: calculateCartTotal(newItems),
    total: calculateCartTotal(newItems)
  };
  dispatch(requestPatchCart(cartId, patches));
};
