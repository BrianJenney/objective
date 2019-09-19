import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withDialog } from '../hoc';
import Login from '../components/Login';
import { requestLoginAttempt } from '../modules/account/actions';

const mapStateToProps = state => ({ account: state.account });
const mapDispatchToProps = { requestLoginAttempt };

const LoginDialog = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withDialog
)(Login);

const LoginPage = (props) => <LoginDialog onExited={props.history.goBack} {...props} />;

export default withRouter(LoginPage);
