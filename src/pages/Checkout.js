import { compose } from 'redux';
import { connect } from 'react-redux';
import Checkout from '../components/checkout';
import {
  requestCreateAccount,
  requestLogin,
  requestPatchAccount
} from '../modules/account/actions';
import { requestCreateOrder } from '../modules/order/actions';
import { withCart } from '../hoc';

const mapDispatchToProps = {
  requestCreateAccount,
  requestLogin,
  requestPatchAccount,
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
