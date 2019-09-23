import store from '../../store';
import { receivedFetchStorefront } from '../storefront/actions';
import { receivedFetchAccount } from '../account/actions';
import { receivedFetchCatalog } from '../catalog/actions';
import { receivedFetchCart } from '../cart/actions';

const localStorageClient = require('store');

export const handleBootstrapResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
  case 'bootstrap-orchestration.request.get':
    store.dispatch(receivedFetchStorefront(data.store));
    store.dispatch(receivedFetchCatalog(data.catalog.products));
    store.dispatch(receivedFetchCart(data.cart));
    store.dispatch(receivedFetchAccount(data.account));
    localStorageClient.set('cartId', data.cart._id);
    break;
  default:
    console.log('bad response');
  }
};
