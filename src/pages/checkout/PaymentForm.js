import React from 'react';
import PropTypes from 'prop-types';
import { isNil, isNaN } from 'lodash';
import { Formik, Field, Form } from 'formik';
import { Box, Grid, Typography } from '@material-ui/core';
import {
  InputField,
  CheckboxField,
  DatePickerField,
  SelectField
} from '../../components/form-fields';
import { Button } from '../../components/common';
import {
  PAYMENT_METHODS,
  PAYMENT_METHOD_OPTIONS
} from '../../constants/payment';

const validateTextField = value => {
  if (value) {
    return undefined;
  }
  return 'This field is required';
};

const validateNumberField = value => {
  if (isNil(value) || value === '') {
    return 'This field is required';
  }
  if (isNaN(value)) {
    return 'This field should be a number';
  }
  return undefined;
};

const INITIAL_VALUES = {
  paymentDetails: {
    paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
    cardholderName: 'Kevin C',
    number: '4111111111111111',
    expirationDate: '02/20/2023',
    cvv: '837',
    saveCard: true
  }
};

const PaymentForm = ({ onSubmit, onBack }) => {
  /* eslint-disable */
  const renderForm = ({ values }) => (
    <Box>
      <Typography variant="h6" gutterBottom children="Payment details" />
      <Form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Field
              name="paymentDetails.paymentMethod"
              label="Payment Method"
              component={SelectField}
              options={PAYMENT_METHOD_OPTIONS}
              validate={validateTextField}
            />
          </Grid>
          {values.paymentDetails.paymentMethod ===
            PAYMENT_METHODS.CREDIT_CARD && (
            <>
              <Grid item xs={12} md={6}>
                <Field
                  name="paymentDetails.cardholderName"
                  label="Name on Card"
                  component={InputField}
                  validate={validateTextField}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="paymentDetails.number"
                  label="Card Number"
                  component={InputField}
                  validate={validateNumberField}
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
                  validate={validateNumberField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="paymentDetails.saveCard"
                  label="Remember credit card details for next time"
                  component={CheckboxField}
                />
              </Grid>
            </>
          )}
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
  /* eslint-enable */

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={onSubmit}
      render={renderForm}
    />
  );
};

PaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default PaymentForm;
