import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { LoginForm } from './forms';
import { MenuLink, NavLink } from './common';

const Login = ({ requestLoginAttempt, switchToSignup }) => (
  <Container component="main" maxWidth="sm">
    <CssBaseline />
    <Box component={Paper} pb={2}>
      <Box textAlign="center">
        <Box
          component={Typography}
          fontSize={40}
          fontWeight="bold"
          pb={2}
          children="Log in to your account"
        />
        <LoginForm onSubmit={requestLoginAttempt} />
        <Box mt={2}>
          <Typography gutterBottom>
            <NavLink to="/password/forgot" underline="always">
              Forgot your email/&nbsp;password?
            </NavLink>
          </Typography>

          <Typography gutterBottom>
            Don&#39;t have an account?&nbsp;
            {switchToSignup ? (
              <MenuLink onClick={switchToSignup} children="Signup!" />
            ) : (
              <NavLink to="/signup" children="Signup!" underline="always" />
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Container>
);

Login.propTypes = {
  requestLoginAttempt: PropTypes.func.isRequired,
  switchToSignup: PropTypes.func,
  closeDialog: PropTypes.func
};

export default Login;
