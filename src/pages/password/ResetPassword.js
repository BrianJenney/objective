import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Formik, Field, Form } from 'formik';
import { object, string } from 'yup';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button, NavLink } from '../../components/common';
import { requestPasswordReset } from '../../modules/account/actions';

import { InputField } from '../../components/form-fields';
import withDialog from '../../hoc/withDialog';
import './password-styles.scss';

const schema = object().shape({
  newPassword1: string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Both fields are required!'),
  newPassword2: string()
    .min(6, 'Password has to be longer than 6 characters!')
    .required('Both fields are required!')
});

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '36px',
    color: '#231f20',
    fontFamily: 'Canela Text Web',
    lineHeight: 'normal',
    padding: theme.spacing(3, 0, 2),
    [theme.breakpoints.down('xs')]: {
      fontSize: '36px'
    }
  },
  subTitle: {
    fontSize: '18px',
    fontFamily: 'FreightTextProBook',
    paddingBottom: theme.spacing(3)
  }
}));

const validatePassword = values => {
  const { newPassword1, newPassword2 } = values;
  const errors = {};
  if (newPassword1.trim() !== newPassword2.trim()) {
    errors.newPassword2 = 'Confirm password is not the same as new password';
  }
  return errors;
};

const ResetPassword = ({ history, location }) => {
  const INITIAL_VALUES = {
    newPassword1: '',
    newPassword2: ''
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const utm_content = location.search.includes('passwordcreation');

  const [firstNewPasswordVisible, setFirstPasswordVisible] = useState(false);
  const toggleFirstPassword = useCallback(
    event => {
      event.preventDefault();
      setFirstPasswordVisible(!firstNewPasswordVisible);
    },
    [firstNewPasswordVisible, setFirstPasswordVisible]
  );

  const [secondNewPasswordVisible, setSecondPasswordVisible] = useState(false);
  const toggleSecondPassword = useCallback(
    event => {
      event.preventDefault();
      setSecondPasswordVisible(!secondNewPasswordVisible);
    },
    [secondNewPasswordVisible, setSecondPasswordVisible]
  );

  const renderForm = ({ isValid }) => (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            label={utm_content ? 'Password' : 'New Password'}
            name="newPassword1"
            type="password"
            component={InputField}
            type={firstNewPasswordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <Box width={1} textAlign="right">
                  <NavLink
                    style={{
                      fontFamily: 'p22-underground',
                      fontSize: '12px'
                    }}
                    component="button"
                    underline="always"
                    onClick={event => toggleFirstPassword(event)}
                    children={firstNewPasswordVisible ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}
                  ></NavLink>
                </Box>
              )
            }}
          />
          <Typography
            style={{
              fontFamily: 'p22-underground',
              fontSize: '11px',
              padding: '5px',
              textAlign: 'left'
            }}
          >
            Must be at least 6 characters
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Field
            label={utm_content ? 'Confirm Password' : 'Confirm New Password'}
            name="newPassword2"
            type="password"
            component={InputField}
            type={secondNewPasswordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <Box width={1} textAlign="right">
                  <NavLink
                    style={{
                      fontFamily: 'p22-underground',
                      fontSize: '12px'
                    }}
                    component="button"
                    underline="always"
                    onClick={event => toggleSecondPassword(event)}
                    children={secondNewPasswordVisible ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}
                  ></NavLink>
                </Box>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth disabled={!isValid}>
            {utm_content ? 'Set password' : 'Reset Password'}
          </Button>
        </Grid>
      </Grid>
    </Form>
  );

  const handleSubmit = values => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.getAll('tk').toString();
    dispatch(requestPasswordReset(token, values));
    const localStorageClient = require('store');
    localStorageClient.remove('token');
    history.replace('/password/success', utm_content);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box component={Paper} pb={5} textAlign="center">
        <Typography className={classes.title}>
          {utm_content ? 'Set your password' : 'Reset your password'}
        </Typography>
        <Typography className={classes.subTitle}>
          {utm_content ? 'Enter your password below.' : 'Enter your new password below.'}
        </Typography>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
          validationSchema={schema}
          validate={validatePassword}
          render={renderForm}
        />
      </Box>
    </Container>
  );
};

export default withDialog(ResetPassword);
