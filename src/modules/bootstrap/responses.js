import store from '../../store';
import { receivedFetchStorefront } from '../storefront/actions';
import { receivedFetchAccountSuccess } from '../account/actions';
import { receivedFetchCatalog } from '../catalog/actions';
import { receivedFetchCart } from '../cart/actions';
import { get } from 'lodash';

const localStorageClient = require('store');

export const handleBootstrapResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'bootstrap-orchestration.request.get':
      store.dispatch(receivedFetchStorefront(data.store));
      store.dispatch(receivedFetchCatalog(data.catalog.products));
      store.dispatch(receivedFetchCart(data.cart));
      store.dispatch(receivedFetchAccountSuccess(data.account));
      localStorageClient.set('cartId', get(data, 'cart._id', ''));
      break;
    default:
      console.log('bad response');
  }
};
