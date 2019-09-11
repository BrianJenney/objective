import React from 'react';
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
<<<<<<< HEAD
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  body: {
    width: theme.spacing(50),
    paddingTop: '10px',
    textAlign: 'center'
=======
  title: {
    fontSize: '40px',
    fontWeight: 'bold',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2)
>>>>>>> master
  }
}));

const ConfirmPassword = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
<<<<<<< HEAD
      <div className={classes.paper}>
        <Typography component='h2' variant="h5">
          We have sent you an email
        </Typography>
      </div>
      <Typography className={classes.body} variant="body1">
        If you email exists in our system you will receive a link to reset your password shortly.
=======
      <Box component={Paper} pb={8} textAlign="center">
        <Typography className={classes.title}>
          We have sent you an email
        </Typography>
        <Typography variant="body1">
          If you email exists in our system you will receive a link to reset
          your password shortly.
>>>>>>> master
        </Typography>
      </Box>
    </Container>
  );
};

export default withDialog(ConfirmPassword);
