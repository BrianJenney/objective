import store from '../../store';
import { receivedFetchCatalog } from './actions';

export const handleCatalogResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'catalog.request.get':
      console.log('****************** Catalog Response ******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedFetchCatalog(data.products));
      break;
    default:
      console.log('bad response');
  }
};
