import { compose } from 'redux';
import { connect } from 'react-redux';
import Checkout from '../components/checkout';
import {
  requestCreateAccount,
  clearCreateAccountError,
  requestLogin,
  clearLoginError,
  requestPatchAccount,
  clearPatchAccountError
} from '../modules/account/actions';
import { requestCreateOrder } from '../modules/order/actions';
import { withCart } from '../hoc';

const mapDispatchToProps = {
  requestCreateAccount,
  clearCreateAccountError,
  requestLogin,
  clearLoginError,
  requestPatchAccount,
  clearPatchAccountError,
  requestCreateOrder
};

const enhance = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withCart
);

export default enhance(Checkout);
