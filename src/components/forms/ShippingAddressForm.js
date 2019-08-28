import React from 'react';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Box, Grid, Typography } from '@material-ui/core';
import { InputField, SelectField, CheckboxField } from '../form-fields';
import { Button } from '../common';
import { COUNTRY_OPTIONS } from '../../constants/location';
import { StyledSectionHeader } from '../../pages/checkout/StyledComponents';

const schema = object().shape({
  shippingAddress: object().shape({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    line1: string().required('Address1 is required'),
    line2: string(),
    city: string().required('City is required'),
    state: string().required('State is required'),
    postalCode: string().required('Postal code is required'),
    countryCode: string().required('Country is required')
  })
});

const INITIAL_VALUES = {
  shippingAddress: {
    firstName: 'Kevin',
    lastName: 'Christian',
    line1: '1111 Sprng Street',
    line2: '',
    city: 'Raleigh',
    state: 'NC',
    postalCode: '22222',
    countryCode: 'AD'
  }
};

const ShippingAddressForm = ({ onSubmit, onBack }) => {
  const renderForm = () => (
    <Box>
      <StyledSectionHeader
        style={{ 'margin-bottom': '20px' }}
        variant="h6"
        gutterBottom
        children="Shipping address"
      />
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
              name="shippingAddress.line1"
              label="Address line 1"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="shippingAddress.line2"
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
              name="shippingAddress.countryCode"
              label="Country"
              component={SelectField}
              options={COUNTRY_OPTIONS}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="default"
              label="Save as default address"
              component={CheckboxField}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              {onBack && (
                <Button type="button" onClick={onBack} children="Back" mr={2} />
              )}
              <Button type="submit" children={onBack ? 'Next' : 'Save'} />
            </Box>
          </Grid> */}
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
  onBack: PropTypes.func
};

export default ShippingAddressForm;
