import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { InputField } from '../../components/form-fields';
import store from '../../store';
import { requestCreateAccount } from '../../modules/account/actions';

const CreateAccountForm = ({ onSubmit }) => {
  const INITIAL_VALUES = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  const schema = object().shape({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    email: string().required('Email is required'),
    password: string().required('Password is required')
  });

  const renderForm = () => (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Create an Account
      </Typography>
      <Form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Field name="firstName" label="First name" component={InputField} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              required
              name="lastName"
              label="Last name"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field name="email" label="Email Address" component={InputField} />
          </Grid>
          <Grid item xs={12}>
            <Field name="password" label="Password" component={InputField} />
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Button type="button" mr={2} />
                <Button type="submit" children="Next" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </React.Fragment>
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
      render={renderForm}
      enableReinitialize
    />
  );
};

CreateAccountForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CreateAccountForm;
