import store from '../../store';
import { receivedCreateOrderSuccess, receivedCreateOrderFailure, receivedGetOrder } from './actions';
import { receivedFindOrdersByAccount } from '../account/actions';
import { requestCreateCart, requestRemoveCartById } from '../cart/actions';
import { debugRabbitResponse } from '../../utils/misc';

const localStorageClient = require('store');

export const handleOrderResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'order.request.createorder':
      debugRabbitResponse('Order Create Response', status, data, fields, properties);
      // status handling
      if (status === 'success') {
        // clear cart on success
        store.dispatch(receivedCreateOrderSuccess(data));
        store.dispatch(requestRemoveCartById(data.cartId));
        store.dispatch(requestCreateCart());

        // ImpactRadius, Segment
        // Remove clickId/timer on success order
        if (properties.clickId) {
          localStorageClient.remove('clickId');
          localStorageClient.remove('clickIdSetupTime');
        }
      } else {
        store.dispatch(receivedCreateOrderFailure(data));
      }
      break;
    case 'order.request.cancelorder':
      debugRabbitResponse('Order Cancel Response', status, data, fields, properties);
      store.dispatch(receivedGetOrder(data));
      break;
    case 'order.request.find':
      debugRabbitResponse('Find Order by Account Response', status, data, fields, properties);
      // This is in the *account* module, so state updates are made in that reducer.
      store.dispatch(receivedFindOrdersByAccount(data.data));
      break;
    case 'order.request.get':
      debugRabbitResponse('Get Order Response', status, data, fields, properties);
      // This is in the *account* module, so state updates are made in that reducer.
      store.dispatch(receivedGetOrder(data));
      break;
    default:
      console.log('bad response ' + fields.routingKey);
  }
};