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
