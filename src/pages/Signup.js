import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { requestCreateAccount } from '../modules/account/actions';

const mapDispatchToProps = { requestCreateAccount };

export default connect(
  null,
  mapDispatchToProps
)(Signup);
