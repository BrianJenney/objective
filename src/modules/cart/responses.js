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
    case 'cart.request.patch':
      console.log('****************** Cart Patch Response ******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedPatchCart(data));
      if (fields.routingKey !== 'cart.request.update') {
        console.log('open cart drawer');
        store.dispatch(setCartDrawerOpened(true));
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