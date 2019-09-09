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
} from '../form-fields';
import { Button } from '../common';
import {
  PAYMENT_METHODS,
  PAYMENT_METHOD_OPTIONS
} from '../../constants/payment';
import { getInitialValues } from '../../utils/misc';

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
  paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
  cardholderName: 'Kevin C',
  number: '4111111111111111',
  expirationDate: '02/20/2023',
  cvv: '837',
  saveCard: true
};

const PaymentForm = ({
  title,
  defaultValues,
  onSubmit,
  onBack,
  onlyCard,
  submitLabel,
  backLabel
}) => {
  /* eslint-disable */
  const renderForm = ({ values }) => (
    <Form>
      {title && <Typography variant="h6" gutterBottom children={title} />}
      <Grid container spacing={2}>
        {!onlyCard && (
          <Grid item xs={12}>
            <Field
              name="paymentMethod"
              label="Payment Method"
              component={SelectField}
              options={PAYMENT_METHOD_OPTIONS}
              validate={validateTextField}
            />
          </Grid>
        )}
        {values.paymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
          <>
            <Grid item xs={12} md={6}>
              <Field
                name="cardholderName"
                label="Name on Card"
                component={InputField}
                validate={validateTextField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="number"
                label="Card Number"
                component={InputField}
                validate={validateNumberField}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                name="expirationDate"
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
                name="cvv"
                label="CVV"
                component={InputField}
                validate={validateNumberField}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="saveCard"
                label="Remember credit card details for next time"
                component={CheckboxField}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
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
  /* eslint-enable */

  return (
    <Formik
      initialValues={getInitialValues(INITIAL_VALUES, defaultValues)}
      onSubmit={onSubmit}
      render={renderForm}
    />
  );
};

PaymentForm.propTypes = {
  title: PropTypes.string,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onlyCard: PropTypes.bool,
  submitLabel: PropTypes.string,
  backLabel: PropTypes.string
};

PaymentForm.defaultProps = {
  defaultValues: {},
  submitLabel: 'Save',
  backLabel: 'Cancel'
};

export default PaymentForm;
