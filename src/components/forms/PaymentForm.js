import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isNaN } from 'lodash';
import { Formik, Field, Form } from 'formik';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { InputField, SelectField, CheckboxField } from '../form-fields';
import { Button, AlertPanel } from '../common';
import { COUNTRY_OPTIONS, STATE_OPTIONS } from '../../constants/location';
import {
  PAYMENT_METHODS,
  PAYMENT_METHOD_OPTIONS
} from '../../constants/payment';
import { getInitialValues, getErrorMessage } from '../../utils/misc';

const useStyles = makeStyles(() => ({
  noBorderField: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 0
    }
  }
}));

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const validateTextField = value => {
  if (value) {
    return undefined;
  }
  return 'This field is required';
};

const validateCardNumberField = values => {
  const { number, expirationDate, cvv } = values.paymentDetails;
  const expirationDatePattern = /^(0[1-9]|10|11|12)\/20[0-9]{2}$/g;
  if (!number) {
    return 'Card number is required';
  }
  if (isNaN(Number(number))) {
    return 'Card number should be a numeric value';
  }
  if (!expirationDatePattern.test(expirationDate)) {
    return 'Expiration date should be a valid date - MM/YYYY';
  }
  if (!cvv) {
    return 'CVV is required';
  }
  if (isNaN(Number(cvv))) {
    return 'CVV should be a numeric value';
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
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    country: 'US'
  },
  isDefault: false,
  shouldSaveData: true
};

const PaymentForm = ({
  currentUser,
  seedEnabled,
  addressSeed,
  useSeedLabel,
  defaultValues,
  clearPatchAccountError,
  onSubmit,
  onBack,
  onlyCard,
  submitLabel,
  backLabel,
  allowFlyMode
}) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
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
  const prevSubmitting = usePrevious(currentUser.patchAccountSubmitting);
  const errorMessage = getErrorMessage(currentUser.patchAccountError);

  useEffect(() => {
    clearPatchAccountError();
  }, []);

  useEffect(() => {
    if (
      prevSubmitting &&
      !currentUser.patchAccountSubmitting &&
      !currentUser.patchAccountError
    ) {
      onBack();
    }
  }, [currentUser.patchAccountSubmitting]);

  /* eslint-disable */
  const renderForm = ({ values, setValues }) => (
    <Form>
      <Box
        component={Typography}
        color="#231f20"
        variant="h5"
        children="Credit Card"
        fontSize={xs ? 24 : 30}
        mb={xs ? 3 : 4}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AlertPanel
            p={2}
            type="error"
            bgcolor="#ffcdd2"
            text={errorMessage}
            variant="subtitle2"
          />
        </Grid>
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
              <Box position="relative">
                <Field
                  name="paymentDetails.number"
                  label="Card Number"
                  component={InputField}
                  validate={() => validateCardNumberField(values)}
                  inputProps={{ style: { paddingRight: 214 } }}
                />
                <Box position="absolute" width={100} top={0} right={100}>
                  <Field
                    className={classes.noBorderField}
                    name="paymentDetails.expirationDate"
                    label="MM/YYYY"
                    component={InputField}
                  />
                </Box>
                <Box position="absolute" width={66} top={0} right={14}>
                  <Field
                    className={classes.noBorderField}
                    name="paymentDetails.cvv"
                    label="CVV"
                    component={InputField}
                  />
                </Box>
              </Box>
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
            <Grid item xs={12}>
              <Box
                component={Typography}
                color="#231f20"
                variant="h5"
                children="Billing Address"
                fontSize={xs ? 24 : 30}
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
                name="billingAddress.address1"
                label="Street Address"
                component={InputField}
                validate={validateTextField}
                helperText="*No PO Boxes or APO/FPO addresses"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="billingAddress.address2"
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
                name="billingAddress.zipcode"
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
                name="billingAddress.country"
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
  currentUser: PropTypes.object.isRequired,
  seedEnabled: PropTypes.bool,
  addressSeed: PropTypes.object,
  useSeedLabel: PropTypes.string,
  defaultValues: PropTypes.object,
  clearPatchAccountError: PropTypes.func.isRequired,
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
