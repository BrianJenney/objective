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
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '30px',
    fontFamily: 'bodoni-urw, serif;'
  },
  mobileTitle: {
    fontSize: 24,
    fontFamily: 'bodoni-urw, serif;'
  },
  subTitle: {
    textAlign: 'right',
    fontSize: '18px',
    fontWeight: 'normal',
    fontFamily: 'proxima-nova, sans-serif',
    fontWeight: '600',
    paddingTop: '13px'
  },
  mobileLogin: {
    fontFamily: 'proxima-nova, sans-serif',
    fontSize: 16,
    fontWeight: 600
  },
  mobileBox: {}
}));

const SignupCheckout = ({
  requestCreateAccount,
  clearCreateAccountError,
  switchToLogin,
  handleSignupVisible
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Container component="main" maxWidth="md" style={xs ? { padding: 0 } : {}}>
      <CssBaseline />
      <Box component={Paper} py={xs ? 0 : 3} px={xs ? 0 : 5}>
        <Box>
          <Box display="flex" pb={2} className="justify-content">
            <Typography
              gutterBottom
              className={xs ? classes.mobileTitle : classes.title}
            >
              Create your Account
            </Typography>

            <Typography
              variant="body1"
              className={xs ? classes.mobileLogin : classes.subTitle}
            >
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

          <SignupForm
            onSubmit={requestCreateAccount}
            clearCreateAccountError={clearCreateAccountError}
            handleSignupVisible={handleSignupVisible}
          />
        </Box>
      </Box>
    </Container>
  );
};

SignupCheckout.propTypes = {
  requestCreateAccount: PropTypes.func.isRequired,
  clearCreateAccountError: PropTypes.func.isRequired,
  switchToLogin: PropTypes.func
};

export default SignupCheckout;
