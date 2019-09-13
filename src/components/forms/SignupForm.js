import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Formik, Field, Form } from 'formik';
import { object, string, boolean } from 'yup';

import { CheckboxField, InputField } from '../form-fields';
import { Button, NavLink, AlertPanel } from '../common';
import { withCurrentUser } from '../../hoc';

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  newsletter: false
};

const schema = object().shape({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string()
    .email('Invalid email')
    .required('Email is required'),
  password: string()
    .min(8)
    .required('Password is required'),
  newsletter: boolean()
});

const SignupForm = ({ title, onSubmit, currentUser }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = useCallback(
    () => setPasswordVisible(!passwordVisible),
    [passwordVisible, setPasswordVisible]
  );

  const renderForm = ({ isValid }) => (
    <Form>
      {title && <Typography variant="h6" gutterBottom children={title} />}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Field name="firstName" label="First Name" component={InputField} />
        </Grid>
        <Grid item xs={6}>
          <Field name="lastName" label="Last Name" component={InputField} />
        </Grid>
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
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="newsletter"
            label="Subscribe to True Health news"
            component={CheckboxField}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            children="Create account"
            disabled={!isValid}
          />
        </Grid>
        {currentUser.error && (
          <AlertPanel
            my={2}
            p={2}
            type="error"
            bgcolor="#ffcdd2"
            text={currentUser.error}
            variant="subtitle2"
          />
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            By creating an account you agree to the True Health
          </Typography>
          <Typography>
            <NavLink to="/termsandconditions" underline="always">
              Terms &amp; Conditions&nbsp;
            </NavLink>
            &amp;&nbsp;
            <NavLink to="/privacypolicy" underline="always">
              Privacy Policy
            </NavLink>
          </Typography>
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={onSubmit}
      validationSchema={schema}
      render={renderForm}
    />
  );
};

SignupForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default withCurrentUser(SignupForm);
