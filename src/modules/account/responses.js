import store from '../../store';
import {
  receivedCreateAccountSuccess,
  receivedCreateAccountFailure,
  receivedFetchAccountSuccess,
  receivedFetchAccountFailure,
  receivedLoginSuccess,
  receivedLoginFailure,
  receivedPatchAccountSuccess,
  receivedPatchAccountFailure,
  receivedChangePasswordSuccess,
  receivedChangePasswordFailure
} from './actions';
import { debugRabbitResponse } from '../../utils/misc';

export const handleAccountResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'account.request.register':
      debugRabbitResponse('Account Create Response', status, data, fields, properties);
      if (status === 'success') {
        store.dispatch(receivedCreateAccountSuccess(data.account, data.token));
      } else {
        store.dispatch(receivedCreateAccountFailure(data));
      }
      break;
    case 'account.request.get':
      debugRabbitResponse('Account Get Response', status, data, fields, properties);
      if (status === 'success') {
        store.dispatch(receivedFetchAccountSuccess(data));
      } else {
        store.dispatch(receivedFetchAccountFailure(data));
      }
      break;
    case 'account.request.patch':
      debugRabbitResponse('Account Patch Response', status, data, fields, properties);
      if (status === 'success') {
        store.dispatch(receivedPatchAccountSuccess(data));
      } else {
        if (data && data.length > 0) {
          switch (data[0].message.toLowerCase()) {
            case 'processor declined':
              data[0].message = 'CVV number is incorrect';
              break;
            case 'do not honor':
              data[0].message = 'Credit card number is incorrect';
              break;
            default:
              break;
          }
        }
        store.dispatch(receivedPatchAccountFailure(data));
      }
      break;
    case 'account.request.changePassword':
      debugRabbitResponse('Account Change Password Response', status, data, fields, properties);
      if (status === 'success') {
        store.dispatch(receivedChangePasswordSuccess(data));
      } else {
        store.dispatch(receivedChangePasswordFailure(data));
      }
      break;
    case 'account.request.login':
      debugRabbitResponse('Account Login Response', status, data, fields, properties);
      if (status === 'success') {
        store.dispatch(receivedLoginSuccess(data.account.data[0], data.token));
      } else {
        store.dispatch(receivedLoginFailure(data));
      }
      break;
    default:
      break;
  }
};
