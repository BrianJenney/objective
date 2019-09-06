import { connect } from 'react-redux';
import Login from '../components/Login';
import { requestLoginAttempt } from '../modules/account/actions';

const mapDispatchToProps = { requestLoginAttempt };

export default connect(
  null,
  mapDispatchToProps
)(Login);
