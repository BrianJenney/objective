import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../components/Login';
import { requestLoginAttempt } from '../modules/account/actions';
import { statement } from '@babel/template';

const mapDispatchToProps = { requestLoginAttempt };

Login.propTypes = {
  account: PropTypes.object
};

const mapStateToProps = state => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
