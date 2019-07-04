import store from '../../store';
import { receivedFetchProduct, receivedFetchProducts, receivedFetchProductVariants } from './actions';

export const handleProductResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'product.request.find':
      store.dispatch(receivedFetchProducts(data.data));
      break;
    case 'product.request.get':
      store.dispatch(receivedFetchProduct(data));
      break;
    case 'variant.request.find':
      store.dispatch(receivedFetchProductVariants(data.data));
      break;
    default:
      console.log('bad response');
  }
}