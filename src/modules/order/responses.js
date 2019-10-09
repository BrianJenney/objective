import store from '../../store';
import { receivedCreateOrder, receivedGetOrder, receivedTransactionRequestRefund } from './actions';
import { receivedFindOrdersByAccount } from '../account/actions';
import { requestCreateCart, requestRemoveCartById } from '../cart/actions';
 
export const handleOrderResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'order.request.createorder':
      console.log(
        '****************** Order Create Response ******************'
      );
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      if(status!=="success"){
        window.analytics.track("Order Submitted", {
          "cart_id": localStorage.cartId
        });
        window.analytics.track("Order Failed", {
          "cart_id": localStorage.cartId,
          "error_message": ""
        });
      }
      store.dispatch(receivedCreateOrder(data));
      
      // status handling
      switch (status) {
        case 'success':
          // clear cart on success
          store.dispatch(requestRemoveCartById(data.cartId));
          store.dispatch(requestCreateCart());
          window.analytics.track("Order Submitted", {
            "cart_id": data.cartId,
            "order_id": data._id
          });

          break;
        default:
          console.log('unknown status ' + status);
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
