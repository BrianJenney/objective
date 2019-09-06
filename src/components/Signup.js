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
import { SignupForm } from './forms';
import { MenuLink, NavLink } from './common';

const Signup = ({ requestCreateAccount, switchToLogin }) => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box component={Paper} p={4}>
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Box component={Typography} variant="h5" my={4} align="center">
        Create an Account
      </Box>
      <SignupForm onSubmit={requestCreateAccount} />
      <Box mt={2}>
        <Typography variant="body1">
          Already registered?&nbsp;
          {switchToLogin ? (
            <MenuLink onClick={switchToLogin} children="Login!" />
          ) : (
            <NavLink to="/login" children="Login!" />
          )}
        </Typography>
      </Box>
    </Box>
  </Container>
);

Signup.propTypes = {
  requestCreateAccount: PropTypes.func.isRequired,
  switchToLogin: PropTypes.func
};

export default Signup;
