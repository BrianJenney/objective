import store from '../../store';
import { receivedCreateOrder } from './actions';

export const handleOrderResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
  case 'order.request.create':
    console.log('****************** Order Create Response ******************');
    console.log(status);
    console.log(data);
    console.log(fields);
    console.log(properties);
    store.dispatch(receivedCreateOrder(data));
    break;
  default:
    console.log('bad response ' + fields.routingKey);
  }
};