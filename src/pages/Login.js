import { compose } from 'redux';
import { connect } from 'react-redux';
import { withDialog } from '../hoc';
import Login from '../components/Login';
import { requestLoginAttempt } from '../modules/account/actions';

const mapStateToProps = state => ({ account: state.account });
const mapDispatchToProps = { requestLoginAttempt };

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withDialog
)(Login);
