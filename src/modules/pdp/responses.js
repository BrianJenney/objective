import store from '../../store';
import { receivedFetchProductVariants } from './actions';

export const handleProductVariantResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'variant.request.find':
      console.log('****************** Response ******************');
      // console.log(data);
      // console.log(fields);
      // console.log(properties);
      store.dispatch(receivedFetchProductVariants(data.data));
      break;
    default:
      console.log('bad response');
  }
}