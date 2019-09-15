import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isNil, isNaN } from 'lodash';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import {
  InputField,
  DatePickerField,
  SelectField,
  CheckboxField
} from '../form-fields';
import { Button } from '../common';
import { COUNTRY_OPTIONS } from '../../constants/location';
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
  paymentDetails: {
    paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
    cardholderName: 'Kevin C',
    number: '4111111111111111',
    expirationDate: '02/20/2023',
    cvv: '837'
  },
  billingAddress: {
    firstName: 'Kevin',
    lastName: 'Christian',
    line1: '1111 Sprng Street',
    line2: '',
    city: 'Raleigh',
    state: 'NC',
    postalCode: '22222',
    countryCode: 'US'
  },
  isDefault: false,
  shouldSaveData: true
};

const PaymentForm = ({
  title,
  seedEnabled,
  addressSeed,
  useSeedLabel,
  defaultValues,
  onSubmit,
  onBack,
  onlyCard,
  submitLabel,
  backLabel,
  allowFlyMode
}) => {
  const [initialValues, setInitialValues] = useState(
    getInitialValues(INITIAL_VALUES, defaultValues)
  );
  const handleUseAddressSeedToggle = event => {
    if (event.target.checked) {
      setInitialValues({
        ...initialValues,
        billingAddress: {
          ...initialValues.billingAddress,
          ...addressSeed
        }
      });
    } else {
      setInitialValues(getInitialValues(INITIAL_VALUES, defaultValues));
    }
  };

  /* eslint-disable */
  const renderForm = ({ values }) => (
    <Form>
      {title && <Typography variant="h6" gutterBottom children={title} />}
      <Grid container spacing={2}>
        {!onlyCard && (
          <Grid item xs={12}>
            <Field
              name="paymentDetails.paymentMethod"
              label="Payment Method"
              component={SelectField}
              options={PAYMENT_METHOD_OPTIONS}
              validate={validateTextField}
            />
          </Grid>
        )}
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
            {seedEnabled && (
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Checkbox
                    id="useAddressSeedToggle"
                    onChange={handleUseAddressSeedToggle}
                  />
                  <Typography children={useSeedLabel} />
                </Box>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Field
                name="billingAddress.firstName"
                label="First Name"
                component={InputField}
                validate={validateTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="billingAddress.lastName"
                label="Last Name"
                component={InputField}
                validate={validateTextField}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="billingAddress.line1"
                label="Address Line 1"
                component={InputField}
                validate={validateTextField}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="billingAddress.line2"
                label="Address Line 2"
                component={InputField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="billingAddress.city"
                label="City"
                component={InputField}
                validate={validateTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="billingAddress.state"
                label="State/Province/Region"
                component={InputField}
                validate={validateTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="billingAddress.postalCode"
                label="Zip/Postal Code"
                component={InputField}
                validate={validateTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="billingAddress.countryCode"
                label="Country"
                component={SelectField}
                options={COUNTRY_OPTIONS}
                validate={validateTextField}
              />
            </Grid>
            {allowFlyMode && (
              <Grid item xs={12}>
                <Field
                  name="shouldSaveData"
                  label="Save details in account"
                  component={CheckboxField}
                />
              </Grid>
            )}
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
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={renderForm}
      enableReinitialize
    />
  );
};

PaymentForm.propTypes = {
  title: PropTypes.string,
  seedEnabled: PropTypes.bool,
  addressSeed: PropTypes.object,
  useSeedLabel: PropTypes.string,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onlyCard: PropTypes.bool,
  submitLabel: PropTypes.string,
  backLabel: PropTypes.string,
  allowFlyMode: PropTypes.bool
};

PaymentForm.defaultProps = {
  seedEnabled: false,
  addressSeed: {},
  defaultValues: {},
  submitLabel: 'Save',
  backLabel: 'Cancel',
  allowFlyMode: false
};

export default PaymentForm;
