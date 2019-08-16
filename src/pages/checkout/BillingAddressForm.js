import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Box, Grid, Typography, Checkbox } from '@material-ui/core';
import { InputField } from '../../components/form-fields';
import { Button } from '../../components/common';

const schema = object().shape({
  billingAddress: object().shape({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    address1: string().required('Address1 is required'),
    address2: string().required('Address2 is required'),
    city: string().required('City is required'),
    state: string().required('State is required'),
    zip: string().required('Zip code is required'),
    country: string().required('Country is required')
  })
});

const INITIAL_VALUES = {
  billingAddress: {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  }
};

const BillingAddressForm = ({ shippingAddressSeed, onSubmit, onBack }) => {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const handleUseShippingAddressToggle = event => {
    if (event.target.checked) {
      setInitialValues({
        billingAddress: {
          ...shippingAddressSeed.shippingAddress
        }
      });
    } else {
      setInitialValues(INITIAL_VALUES);
    }
  };
  const renderForm = () => (
    <Box>
      <Typography variant="h6" gutterBottom children="Billing Address" />
      <Form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Checkbox
                id="useShippingAddressToggle"
                onChange={handleUseShippingAddressToggle}
              />
              <Typography children="Use shipping address" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="billingAddress.firstName"
              label="First name"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="billingAddress.lastName"
              label="Last name"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="billingAddress.address1"
              label="Address line 1"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="billingAddress.address2"
              label="Address line 2"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="billingAddress.city"
              label="City"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="billingAddress.state"
              label="State/Province/Region"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="billingAddress.zip"
              label="Zip/Postal code"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="billingAddress.country"
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
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
      render={renderForm}
      enableReinitialize
    />
  );
};

BillingAddressForm.propTypes = {
  shippingAddressSeed: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default BillingAddressForm;
