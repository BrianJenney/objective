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
import { fontFamily } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '30px',
    fontWeight: '600'
  },
  subTitle: {
    textAlign: 'right',
    fontSize: '18px',
    fontWeight: 'normal',
    fontFamily: 'p22-underground, Helvetica, sans-serif',
    marginLeft: '470px',
    fontWeight: '600',
    paddingTop: '13px'
  }
}));

const SignupCheckout = ({ requestCreateAccount, switchToLogin }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box component={Paper} py={3} px={5}>
        <Box>
          <Box display="flex" pb={2}>
            <Typography gutterBottom className={classes.title}>
              Create your Account
            </Typography>
            <Typography variant="body1" className={classes.subTitle}>
              {switchToLogin ? (
                <MenuLink
                  onClick={switchToLogin}
                  children="LOG IN"
                  underline="always"
                />
              ) : (
                <NavLink to="/login" children="LOG IN" underline="always" />
              )}
            </Typography>
          </Box>
          <SignupForm onSubmit={requestCreateAccount} />
        </Box>
      </Box>
    </Container>
  );
};

SignupCheckout.propTypes = {
  requestCreateAccount: PropTypes.func.isRequired,
  switchToLogin: PropTypes.func
};

export default SignupCheckout;
