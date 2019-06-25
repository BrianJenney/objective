import store from '../../store';
import { receivedFetchContent } from './actions';

export const handleContentResponse = (data, fields, properties) => {
  switch (fields.routingKey) {
    case 'content.request.find':
      console.log('****************** Content Response ******************');
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedFetchContent(data.data[0]));
      break;
    default:
      console.log('bad response');
  }
}