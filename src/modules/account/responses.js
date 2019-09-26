import store from '../../store';
import {
  receivedCreateAccount,
  receivedFetchAccount,
  receivedLoginFailure,
  receivedLoginSuccess,
  receivedPatchAccount,
  receivedPatchAccountFailure
} from './actions';

export const handleAccountResponse = (status, data, fields) => {
  switch (fields.routingKey) {
    case 'account.request.create':
      store.dispatch(receivedCreateAccount(data));
      break;
    case 'account.request.get':
      store.dispatch(receivedFetchAccount(data));
      break;
    case 'account.request.patch':
      if (status === 'success') {
        store.dispatch(receivedPatchAccount(data));
      } else {
        store.dispatch(receivedPatchAccountFailure(data));
      }
      break;
    case 'account.request.login':
      if (status === 'success') {
        store.dispatch(receivedLoginSuccess(data.data[0]));
      } else {
        store.dispatch(
          receivedLoginFailure(
            'Password or username is not valid. Please check your spelling and try again.'
          )
        );
      }
      break;
    default:
      break;
  }
};
