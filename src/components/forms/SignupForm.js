import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import { object, string, boolean } from 'yup';
import { CheckboxField, InputField } from '../form-fields';
import { Button, NavLink } from '../common';

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
  email: string().required('Email is required'),
  password: string().required('Password is required'),
  newsletter: boolean()
});

const SignupForm = ({ title, onSubmit }) => {
  const renderForm = () => (
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
            type="password"
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
          <Button fullWidth type="submit" children="Create account" />
        </Grid>
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
  onSubmit: PropTypes.func.isRequired
};

export default SignupForm;
