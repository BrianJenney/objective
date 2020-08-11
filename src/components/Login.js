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
    fontSize: '25px',
    color: theme.palette.brand.camoGreen,
    fontFamily: theme.typography.headerFontFamily,
    lineHeight: 'normal',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      margin: 0,
      paddingTop: 15
    }
  },
  subTitle: {
    fontFamily: theme.typography.bodyFontFamily,
    fontSize: '14px',
    color: theme.palette.brand.darkSubTextGray,
    paddingBottom: theme.spacing(1),
    lineHeight: 1.1
  },
  form: {
    padding: '0 78px',
    [theme.breakpoints.down('xs')]: {
      padding: 0
    }
  }
}));

const Login = ({ requestLogin, clearLoginError, switchToSignup, loginTitle }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper}>
        <Box textAlign="center">
          <Typography className={classes.title}>
            {loginTitle || 'Log in to your account'}
          </Typography>
          <Box pt={4}>
            <LoginForm
              onSubmit={requestLogin}
              clearLoginError={clearLoginError}
              formStyle={classes.form}
            />
          </Box>
          <Box mt={2} mb={2}>
            <Typography className={classes.subTitle}>
              <NavLink
                to="/password/forgot"
                replace
                underline="always"
                style={{ color: '#553226' }}
              >
                Forgot your email/&nbsp;password?
              </NavLink>
            </Typography>

            <Typography className={classes.subTitle}>
              Don&#39;t have an account?&nbsp;
              {switchToSignup ? (
                <MenuLink
                  onClick={switchToSignup}
                  style={{ color: '#7f7470' }}
                  children="Sign up!"
                />
              ) : (
                <NavLink
                  style={{ color: '#553226' }}
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
  loginTitle: PropTypes.string,
  requestLogin: PropTypes.func.isRequired,
  clearLoginError: PropTypes.func.isRequired,
  switchToSignup: PropTypes.func
};

Login.defaultProps = {
  loginTitle: 'Login'
};

export default Login;
