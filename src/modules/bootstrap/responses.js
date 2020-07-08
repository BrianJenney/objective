import store from '../../store';
import { receivedFetchStorefront } from '../storefront/actions';
import { receivedFetchAccountSuccess } from '../account/actions';
import { receivedFetchCatalog } from '../catalog/actions';
import { receivedFetchCart } from '../cart/actions';
import { debugRabbitResponse } from '../../utils/misc';

const localStorageClient = require('store');

export const handleBootstrapResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'bootstrap-orchestration.request.get':
      debugRabbitResponse('Bootstrap Response', status, data, fields, properties);
      store.dispatch(receivedFetchStorefront(data.store));
      store.dispatch(receivedFetchCatalog(data.catalog));
      store.dispatch(receivedFetchAccountSuccess(data.account));
      if (data.cart) {
        store.dispatch(receivedFetchCart(data.cart));
        localStorageClient.set('cartId', data.cart._id);
      }
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('bad response');
  }
};
