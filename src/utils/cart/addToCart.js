import { requestPatchCart } from "../../modules/cart/actions";

export const calculateCartTotal = cartItems => cartItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);

export const addToCart = (cartId, cart, selectedProductVariant, product, quantity, dispatch) => {
  const newItems = cart.items;
  let alreadyInCart = false;
  newItems.filter(item => item.variant_id === selectedProductVariant._id)
    .forEach(item => {
      alreadyInCart = true;
      item.quantity += quantity;
    });
  if (!alreadyInCart) {
    const newItem = {
      product_id: product._id,
      product_name: product.name,
      variant_name: selectedProductVariant.name,
      variant_id: selectedProductVariant._id,
      product_img: product.assets.img_front,
      sku: selectedProductVariant.sku,
      variant_type: selectedProductVariant.attributes[0].name,
      variant_value: selectedProductVariant.attributes[0].value,
      quantity: quantity,
      unit_price: parseFloat(selectedProductVariant.price.$numberDecimal)
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
