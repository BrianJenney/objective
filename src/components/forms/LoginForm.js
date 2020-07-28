import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Button, NavLink, AlertPanel } from '../common';
import { getErrorMessage } from '../../utils/misc';
import { withCurrentUser } from '../../hoc';
import { CheckboxField, InputField } from '../form-fields';

const getBoolean = value => {
  if (!value) return false;
  return value !== 'false';
};

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email'),
  password: string()
    .required('Password is required')
    .min(6, 'Password has to be longer than 6 characters!')
});

const LoginForm = ({ title, onSubmit, clearLoginError, currentUser, formStyle }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = useCallback(
    event => {
      event.preventDefault();
      setPasswordVisible(!passwordVisible);
    },
    [passwordVisible, setPasswordVisible]
  );
  const errorMessage = getErrorMessage(currentUser.loginError);

  useEffect(() => {
    clearLoginError();
  }, []);

  const handleLogin = useCallback(
    (values, actions) => {
      const { email, rememberMe } = values;
      localStorage.setItem('_rememberme_', rememberMe);
      if (rememberMe) {
        localStorage.setItem('_email_', email);
      } else {
        localStorage.removeItem('_email_');
      }
      onSubmit(values, actions);
    },
    [onSubmit]
  );

  const renderForm = ({ values, isValid }) => (
    <Form className={formStyle}>
      {title && <Typography variant="h6" gutterBottom children={title} />}
      {currentUser.loginError && (
        <AlertPanel type="error" text={errorMessage} onClose={clearLoginError} />
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field name="email" label="Email Address" component={InputField} autoComplete="email" />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="password"
            label="Password"
            component={InputField}
            type={passwordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <Box width={1} textAlign="right">
                  <NavLink
                    style={{
                      fontFamily: 'p22-underground',
                      fontSize: 12
                    }}
                    type="button"
                    underline="always"
                    onClick={event => togglePasswordVisibility(event)}
                    // children={passwordVisible ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}
                  />
                </Box>
              )
            }}
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="rememberMe"
            color="primary"
            label="Remember me"
            component={CheckboxField}
            value={values.rememberMe}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth type="submit" children="Log in" disabled={!isValid} />
        </Grid>
      </Grid>
    </Form>
  );
  const rememberMe = getBoolean(localStorage.getItem('_rememberme_'));
  const INITIAL_VALUES = {
    email: localStorage.getItem('_email_') || '',
    password: '',
    rememberMe
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleLogin}
      validationSchema={schema}
      render={renderForm}
    />
  );
};

LoginForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  clearLoginError: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default withCurrentUser(LoginForm);
