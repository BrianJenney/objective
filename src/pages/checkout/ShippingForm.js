import React from 'react';
import PropTypes from 'prop-types';
import { object } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Box, Grid, Typography } from '@material-ui/core';
import { RadioGroupField } from '../../components/form-fields';

const schema = object().shape({
  shipping: object().required('Shipping method is required')
});

const SHIPPING_METHODS = [
  {
    key: 'ground',
    label: 'Ground - 0.00 (Estimated Delivery: 3-7 Business Days)',
    value: {
      displayName: 'Ground',
      name: 'ground',
      price: 0.0,
      deliveryEstimate: '3-7 Business Days'
    }
  },
  {
    key: 'air',
    label: '2 Day Air - 17.9 (Estimated Delivery: 2 Business Days)',
    value: {
      displayName: '2 Day Air',
      name: '2dayair',
      price: 17.9,
      deliveryEstimate: '2 Business Days'
    }
  }
];

const INITIAL_VALUES = {
  shipping: null
};

const ShippingForm = ({ onSubmit }) => {
  const renderForm = () => (
    <Box>
      <Typography variant="h6" gutterBottom children="Shipping Method" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Form>
            <Field
              component={RadioGroupField}
              name="shipping"
              options={SHIPPING_METHODS}
            />
          </Form>
        </Grid>
      </Grid>
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

ShippingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ShippingForm;
