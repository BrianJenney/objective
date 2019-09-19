import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withDialog } from '../hoc';
import Signup from '../components/Signup';
import { requestCreateAccount } from '../modules/account/actions';

const mapDispatchToProps = { requestCreateAccount };

const SignupDialog = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withDialog
)(Signup);

const SignupPage = (props) => <SignupDialog onExited={props.history.goBack} {...props} />;

export default withRouter(SignupPage);
