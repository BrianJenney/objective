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
      console.log(
        '****************** Account Create Response ******************'
      );
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedCreateAccount(data));
      break;
    case 'account.request.get':
      console.log(
        '****************** Account Get Response ******************'
      );
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedFetchAccount(data));
      break;
    case 'account.request.patch':
      console.log(
        '****************** Account Patch Response ******************'
      );
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch(receivedPatchAccount(data));
      break;
    case 'account.request.login':
      console.log(
        '****************** Account Login Response ******************'
      );
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      if (status === 'success') {
        store.dispatch(receivedLoginSuccess(data.data[0]));
      } else {
        store.dispatch(receivedLoginFailure());
      }
      break;
    default:
      console.log('bad response');
  }
};
