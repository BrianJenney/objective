import React from 'react';
import PropTypes from 'prop-types';
import { Box, CssBaseline, Paper, Typography } from '@material-ui/core';
import { SignupForm } from './forms';
import { MenuLink, NavLink } from './common';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '40px',
    fontWeight: 'bold'
  },
  paper: {
    padding: theme.spacing(0, 5, 5)
  }
}));

const Signup = ({ requestCreateAccount, switchToLogin }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <CssBaseline />
      <Box align="center">
        <Typography gutterBottom className={classes.title}>
          Create an account
        </Typography>
        <SignupForm onSubmit={requestCreateAccount} />

        <Typography variant="body1">
          Already registered?&nbsp;
          {switchToLogin ? (
            <MenuLink onClick={switchToLogin} children="Login!" />
          ) : (
            <NavLink to="/login" children="Login!" underline="always" />
          )}
        </Typography>
      </Box>
    </Paper>
  );
};

Signup.propTypes = {
  requestCreateAccount: PropTypes.func.isRequired,
  switchToLogin: PropTypes.func
};

export default Signup;
