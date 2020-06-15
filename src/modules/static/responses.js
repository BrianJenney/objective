import store from '../../store';
import { receivedPage, receivedPrivacy, receivedPromoBanner } from './actions';
import { debugRabbitResponse } from '../../utils/misc';

export const handlePageResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'content.request.contentful':
      debugRabbitResponse('Contentful Response', status, data, fields, properties);
      // status handling
      if (status === 'success') {
        store.dispatch(receivedPage(data));
      } else {
        throw status;
      }
      break;
    case 'content.request.contentfulPromoBanner':
      debugRabbitResponse('Contentful Response', status, data, fields, properties);
      // status handling
      if (status === 'success') {
        store.dispatch(receivedPromoBanner(data));
      }
      break;
    case 'content.request.privacy':
      debugRabbitResponse('Privacy Response', status, data, fields, properties);
      // status handling
      if (status === 'success') {
        store.dispatch(receivedPrivacy(data));
      }
      break;
    default:
      break;
  }
};
