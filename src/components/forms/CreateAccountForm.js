import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
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

const CreateAccountForm = ({
  title,
  onSubmit,
  onBack,
  submitLabel,
  backLabel
}) => {
  const renderForm = () => (
    <Form>
      {title && <Typography variant="h6" gutterBottom children={title} />}
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h6" gutterBottom>
            Create an Account
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" gutterBottom>
            <NavLink to="/login">Login</NavLink>
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Field name="firstName" label="First Name" component={InputField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="lastName" label="Last Name" component={InputField} />
        </Grid>
        <Grid item xs={12}>
          <Field name="email" label="Email Address" component={InputField} />
        </Grid>
        <Grid item xs={12}>
          <Field name="password" label="Password" component={InputField} />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="newsletter"
            label="Subscribe to True Health news"
            component={CheckboxField}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            {onBack && (
              <Button
                type="button"
                onClick={onBack}
                children={backLabel}
                mr={2}
              />
            )}
            <Button type="submit" children={submitLabel} />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            By creating an account you agree to the True Health
            <NavLink to="/termsandconsitions">Terms &amp; Conditions</NavLink>
            &amp;
            <NavLink to="/privacypolicy">Privacy Policy</NavLink>
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

CreateAccountForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  submitLabel: PropTypes.string,
  backLabel: PropTypes.string
};

CreateAccountForm.defaultProps = {
  submitLabel: 'Create Account',
  backLabel: 'Cancel'
};

export default CreateAccountForm;
