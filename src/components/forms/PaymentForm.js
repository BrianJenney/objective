import React from 'react';
import PropTypes from 'prop-types';
import { isNil, isNaN } from 'lodash';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { InputField, SelectField, CheckboxField } from '../form-fields';
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
    cardholderName: '',
    number: '',
    expirationDate: '',
    cvv: ''
  },
  billingAddress: {
    firstName: '',
    lastName: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    countryCode: ''
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
  const handleUseAddressSeedToggle = (event, values, setValues) => {
    if (event.target.checked) {
      setValues({
        ...values,
        billingAddress: {
          ...values.billingAddress,
          ...addressSeed
        }
      });
    } else {
      setValues({
        ...values,
        billingAddress: {
          ...INITIAL_VALUES.billingAddress
        }
      });
    }
  };

  /* eslint-disable */
  const renderForm = ({ values, setValues }) => (
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
                label="Expiry Date"
                component={InputField}
                validate={validateTextField}
                placeholder="MM/DD/YYYY"
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
                    onChange={evt =>
                      handleUseAddressSeedToggle(evt, values, setValues)
                    }
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
          <ButtonGroup fullWidth aria-label="full width button group">
            {onBack && (
              <Button
                color="secondary"
                type="button"
                onClick={onBack}
                children={backLabel}
                mr={2}
              />
            )}
            <Button type="submit" children={submitLabel} />
          </ButtonGroup>
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
