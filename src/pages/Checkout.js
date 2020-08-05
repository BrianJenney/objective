import { compose } from 'redux';
import { connect } from 'react-redux';
import Checkout from '../components/checkout';
import {
  requestCreateAccount,
  clearCreateAccountError,
  requestLogin,
  requestFetchAccount,
  receivedFetchAccountSuccess,
  clearLoginError,
  requestPatchAccount,
  clearPatchAccountError
} from '../modules/account/actions';
import { emitOrderSubmitted } from '../modules/order/event-actions';
import { withCart } from '../hoc';

const mapDispatchToProps = {
  requestCreateAccount,
  clearCreateAccountError,
  requestLogin,
  requestFetchAccount,
  receivedFetchAccountSuccess,
  clearLoginError,
  requestPatchAccount,
  clearPatchAccountError,
  emitOrderSubmitted
};

const enhance = compose(connect(null, mapDispatchToProps), withCart);

export default enhance(Checkout);
