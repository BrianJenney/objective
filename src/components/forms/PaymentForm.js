import React from 'react';
import PropTypes from 'prop-types';
import { isNaN } from 'lodash';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { InputField, SelectField, CheckboxField } from '../form-fields';
import { Button } from '../common';
import { COUNTRY_OPTIONS, STATE_OPTIONS } from '../../constants/location';
import {
  PAYMENT_METHODS,
  PAYMENT_METHOD_OPTIONS
} from '../../constants/payment';
import { getInitialValues } from '../../utils/misc';

const useStyles = makeStyles(() => ({
  noBorderField: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 0
    },
    '& .MuiInputLabel-shrink': {
      display: 'none'
    }
  }
}));

const validateTextField = value => {
  if (value) {
    return undefined;
  }
  return 'This field is required';
};

const validateNumberField = value => {
  if (!value) {
    return 'This field is required';
  }
  if (isNaN(Number(value))) {
    return 'This field should be a number';
  }
  return undefined;
};

const validateExpirationDateField = value => {
  const expirationDatePattern = /^(0[1-9]|10|11|12)\/20[0-9]{2}$/g;
  if (expirationDatePattern.test(value)) {
    return undefined;
  }
  return 'This field should be a valid date - MM/YYYY';
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
    phone: '',
    countryCode: 'US'
  },
  isDefault: false,
  shouldSaveData: true
};

const PaymentForm = ({
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
  const classes = useStyles();
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
      <Box position="relative">
        <Box
          component={Typography}
          color="#231f20"
          variant="h5"
          children="Credit Card"
          fontSize={30}
          mb={4}
        />
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
              <Grid item xs={12}>
                <Field
                  name="paymentDetails.cardholderName"
                  label="Name on Card"
                  component={InputField}
                  validate={validateTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="paymentDetails.number"
                  label="Card Number"
                  component={InputField}
                  validate={validateNumberField}
                  inputProps={{ style: { paddingRight: 214 } }}
                />
              </Grid>
              <Box position="absolute" width={100} top={136} right={100}>
                <Field
                  className={classes.noBorderField}
                  name="paymentDetails.expirationDate"
                  label="MM/YYYY"
                  component={InputField}
                  validate={validateExpirationDateField}
                />
              </Box>
              <Box position="absolute" width={66} top={136} right={14}>
                <Field
                  className={classes.noBorderField}
                  name="paymentDetails.cvv"
                  label="CVV"
                  component={InputField}
                  validate={validateNumberField}
                />
              </Box>
              {allowFlyMode && (
                <Grid item xs={12}>
                  <Field
                    name="shouldSaveData"
                    label="Save details in account"
                    component={CheckboxField}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Box
                  component={Typography}
                  color="#231f20"
                  variant="h5"
                  children="Billing Address"
                  fontSize={30}
                  mb={1}
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
                    <Typography
                      variant="body2"
                      children={useSeedLabel}
                      style={{ color: '#231f20' }}
                    />
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
                  label="Street Address"
                  component={InputField}
                  validate={validateTextField}
                  helperText="*No PO Boxes or APO/FPO addresses"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="billingAddress.line2"
                  label="Apt. suite, bldg, c/o (optional)"
                  component={InputField}
                />
              </Grid>
              <Grid item xs={12}>
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
                  label="State"
                  component={SelectField}
                  options={STATE_OPTIONS}
                  validate={validateTextField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="billingAddress.postalCode"
                  label="Zip Code"
                  component={InputField}
                  validate={validateTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="billingAddress.phone"
                  label="Phone #"
                  component={InputField}
                  helperText="In case we need to contact you about your order"
                  validate={validateTextField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="billingAddress.countryCode"
                  label="Country"
                  component={SelectField}
                  options={COUNTRY_OPTIONS}
                  disabled
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <ButtonGroup fullWidth>
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
      </Box>
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
