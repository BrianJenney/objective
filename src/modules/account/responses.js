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
        store.dispatch(receivedPatchAccountSuccess(data));
      } else {
        store.dispatch(receivedPatchAccountFailure(data));
      }
      break;
    case 'account.request.changePassword':
      if (status === 'success') {
        store.dispatch(receivedChangePasswordSuccess(data));
      } else {
        store.dispatch(receivedChangePasswordFailure(data));
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
