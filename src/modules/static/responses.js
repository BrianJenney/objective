import store from '../../store';
import { receivedPage } from './actions';
import { debugRabbitResponse } from '../../utils/misc';

const localStorageClient = require('store');

export const handlePageResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'content.request.contentful':
      debugRabbitResponse('Contentful Response', status, data, fields, properties);
      // status handling
      if (status === 'success') {
        store.dispatch(receivedPage(data));
      } else {
        console.log('THIS FAILED');
      }
      break;
    default:
      console.log('bad response ' + fields.routingKey);
  }
};
