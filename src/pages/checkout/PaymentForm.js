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

const schema = object().shape({
  paymentDetails: object().shape({
    cardName: string().required('Card name is required'),
    cardNumber: number().required('Card number is required'),
    expDate: string().required('Expiry date is required'),
    cvv: number().required('CVV is required'),
    saveCard: boolean()
  })
});

const INITIAL_VALUES = {
  paymentDetails: {
    cardName: '',
    cardNumber: 0,
    expDate: '',
    cvv: 0,
    saveCard: false
  }
};

const PaymentForm = ({ onSubmit }) => {
  const renderForm = () => (
    <Box>
      <Typography variant="h6" gutterBottom children="Payment method" />
      <Form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Field
              name="paymentDetails.cardName"
              label="Name on Card"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              name="paymentDetails.cardNumber"
              label="Card Number"
              component={InputField}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Field
              name="paymentDetails.expDate"
              label="Expiry Date"
              component={DatePickerField}
              variant="inline"
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
  onSubmit: PropTypes.func.isRequired
};

export default PaymentForm;
