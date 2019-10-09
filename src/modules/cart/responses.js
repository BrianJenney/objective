import store from '../../store';
import { receivedCreateCart, receivedFetchCart, receivedPatchCart, receivedUpdateCart, setCartDrawerOpened } from './actions';

export const handleCartResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'cart.request.create':
      console.log('****************** Cart Create Response ******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedCreateCart(data));
      break;
    case 'cart.request.find':
      console.log('****************** Cart Fetch Response ******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedFetchCart(data.data[0]));
      break;
    case 'cart.request.addtocart':
    case 'cart.request.removefromcart':
    case 'cart.request.updatequantity':
    case 'cart.request.mergecarts':
    case 'cart.request.addcoupon':
    case 'cart.request.removecoupon':
    case 'cart.request.setshippingaddress':
    case 'cart.request.patch':
      console.log('****************** Cart Patch Response ******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      

      store.dispatch(receivedPatchCart(data));
      const cartDrawerOpened = store.getState().cart.cartDrawerOpened;
      if (fields.routingKey !== 'cart.request.patch') {
        store.dispatch(setCartDrawerOpened(true));
        if(!cartDrawerOpened){
        window.analytics.track("Cart Viewed", {
          "cart_id": data._id,
          "num_products": data.items.reduce((acc, item) => acc + item.quantity, 0),
          "products": data.items
        });
      }

        if(fields.routingKey==="cart.request.addtocart"){
          window.analytics.track("Product Added", {
            "cart_id": data._id,
            ...data.items[data.items.length - 1]

          });
        }

      }
      break;
    case 'cart.request.update':
      console.log('****************** Cart Update Response ******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedUpdateCart(data));
      break;
    default:
      console.log('bad response ' + fields.routingKey);
  }
};