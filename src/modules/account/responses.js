import store from '../../store';
import {
  receivedCreateAccount,
  receivedFetchAccount,
  receivedLoginFailure,
  receivedLoginSuccess,
  receivedPatchAccount,
  requestLoginAttempt
} from './actions';

export const handleAccountResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'account.request.create':
      console.log('****************** Account Response ******************');
      console.log(status);
      console.log(data);
      console.log(data.data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedCreateAccount(data));
      break;
    case 'account.request.find':
      console.log('****************** Account Response ******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedFetchAccount(data.data[0]));
      break;
    case 'account.request.patch':
        '****************** Account Patch Response ******************'
      );
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedPatchAccount(data));
      break;
    case 'account.request.login':
      console.log('****************** Account Response ******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      if (status === 'success') {
        store.dispatch(receivedLoginSuccess(data));
      } else {
        store.dispatch(receivedLoginFailure(data));
      }
      break;
    default:
      console.log('bad response');
  }
};
