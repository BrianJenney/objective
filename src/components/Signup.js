import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  CssBaseline,
  Paper,
  Typography,
  Container
} from '@material-ui/core';
import { SignupForm } from './forms';
import { MenuLink, NavLink } from './common';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '40px',
    fontWeight: 'bold'
  },
  subTitle: {
    paddingBottom: theme.spacing(3)
  }
}));

const Signup = ({ requestCreateAccount, switchToLogin }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} pb={3}>
        <Box textAlign="center">
          <Typography gutterBottom className={classes.title}>
            Create an account
          </Typography>
          <Typography variant="body1" className={classes.subTitle}>
            Already registered?&nbsp;
            {switchToLogin ? (
              <MenuLink onClick={switchToLogin} children="Login!" />
            ) : (
              <NavLink to="/login" children="Login!" underline="always" />
            )}
          </Typography>

          <SignupForm onSubmit={requestCreateAccount} />
        </Box>
      </Box>
    </Container>
  );
};

Signup.propTypes = {
  requestCreateAccount: PropTypes.func.isRequired,
  switchToLogin: PropTypes.func
};

export default Signup;
