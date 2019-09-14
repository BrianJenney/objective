import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Button, AlertPanel } from '../common';
import { withCurrentUser } from '../../hoc';
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

const LoginForm = ({ title, onSubmit, currentUser }) => {
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
        <Box px={2}>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        </Box>
        <Grid item xs={12}>
          <Button fullWidth type="submit" children="Login" />
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
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default withCurrentUser(LoginForm);
