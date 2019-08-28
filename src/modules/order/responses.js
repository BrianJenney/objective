import store from '../../store';
import { receivedCreateOrder, receivedFindOrdersByAccount } from './actions';
import { requestCreateCart } from '../cart/actions';

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
      store.dispatch(receivedCreateOrder(data));

      // status handling
      switch (status) {
        case 'success':
          // clear cart on success
          store.dispatch(requestCreateCart());
          break;
        default:
          console.log('unknown status ' + status);
      }
      break;
    case 'order.request.find':
      console.log(
        '****************** Order Create Response ******************'
      );
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedFindOrdersByAccount(data));
      break;
    default:
      console.log('bad response ' + fields.routingKey);
  }
};
