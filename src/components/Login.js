import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Typography
} from '@material-ui/core';
import { LoginForm } from './forms';
import { MenuLink, NavLink } from './common';

const Login = ({ requestLoginAttempt, account, switchToSignup }) => {
  let displayMessage;
  if (!account.msg) {
    displayMessage = null;
  } else {
    displayMessage = (
      <Box m={2} align="center" border={(1, '#ffcdd2')} bgcolor="#ffcdd2">
        <Typography variant="body1">{account.msg}</Typography>
      </Box>
    );
  }
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} p={4}>
        <Box component={Typography} variant="h5" my={3} align="center">
          Log in to your account
        </Box>
        {displayMessage}
        <LoginForm onSubmit={requestLoginAttempt} />

        <Box mt={2} align="center">
          <Typography variant="body1">
            <NavLink href="/reset-password" underline="always">
              Forgot your email/&nbsp;password?
            </NavLink>
          </Typography>
        </Box>
        <Box align="center">
          <Typography variant="body1">
            Don&#39;t have an account?&nbsp;
            {switchToSignup ? (
              <MenuLink onClick={switchToSignup} children="Signup!" />
            ) : (
              <NavLink to="/signup" children="Signup!" underline="always" />
            )}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

Login.propTypes = {
  requestLoginAttempt: PropTypes.func.isRequired,
  account: PropTypes.object,
  switchToSignup: PropTypes.func
};

export default Login;
