import store from '../../store';
import { receivedFetchStorefront } from './actions';

export const handleStorefrontResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
  case 'store.request.find':
    console.log('****************** Response ******************');
    console.log(status);
    console.log(data);
    console.log(fields);
    console.log(properties);
    store.dispatch(receivedFetchStorefront(data.data[0]));
    break;
  default:
    console.log('bad response');
  }
};