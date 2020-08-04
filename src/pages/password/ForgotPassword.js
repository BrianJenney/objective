import React from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';

import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { Button } from '../../components/common';
import { InputField } from '../../components/form-fields';
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
    fontSize: '36px',
    color: theme.palette.brand.camoGreen,
    fontFamily: theme.typography.headerFontFamily,
    lineHeight: 'normal',
    padding: theme.spacing(3, 0, 2),
    [theme.breakpoints.down('xs')]: {
      fontSize: '25px'
    }
  },
  subTitle: {
    fontSize: '16px',
    fontFamily: theme.typography.bodyFontFamily,
    color: theme.palette.brand.darkSubTextGray,
    lineHeight: '24px',
    padding: '0 10px 0 10px',
    paddingBottom: theme.spacing(3)
  },
  form: {
    padding: '0 78px',
    [theme.breakpoints.down('xs')]: {
      padding: 0
    }
  }
}));

const ForgotPassword = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = ({ email }) => {
    const { location } = window;
    const url = `${location.protocol}//${location.host}`;

    dispatch(requestForgotPassword(email, url));
    history.replace('/password/confirm');
  };

  const renderForm = ({ isValid }) => (
    <Form className={classes.form}>
      <Grid container>
        <Grid item xs={12}>
          <Field name="email" label="Email Address" component={InputField} autoComplete="email" />
        </Grid>
        <Grid item xs={12} style={{ paddingTop: '33px' }}>
          <Button type="submit" disabled={!isValid} fullWidth children="Request Reset Link" />
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} pb={5} textAlign="center">
        <Typography className={classes.title}>Forgot your email/password?</Typography>
        <Typography className={classes.subTitle}>
          It's easy to forget. Enter your email address and we'll send you a reset link.
        </Typography>
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

const ForgotPasswordDialog = compose(withRouter, withDialog)(ForgotPassword);

const ForgotPasswordPage = props => (
  <ForgotPasswordDialog onExited={props.history.goBack} {...props} />
);

export default withRouter(ForgotPasswordPage);
