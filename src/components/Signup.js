import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { SignupForm } from './forms';
import { MenuLink, NavLink } from './common';

const useStyles = makeStyles(theme => ({
  title: {
    height: '48px',
    fontSize: '48px',
    color: '#231f20',
    fontFamily: 'Canela Text',
    lineHeight: 'normal',
    margin: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      fontSize: '36px',
      margin: theme.spacing(1)
    }
  },
  subTitle: {
    fontFamily: 'p22-underground',
    fontSize: '16px',
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px'
    }
  }
}));

const Signup = ({ requestCreateAccount, clearCreateAccountError, switchToLogin }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} pb={3}>
        <Box textAlign="center">
          <Typography className={classes.title}>Create an account</Typography>
          <Typography className={classes.subTitle}>
            Already registered?&nbsp;
            {switchToLogin ? (
              <MenuLink onClick={switchToLogin} children="Log in!" />
            ) : (
              <NavLink to="/login" children="Log in!" replace underline="always" />
            )}
          </Typography>

          <SignupForm onSubmit={requestCreateAccount} clearCreateAccountError={clearCreateAccountError} />
        </Box>
      </Box>
    </Container>
  );
};

Signup.propTypes = {
  requestCreateAccount: PropTypes.func.isRequired,
  clearCreateAccountError: PropTypes.func.isRequired,
  switchToLogin: PropTypes.func
};

export default Signup;
