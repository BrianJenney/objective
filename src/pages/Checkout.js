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

const CheckoutContainer = props => {
  const { currentUser, orderError } = props;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (currentUser.error) {
      const errors = Array.isArray(currentUser.error)
        ? currentUser.error
        : [currentUser.error];
      const errorMessage = errors
        .map(
          err =>
            err.message || err.errorMessage || currentUser.data.errorMessage
        )
        .join('\n');
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        autoHideDuration: 10000
      });
    }
  }, [currentUser.error]);

  return <Checkout {...props } />;
};

CheckoutContainer.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestCreateAccount: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  requestCreateOrder: PropTypes.func.isRequired
};

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
