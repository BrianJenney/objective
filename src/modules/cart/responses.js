import store from '../../store';
import {
  receivedCreateCart,
  receivedFetchCart,
  receivedPatchCart,
  receivedUpdateCart,
  setCartDrawerOpened,
  segmentAddCouponReceived,
  segmentRemoveCouponReceived
} from './actions';
import { debugRabbitResponse } from '../../utils/misc';

export const handleCartResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'cart.request.create':
      debugRabbitResponse(
        'Cart Create Response',
        status,
        data,
        fields,
        properties
      );
      store.dispatch(receivedCreateCart(data));
      break;
    case 'cart.request.find':
      debugRabbitResponse(
        'Cart Fetch Response',
        status,
        data,
        fields,
        properties
      );
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
      debugRabbitResponse(
        'Cart Patch Response (' + fields.routingKey + ')',
        status,
        data,
        fields,
        properties
      );
      let oldCart = store.getState().cart;
      let openCartDrawer = true;

      if (
        oldCart.items.length === data.items.length &&
        oldCart.total === data.total
      ) {
        openCartDrawer = false;
      }

      // Merge carts notification logic
      if (
        fields.routingKey === 'cart.request.mergecarts' &&
        data.items.length !== oldCart.items.length
      ) {
        openCartDrawer = false;
        data.cartMerged = true;
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
        store.dispatch(setCartDrawerOpened(true, false));
      }
      break;
    case 'cart.request.update':
      debugRabbitResponse(
        'Cart Update Response',
        status,
        data,
        fields,
        properties
      );
      store.dispatch(receivedUpdateCart(data));
      break;
    default:
      console.log('bad response ' + fields.routingKey);
  }
};
