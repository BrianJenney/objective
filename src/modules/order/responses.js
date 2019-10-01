import store from '../../store';
import { 
  receivedCreateOrderSuccess,
  receivedCreateOrderFailure,
  receivedGetOrder, 
  receivedTransactionRequestRefund 
} from './actions';
import { receivedFindOrdersByAccount } from '../account/actions';
import { requestCreateCart, requestRemoveCartById } from '../cart/actions';

export const handleOrderResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'order.request.create':
      console.log(
        '****************** Order Create Response ******************'
      );
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);

      // status handling
      if (status == 'success') {
        // clear cart on success
        store.dispatch(receivedCreateOrderSuccess(data));
        store.dispatch(requestRemoveCartById(data.cartId));
        store.dispatch(requestCreateCart());
      } else {
        store.dispatch(receivedCreateOrderFailure(data));
      }
    break;
    case 'order.request.find':
      console.log(
        '****************** Order Find By Account Response ******************'
      );
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      // This is in the *account* module, so state updates are made in that reducer.
      store.dispatch(receivedFindOrdersByAccount(data.data));
      break;
    case 'order.request.get':
      console.log('****************** Order Get Response ******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      // This is in the *account* module, so state updates are made in that reducer.
      store.dispatch(receivedGetOrder(data));
      break;
    case 'transaction.request.refund':
        console.log('***** Transaction Request refund');
        console.log(status);
        console.log(data);
        console.log(fields);
        console.log(properties);
        store.dispatch(receivedTransactionRequestRefund(data));

      break;
    default:
      console.log('bad response ' + fields.routingKey);
  }
};
