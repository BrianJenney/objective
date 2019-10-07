import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CssBaseline,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withDialog from '../../hoc/withDialog';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '48px',
    fontFamily: 'Canela Text Web',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      fontSize: '36px',
      lineHeight: '1.11',
      paddingBottom: '10px'
    }
  },
  text: {
    fontSize: '18px',
    lineHeight: 'normal',
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px'
    }
  }
}));

const ConfirmPassword = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} pb={8} textAlign="center">
        <Typography className={classes.title}>We sent you an email</Typography>
        <Typography className={classes.text}>
          If your email exists in our system, you will receive a link to reset
          your password shortly.
        </Typography>
      </Box>
    </Container>
  );
};

const ConfirmPasswordDialog = withDialog(ConfirmPassword);

const ConfirmPasswordPage = props => (
  <ConfirmPasswordDialog onExited={props.history.goBack} {...props} />
);

export default withRouter(ConfirmPasswordPage);
