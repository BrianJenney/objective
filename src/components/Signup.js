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
    minHeight: '48px',
    fontSize: '36px',
    color: theme.palette.brand.camoGreen,
    fontFamily: theme.typography.headerFontFamily,
    lineHeight: 'normal',
    margin: theme.spacing(2),
    

    [theme.breakpoints.down('xs')]: {
      minHeight: '0px',
      fontSize: '25px',
      float: 'left',
      margin: 0,
      paddingLeft: '10px'
    }
  },
  subTitle: {
    fontFamily: theme.typography.bodyFontFamily,
    color: theme.palette.brand.darkSubTextGray,
    fontSize: '16px',
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
      float: 'left',
      paddingLeft: '10px'
    }
  },
  link: {
    color: theme.palette.brand.accentBrown,
    fontSize: '14px'
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
            Already have an account?&nbsp;
            {switchToLogin ? (
              <MenuLink className={classes.link} onClick={switchToLogin} children="Log in" />
            ) : (
              <NavLink className={classes.link} to="/login" children="Log in" replace underline="always" />
            )}
          </Typography>

          <SignupForm
            onSubmit={requestCreateAccount}
            clearCreateAccountError={clearCreateAccountError}
          />
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
