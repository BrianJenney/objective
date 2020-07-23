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
  receivedChangePasswordFailure,
  receivedPasswordResetSuccess,
  receivedPasswordResetFailure,
  receivedCheckEmailExistence
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
    case 'fe.account.fetched':
      debugRabbitResponse('Account Order Placed Response', status, data, fields, properties);
      if (status === 'success') {
        store.dispatch(receivedFetchAccountSuccess(data));
        if (data.passwordSet) store.dispatch(receivedLoginSuccess(data, data.account_jwt));
      } else {
        store.dispatch(receivedFetchAccountFailure(data));
      }
      break;
    case 'account.request.get':
    case 'account.request.find':
      debugRabbitResponse('Account Get Response', status, data, fields, properties);
      if (status === 'success') {
        if (fields.routingKey === 'account.request.get') {
          store.dispatch(receivedFetchAccountSuccess(data));
        } else {
          store.dispatch(
            receivedFetchAccountSuccess(data.data && data.data[0] ? data.data[0] : {})
          );
        }
      } else {
        store.dispatch(receivedFetchAccountFailure(data));
      }
      break;
    case 'account.request.patch':
      debugRabbitResponse('Account Patch Response', status, data, fields, properties);
      if (status === 'success') {
        store.dispatch(receivedPatchAccountSuccess(data));
      } else {
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
    case 'account.request.resetpassword':
      debugRabbitResponse('Account Reset Password Response', status, data, fields, properties);
      if (status === 'success') {
        store.dispatch(receivedPasswordResetSuccess(data));
      } else {
        store.dispatch(receivedPasswordResetFailure(data));
      }
      break;
    case 'account.request.checkEmailExistence':
      debugRabbitResponse('Check Email Existence Response', status, data, fields, properties);
      if (status === 'success') {
        store.dispatch(receivedCheckEmailExistence(data));
      }
      break;
    default:
      break;
  }
};
