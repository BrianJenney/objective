import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { LoginForm } from './forms';
import { MenuLink, NavLink } from './common';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '48px',
    color: '#231f20',
    fontFamily: 'Canela Text Web',
    lineHeight: 'normal',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
      fontFamily: 'FreightTextProBook',
      textAlign: 'left',
      margin: 0,
      paddingTop: 15
    }
  },
  subTitle: {
    fontFamily: 'p22-underground',
    fontSize: '16px',
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px'
    }
  }
}));

const Login = ({
  requestLogin,
  clearLoginError,
  switchToSignup,
  loginTitle
}) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper}>
        <Box textAlign="center">
          <Typography className={classes.title}>
            {loginTitle ? loginTitle : 'Log in to your Account'}
          </Typography>
          <Box pt={4}>
            <LoginForm
              onSubmit={requestLogin}
              clearLoginError={clearLoginError}
            />
          </Box>
          <Box mt={2} mb={2}>
            <Typography className={classes.subTitle}>
              <NavLink to="/password/forgot" replace underline="always">
                Forgot your email/&nbsp;password?
              </NavLink>
            </Typography>

            <Typography className={classes.subTitle}>
              Don&#39;t have an account?&nbsp;
              {switchToSignup ? (
                <MenuLink onClick={switchToSignup} children="Sign up!" />
              ) : (
                <NavLink
                  to="/signup"
                  children="Sign up!"
                  replace
                  underline="always"
                />
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

Login.propTypes = {
  requestLogin: PropTypes.func.isRequired,
  clearLoginError: PropTypes.func.isRequired,
  switchToSignup: PropTypes.func,
  closeDialog: PropTypes.func
};

export default Login;
