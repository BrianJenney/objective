import store from '../../store';
import { receivedFetchProducts } from './actions';

export const handleProductResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'product.request.find':
      console.log('****************** Response Product******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedFetchProducts(data.data));
      break;
    default:
      console.log('bad response');
  }
}