import store from '../../store';
import { receivedCreateCart, receivedFetchCart, receivedPatchCart } from './actions';

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
  case 'cart.request.patch':
    console.log('****************** Cart Patch Response ******************');
    console.log(status);
    console.log(data);
    console.log(fields);
    console.log(properties);
    store.dispatch(receivedPatchCart(data));
    break;
  default:
    console.log('bad response ' + fields.routingKey);
  }
};