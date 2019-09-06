import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
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
  useEffect(() => {
    if (currentUser.account_jwt) {
      handleNext();
    }
  }, [currentUser]);

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
