import store from '../../store';
import {
  receivedCreateAccount,
  receivedFetchAccount,
  receivedLoginFailure,
  receivedLoginSuccess,
  receivedPatchAccount,
  receivedPatchFailure,
} from './actions';

export const handleAccountResponse = (status, data, fields) => {
  switch (fields.routingKey) {
    case 'account.request.create':
      store.dispatch(receivedCreateAccount(data));

      console.log("account request create data", data);
      console.log('status', status);
      break;
    case 'account.request.get':
      store.dispatch(receivedFetchAccount(data));
      break;
    case 'account.request.patch':

      console.log("account request patch data", data);
      console.log('status', status);

      if (status === 'success') {
        store.dispatch(receivedPatchAccount(data));
      } else if (status === 'duplicate-email-error') {
        console.log('set email is taken')
        store.dispatch(receivedPatchFailure('Email address is already taken.'));
      } else {
        store.dispatch(
          receivedPatchFailure('Unexpected patch failure. Contact us.')
        );
      }
      break;
    case 'account.request.login':

      console.log("account request patch data", data);
      console.log('status', status);

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
