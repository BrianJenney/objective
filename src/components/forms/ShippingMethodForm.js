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

const INITIAL_VALUES = {
  shippingMethod: ''
};

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

const ShippingMethodForm = ({
  title,
  onBack,
  onSubmit,
  submitLabel,
  backLabel
}) => {
  const renderForm = () => (
    <Form>
      {title && <Typography variant="h6" gutterBottom children={title} />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Field
              component={RadioGroupField}
              name="shippingMethod"
              options={SHIPPING_METHOD_OPTIONS}
            />
          </Box>
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

ShippingMethodForm.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  submitLabel: PropTypes.string,
  backLabel: PropTypes.string
};

ShippingMethodForm.defaultProps = {
  submitLabel: 'Next',
  backLabel: 'Back'
};

export default ShippingMethodForm;
