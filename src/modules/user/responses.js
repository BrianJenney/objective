import store from '../../store';
import { receivedFetchUsers } from './actions';

export const handleUsersResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'account.request.find':
      console.log('****************** Account Response ******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedFetchUsers(data.data[0]));
      break;
    default:
      console.log('bad response');
  }
}