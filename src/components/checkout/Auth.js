import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Loader } from '../common';
import Login from '../Login';
import Signup from '../Signup';

const AUTH_MODES = {
  SIGNUP: 'signup',
  LOGIN: 'login'
};

const CheckoutAuth = ({
  currentUser,
  requestCreateAccount,
  requestLoginAttempt,
  handleNext
}) => {
  const [authMode, setAuthMode] = useState(AUTH_MODES.SIGNUP);
  const { account_jwt } = currentUser.data;
  const moveToNextStep = () => {
    if (account_jwt) {
      handleNext();
    }
  };
  useEffect(() => {
    moveToNextStep();
  }, []);
  useEffect(() => {
    moveToNextStep();
  }, [currentUser.data.account_jwt]);

  if (account_jwt) {
    return <Loader />;
  }

  return (
    <Box>
      {authMode === AUTH_MODES.SIGNUP ? (
        <Signup
          requestCreateAccount={requestCreateAccount}
          switchToLogin={() => setAuthMode(AUTH_MODES.LOGIN)}
        />
      ) : (
        <Login
          requestLoginAttempt={requestLoginAttempt}
          switchToSignup={() => setAuthMode(AUTH_MODES.SIGNUP)}
        />
      )}
    </Box>
  );
};

CheckoutAuth.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestCreateAccount: PropTypes.func.isRequired,
  requestLoginAttempt: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};

export default CheckoutAuth;
