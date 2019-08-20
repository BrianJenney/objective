import React from 'react';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Box, Grid, Typography } from '@material-ui/core';
import { InputField } from '../../components/form-fields';
import { Button } from '../../components/common';

const schema = object().shape({
  shippingAddress: object().shape({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    address1: string().required('Address1 is required'),
    address2: string().required('Address2 is required'),
    city: string().required('City is required'),
    state: string().required('State is required'),
    postalCode: string().required('Postal code is required'),
    country: string().required('Country is required')
  })
});

const INITIAL_VALUES = {
  shippingAddress: {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  }
};

const ShippingAddressForm = ({ onSubmit, onBack }) => {
  const renderForm = () => (
    <Box>
      <Typography variant="h6" gutterBottom children="Shipping address" />
      <Form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Field
              name="shippingAddress.firstName"
              label="First name"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="shippingAddress.lastName"
              label="Last name"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="shippingAddress.address1"
              label="Address line 1"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="shippingAddress.address2"
              label="Address line 2"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="shippingAddress.city"
              label="City"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="shippingAddress.state"
              label="State/Province/Region"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="shippingAddress.postalCode"
              label="Zip/Postal code"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="shippingAddress.country"
              label="Country"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Button type="button" onClick={onBack} children="Back" mr={2} />
              <Button type="submit" children="Next" />
            </Box>
          </Grid>
        </Grid>
      </Form>
    </Box>
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

ShippingAddressForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default ShippingAddressForm;
