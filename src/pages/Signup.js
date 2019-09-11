import { connect } from 'react-redux';
import { compose } from 'redux';
import { withDialog } from '../hoc';
import Signup from '../components/Signup';
import { requestCreateAccount } from '../modules/account/actions';

const mapDispatchToProps = { requestCreateAccount };

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withDialog
)(Signup);
