/* eslint-disable no-console */
import store from '../../store';
import { receivedPage, receivedPrivacy, pageError } from './actions';
import { debugRabbitResponse } from '../../utils/misc';

export const handlePageResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'content.request.contentful':
      debugRabbitResponse('Contentful Response', status, data, fields, properties);
      // status handling
      if (status === 'success') {
        if (Object.keys(data).length) {
          store.dispatch(receivedPage(data));
        } else {
          // Empty page will throw 404
          const err = { error: 'No page data' };
          store.dispatch(pageError(err));
        }
      } else {
        console.log('THIS FAILED');
      }
      break;
    case 'content.request.privacy':
      debugRabbitResponse('Privacy Response', status, data, fields, properties);
      // status handling
      if (status === 'success') {
        store.dispatch(receivedPrivacy(data));
      } else {
        console.log('THIS FAILED');
      }
      break;
    default:
      console.log(`bad response ${fields.routingKey}`);
  }
};
