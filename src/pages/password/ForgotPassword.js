import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import {
  CssBaseline,
  Typography,
  Grid,
  Container,
  Box,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '../../components/common';
import { InputField } from '../../components/form-fields';
import store from '../../store';
import { requestForgotPassword } from '../../modules/account/actions';
import withDialog from '../../hoc/withDialog';

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email')
});

const INITIAL_VALUES = {
  email: ''
};

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '40px',
    fontWeight: 'bold',
    padding: theme.spacing(3, 0, 2)
  },
<<<<<<< HEAD
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
  title: {
    width: theme.spacing(55),
    textAlign: 'center',
    fontSize: '32px'
  },
  subTitle: {
    width: theme.spacing(70),
    textAlign: 'center',
    paddingTop: '10px'
=======
  subTitle: {
    fontSize: '17px',
    paddingBottom: theme.spacing(3)
>>>>>>> master
  }
}));

const ForgotPassword = () => {
  console.log('here forgot password');
  const classes = useStyles();

  const handleSubmit = ({ email }) => {
    store.dispatch(requestForgotPassword(email));
    window.location = '/password/confirm';
  };

  const renderForm = () => (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            name="email"
            label="Email Address"
            component={InputField}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth children="Request Reset Link" />
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
<<<<<<< HEAD
      <div className={classes.paper}>
        <Typography className={classes.title} component="h1" variant="h5">
          Forgot your email / password?
        </Typography>
        <Typography component='subtitle1' className={classes.subTitle}>It's easy to forget. Enter your email address and we'll send you a reset link.</Typography>
=======
      <Box component={Paper} pb={5} textAlign="center">
        <Typography className={classes.title}>
          Forgot your email / password?
        </Typography>
        <Typography className={classes.subTitle}>
          It's easy to forget. Enter your email address and we'll send you a
          reset link.
        </Typography>

>>>>>>> master
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={schema}
          render={renderForm}
        />
      </Box>
    </Container>
  );
};

ForgotPassword.propTypes = {
  email: PropTypes.string
};

const mapStateToProps = state => ({
  email: state.email
});

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withDialog
)(ForgotPassword);
