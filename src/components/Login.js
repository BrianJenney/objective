import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { LoginForm } from './forms';
import { MenuLink, NavLink, AlertPanel } from './common';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '40px',
    fontWeight: 'bold',
    paddingBottom: theme.spacing(2)
  }
}));

const Login = ({ requestLoginAttempt, account, switchToSignup }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} pb={2}>
        <Box textAlign="center">
          <Typography className={classes.title}>
            Log in to your account
          </Typography>

          {account.error && (
            <AlertPanel
              mb={3}
              type="error"
              bgcolor="#ffcdd2"
              text={account.error}
              variant="subtitle2"
            />
          )}
          <LoginForm onSubmit={requestLoginAttempt} />

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
    </Container>
  );
};

Login.propTypes = {
  requestLoginAttempt: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  switchToSignup: PropTypes.func,
  closeDialog: PropTypes.func
};

export default Login;
