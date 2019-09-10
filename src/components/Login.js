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
import { MenuLink, NavLink, AlertPanel } from './common';

const Login = ({ requestLoginAttempt, account, switchToSignup }) => (
  <Container component="main" maxWidth="sm">
    <CssBaseline />
    <Box component={Paper} p={4}>
      <Box component={Typography} variant="h5" my={3} align="center">
        Log in to your account
      </Box>
      {account.error && (
        <AlertPanel
          mb={2}
          type="error"
          bgcolor="#ffcdd2"
          text={account.error}
        />
      )}
      <LoginForm onSubmit={requestLoginAttempt} />
      <Box mt={2} align="center">
        <Typography variant="body1">
          <NavLink to="/password/forgot" underline="always">
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

Login.propTypes = {
  requestLoginAttempt: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  switchToSignup: PropTypes.func,
  closeDialog: PropTypes.func
};

export default Login;
