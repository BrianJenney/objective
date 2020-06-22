import store from '../../store';
import {
  receivedCreateCart,
  receivedFetchCart,
  receivedPatchCart,
  receivedRemoveCart,
  receivedUpdateCart,
  setCartDrawerOpened,
  segmentAddCouponReceived,
  segmentRemoveCouponReceived
} from './actions';
import { setCartNotification } from '../utils/actions';
import { debugRabbitResponse } from '../../utils/misc';

export const handleCartResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'cart.request.create':
      debugRabbitResponse('Cart Create Response', status, data, fields, properties);
      store.dispatch(receivedCreateCart(data));
      break;
    case 'cart.request.find':
      debugRabbitResponse('Cart Fetch Response', status, data, fields, properties);
      store.dispatch(receivedFetchCart(data.data[0]));
      break;
    case 'cart.request.addtocart':
    case 'cart.request.removefromcart':
    case 'cart.request.updatequantity':
    case 'cart.request.mergecarts':
    case 'cart.request.addcoupon':
    case 'cart.request.removecoupon':
    case 'cart.request.setshippingaddress':
    case 'cart.request.patch': {
      debugRabbitResponse(
        `Cart Patch Response (${fields.routingKey})`,
        status,
        data,
        fields,
        properties
      );
      const oldCart = store.getState().cart;

      // eslint-disable-next-line no-case-declarations
      let openCartDrawer = true;

      // eslint-disable-next-line no-prototype-builtins
      if (!data.hasOwnProperty('items')) {
        // Something went wrong on backend.
        break;
      }

      if (oldCart.items.length === data.items.length && oldCart.total === data.total) {
        openCartDrawer = false;
      }

      // Merge carts notification logic
      if (
        fields.routingKey === 'cart.request.mergecarts' &&
        data.items.length !== oldCart.items.length
      ) {
        openCartDrawer = false;
        store.dispatch(setCartNotification(true, 'cartMerged'));
      }

      store.dispatch(receivedPatchCart(data));

      if (fields.routingKey === 'cart.request.addcoupon') {
        segmentAddCouponReceived(data);
        openCartDrawer = false;
      }

      if (fields.routingKey === 'cart.request.removecoupon') {
        segmentRemoveCouponReceived(data);
        openCartDrawer = false;
      }

      if (
        fields.routingKey !== 'cart.request.patch' &&
        fields.routingKey !== 'cart.request.setshippingaddress' &&
        openCartDrawer
      ) {
        store.dispatch(setCartDrawerOpened(true));
      }
      break;
    }
    case 'cart.request.update':
      debugRabbitResponse('Cart Update Response', status, data, fields, properties);
      store.dispatch(receivedUpdateCart(data));
      break;
    case 'cart.request.remove':
      debugRabbitResponse('Cart Remove Response', status, data, fields, properties);
      store.dispatch(receivedRemoveCart(data));
      break;
    default:
      // eslint-disable-next-line no-console
      console.log(`bad response ${fields.routingKey}`);
  }
};
