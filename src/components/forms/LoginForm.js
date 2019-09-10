import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Button } from '../common';
import { InputField } from '../form-fields';

const schema = object().shape({
  email: string()
    .required('Email is required')
    .email('Input valid email'),
  password: string().required('Password is required')
});

const INITIAL_VALUES = {
  email: 'kevinch@nutranext.net',
  password: '444444'
};

const LoginForm = ({ title, onSubmit }) => {
  const renderForm = () => (
    <Form>
      {title && <Typography variant="h6" gutterBottom children={title} />}
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
            type="password"
            autoComplete="current-password"
          />
        </Grid>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Grid item xs={12}>
          <Button fullWidth type="submit" children="Login" />
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

LoginForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
