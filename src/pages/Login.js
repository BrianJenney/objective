import { connect } from 'react-redux';
import Login from '../components/Login';
import { requestLoginAttempt } from '../modules/account/actions';

const mapStateToProps = state => ({ account: state.account });
const mapDispatchToProps = { requestLoginAttempt };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
