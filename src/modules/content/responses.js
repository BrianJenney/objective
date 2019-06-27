import store from '../../store';
import { receivedFetchContent } from './actions';

export const handleContentResponse = (data, fields, properties) => {
  switch (fields.routingKey) {
    case 'content.request.find':
      console.log('****************** Content Response ******************');
      console.log(data);
      console.log(fields);
      console.log(properties);
      let content = null;

      if (data.data.length > 0) {
        content = data.data[0];
      } else {
        content = {
          'content': '404'
        };
      }

      store.dispatch(receivedFetchContent(content));
      break;
    default:
      console.log('bad response');
  }
}