import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withDialog } from '../hoc';
import Login from '../components/Login';
import { requestLogin, clearLoginError } from '../modules/account/actions';

const mapStateToProps = state => ({ account: state.account });
const mapDispatchToProps = { requestLogin, clearLoginError };

const LoginDialog = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withDialog
)(Login);

const LoginPage = props => (
  <LoginDialog onExited={props.history.goBack} {...props} />
);
export default withRouter(LoginPage);

const LoginToOrder = props => (
  <LoginDialog onExited={props.history.goBack} loginTitle="Log in to Track your orders" {...props} />
);
export const LoginToOrderPage = withRouter(LoginToOrder);

const LoginToShipping = props => (
  <LoginDialog onExited={props.history.goBack} loginTitle="Log in to your shipments" {...props} />
);
export const LoginToShippingPage = withRouter(LoginToShipping);

const LoginToAccount = props => (
  <LoginDialog onExited={props.history.goBack} loginTitle="Log in to your account" {...props} />
);
export const LoginToAccountPage = withRouter(LoginToAccount);

const LoginToCheckout = props => (
  <LoginDialog onExited={props.history.goBack} loginTitle="Log in to checkout" {...props} />
);
export const LoginToCheckoutPage = withRouter(LoginToCheckout);

