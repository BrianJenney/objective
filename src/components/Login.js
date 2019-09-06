import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Typography,
  Avatar
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { LoginForm } from './forms';
import { MenuLink, NavLink } from './common';

const Login = ({ requestLoginAttempt, switchToSignup }) => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box component={Paper} p={4}>
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Box component={Typography} variant="h5" my={4} align="center">
        Log in to your account
      </Box>
      <LoginForm onSubmit={requestLoginAttempt} />
      <Box mt={2}>
        <Typography variant="body1">
          Don&#39;t have an account?&nbsp;
          {switchToSignup ? (
            <MenuLink onClick={switchToSignup} children="Signup!" />
          ) : (
            <NavLink to="/signup" children="Signup!" />
          )}
        </Typography>
      </Box>
    </Box>
  </Container>
);

Login.propTypes = {
  requestLoginAttempt: PropTypes.func.isRequired,
  switchToSignup: PropTypes.func
};

export default Login;
