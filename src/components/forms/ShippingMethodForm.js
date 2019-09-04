import React from 'react';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Box, Grid, Typography } from '@material-ui/core';
import { RadioGroupField } from '../form-fields';
import { Button } from '../common';

const schema = object().shape({
  shippingMethod: string().required('Shipping method is required')
});

const SHIPPING_METHOD_OPTIONS = [
  {
    key: 'ground',
    label: 'Ground - 0.00 (Estimated Delivery: 3-7 Business Days)',
    value: 'ground'
  },
  {
    key: 'air',
    label: '2 Day Air - 17.9 (Estimated Delivery: 2 Business Days)',
    value: 'twodayair'
  }
];

const INITIAL_VALUES = {
  shippingMethod: ''
};

const ShippingMethodForm = ({ onBack, onSubmit }) => {
  const renderForm = () => (
    <Box>
      <Typography variant="h6" gutterBottom children="Shipping Method" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Form>
            <Box>
              <Field
                component={RadioGroupField}
                name="shippingMethod"
                options={SHIPPING_METHOD_OPTIONS}
              />
            </Box>
            <Box>
              {onBack && (
                <Button type="button" onClick={onBack} children="Back" mr={2} />
              )}
              <Button type="submit" children={onBack ? 'Next' : 'Save'} />
            </Box>
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

ShippingMethodForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default ShippingMethodForm;
