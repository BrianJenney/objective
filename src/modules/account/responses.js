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

export const handleAccountResponse = (status, data, fields) => {
  switch (fields.routingKey) {
    case 'account.request.create':
      if (status === 'success') {
        store.dispatch(receivedCreateAccountSuccess(data));
      } else {
        store.dispatch(receivedCreateAccountFailure(data));
      }
      break;
    case 'account.request.get':
      if (status === 'success') {
        store.dispatch(receivedFetchAccountSuccess(data));
      } else {
        store.dispatch(receivedFetchAccountFailure(data));
      }
      break;
    case 'account.request.patch':
      if (status === 'success') {
        // temp until ui approve
        setTimeout(() => {
          store.dispatch(receivedPatchAccountSuccess(data));
        }, 1000);
      } else {
        setTimeout(() => {
          store.dispatch(receivedPatchAccountFailure(data));
        }, 1000);
      }
      break;
    case 'account.request.changePassword':
      if (status === 'success') {
        setTimeout(() => {
          store.dispatch(receivedChangePasswordSuccess(data));
        }, 1000);
      } else {
        setTimeout(() => {
          store.dispatch(receivedChangePasswordFailure(data));
        }, 1000);
      }
      break;
    case 'account.request.login':
      if (status === 'success') {
        store.dispatch(receivedLoginSuccess(data.data[0]));
      } else {
        store.dispatch(receivedLoginFailure(data));
      }
      break;
    default:
      break;
  }
};
