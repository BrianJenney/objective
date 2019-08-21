import React from 'react';
import PropTypes from 'prop-types';
import { object, string, number, boolean } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Box, Grid, Typography } from '@material-ui/core';
import {
  InputField,
  CheckboxField,
  DatePickerField
} from '../../components/form-fields';
import { Button } from '../../components/common';

const schema = object().shape({
  paymentDetails: object().shape({
    cardholderName: string().required('Card name is required'),
    number: number().required('Card number is required'),
    expirationDate: string().required('Expiry date is required'),
    cvv: number().required('CVV is required'),
    saveCard: boolean()
  })
});

const INITIAL_VALUES = {
  paymentDetails: {
    cardholderName: '',
    number: 0,
    expirationDate: '02/20/2023',
    cvv: 0,
    saveCard: false
  }
};

const PaymentForm = ({ onSubmit, onBack }) => {
  const renderForm = () => (
    <Box>
      <Typography variant="h6" gutterBottom children="Payment method" />
      <Form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Field
              name="paymentDetails.cardholderName"
              label="Name on Card"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              name="paymentDetails.number"
              label="Card Number"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              name="paymentDetails.expirationDate"
              component={DatePickerField}
              variant="inline"
              label="Expiry Date"
              autoOk
              disableToolbar
              disablePast
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              name="paymentDetails.cvv"
              label="CVV"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="paymentDetails.saveCard"
              label="Remember credit card details for next time"
              component={CheckboxField}
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

PaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default PaymentForm;
