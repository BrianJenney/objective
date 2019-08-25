import React, { useState } from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Grid, Link, Typography } from '@material-ui/core';
import { Formik, Field, Form } from 'formik';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { CheckboxField, InputField } from '../../components/form-fields';

const StyledLink = withStyles(theme => ({
  root: {
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'normal',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '16px'
  }
}))(Link);

const CreateAccountForm = ({ onSubmit }) => {
  const INITIAL_VALUES = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    newsletter: false
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
      <Form>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Typography variant="h6" gutterBottom>
              Create an Account
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6" gutterBottom>
              <StyledLink component={RouterLink} to="/login">
                Login
              </StyledLink>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
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
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Button type="button" mr={2} />
                <Button type="submit" children="Next" />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Field
              name="paymentDetails.saveCard"
              label="Remember credit card details for next time"
              component={CheckboxField}
            />
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
