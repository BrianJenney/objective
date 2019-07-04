import store from '../../store';
import { receivedFetchAccount } from './actions';

export const handleAccountResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'account.request.find':
      console.log('****************** Account Response ******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedFetchAccount(data.data[0]));
      break;
    default:
      console.log('bad response');
  }
}