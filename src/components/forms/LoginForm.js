import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Button, NavLink, AlertPanel } from '../common';
import { withCurrentUser } from '../../hoc';
import { CheckboxField, InputField } from '../form-fields';
import { fonts } from '../Theme/fonts';
const { smallHeader } = fonts;

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email'),
  password: string().required('Password is required')
});

const INITIAL_VALUES = {
  email: '',
  password: '',
  rememberMe: false
};

const LoginForm = ({ title, onSubmit, currentUser }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = useCallback(
    event => {
      event.preventDefault();
      setPasswordVisible(!passwordVisible);
    },
    [passwordVisible, setPasswordVisible]
  );

  const renderForm = () => {
    let loginError = null;
    if (currentUser.loginError) {
      loginError = currentUser.loginError.message;
    }

    const toggleRememberMe = () => {

    }

    return (
      <Form>
        {title && <Typography variant="h6" gutterBottom children={title} />}
        <AlertPanel
          my={2}
          p={2}
          type="error"
          bgcolor="#ffcdd2"
          text={loginError}
          variant="subtitle2"
        />
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
                        fontFamily: smallHeader,
                        fontSize: '12px'
                      }}
                      component="button"
                      underline="always"
                      onClick={event => togglePasswordVisibility(event)}
                      children={
                        passwordVisible ? 'HIDE PASSWORD' : 'SHOW PASSWORD'
                      }
                    />
                  </Box>
                )
              }}
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="remember me"
              color="primary"
              label="Remember me"
              component={CheckboxField}
              onChange={toggleRememberMe}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" children="Login" />
          </Grid>
        </Grid>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={onSubmit}
      validationSchema={schema}
      render={renderForm}
    />
  );
};

LoginForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default withCurrentUser(LoginForm);
