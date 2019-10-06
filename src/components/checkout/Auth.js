import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

import { Loader } from '../common';
import Login from '../Login';
import SignupCheckout from '../SignUpCheckout';

const AUTH_MODES = {
  SIGNUP: 'signup',
  LOGIN: 'login'
};

const CheckoutAuth = ({
  currentUser,
  requestCreateAccount,
  clearCreateAccountError,
  requestLogin,
  clearLoginError,
  handleNext
}) => {
  const [authMode, setAuthMode] = useState(AUTH_MODES.SIGNUP);
  const { account_jwt } = currentUser.data;
  const moveToNextStep = () => {
    if (account_jwt) {
      // @TODO - This is where we should be setting email on the order document; if things were done properly
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
        <SignupCheckout
          requestCreateAccount={requestCreateAccount}
          clearCreateAccountError={clearCreateAccountError}
          switchToLogin={() => setAuthMode(AUTH_MODES.LOGIN)}
        />
      ) : (
        <Login
          requestLogin={requestLogin}
          clearLoginError={clearLoginError}
          switchToSignup={() => setAuthMode(AUTH_MODES.SIGNUP)}
        />
      )}
    </Box>
  );
};

CheckoutAuth.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestCreateAccount: PropTypes.func.isRequired,
  clearCreateAccountError: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
  clearLoginError: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};

export default CheckoutAuth;
