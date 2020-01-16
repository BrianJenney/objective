import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { get, omit } from 'lodash';
import { Formik, Field, Form } from 'formik';

import braintreeClient from 'braintree-web/client';
import HostedFields from 'braintree-web/hosted-fields';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
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
import {
  getInitialValues,
  getErrorMessage,
  scrollToRef
} from '../../utils/misc';

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
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
    zipcode: '     ',
    phone: '',
    country: 'US'
  },
  isDefault: false,
  shouldSaveData: true
};

const checkedFields = [
  'cardholderName',
  'number',
  'expirationDate',
  'cvv',
  'firstName',
  'lastName',
  'address1',
  'city',
  'state',
  'zipcode'
];
const formikFields = [
  'cardholderName',
  'firstName',
  'lastName',
  'address1',
  'city',
  'state',
  'zipcode'
];
const formikValueFieldsMap = {
  cardholderName: 'paymentDetails.cardholderName',
  firstName: 'billingAddress.firstName',
  lastName: 'billingAddress.lastName',
  address1: 'billingAddress.address1',
  city: 'billingAddress.city',
  state: 'billingAddress.state',
  zipcode: 'billingAddress.zipcode'
};
const validateRequiredField = value => {
  if (value) {
    return undefined;
  }
  return 'This field is required';
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
  const fieldRefs = {
    cardholderName: useRef(null),
    number: useRef(null),
    expirationDate: useRef(null),
    cvv: useRef(null),
    postalCode: useRef(null),
    firstName: useRef(null),
    lastName: useRef(null),
    address1: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zipcode: useRef(null)
  };
  const errRef = useRef(null);
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));

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
  const errorMessage = getErrorMessage(
    currentUser.patchAccountError,
    scrollToRef(errRef)
  );
  const [HostedFieldsClient, setHostedFieldsClient] = useState();

  useEffect(() => {
    try {
      braintreeClient.create(
        {
          authorization: process.env.REACT_APP_BRAINTREE_CLIENT_AUTHORIZATION
        },
        (clientErr, clientInstance) => {
          if (clientErr) {
            console.log(clientErr);
            // @TODO need to handle this gracefully
          }

          HostedFields.create(
            {
              client: clientInstance,
              styles: {
                input: {
                  'font-size': '18px',
                  'font-family': 'p22-underground, sans-serif',
                  'font-weight': 'lighter',
                  color: '#585858',
                  padding: '18.5px 14px'
                },
                ':focus': {
                  color: '#000'
                },
                '.valid': {
                  color: '#000'
                },
                '.invalid': {
                  color: '#000'
                },
                '::-webkit-input-placeholder': {
                  'font-size': '1rem'
                },
                ':-moz-placeholder': {
                  'font-size': '1rem'
                },
                '::-moz-placeholder': {
                  'font-size': '1rem'
                },
                ':-ms-input-placeholder': {
                  'font-size': '1rem'
                }
              },
              fields: {
                number: {
                  container: '#bt-cardNumber',
                  placeholder: 'Card Number'
                },
                expirationDate: {
                  container: '#bt-cardExpiration',
                  placeholder: 'MM/YYYY'
                },
                cvv: {
                  container: '#bt-cardCvv',
                  placeholder: 'CVV'
                },
                postalCode: {
                  container: '#bt-cardZipCode',
                  placeholder: 'Zip Code'
                }
              }
            },
            (hostedFieldsErr, hostedFieldsInstance) => {
              if (hostedFieldsErr) {
                console.log(hostedFieldsErr);
                // @TODO need to handle this gracefully
              }
              hostedFieldsInstance.on('blur', function (event) {
                const field = event.fields[event.emittedBy];
                if (field.isValid) {
                  field.container.nextElementSibling.style.display = 'none';
                  document.getElementById('bt-payment-holder').style.border =
                    '1px solid rgba(0, 0, 0, 0.23)';
                } else {
                  document.getElementById('bt-payment-holder').style.border =
                    '1px solid #C10230';
                  field.container.nextElementSibling.style.display = 'block';
                }
              });
              hostedFieldsInstance.on('validityChange', function (event) {
                const field = event.fields[event.emittedBy];
                if (field.isPotentiallyValid) {
                  field.container.nextElementSibling.style.display = 'none';
                  document.getElementById('bt-payment-holder').style.border =
                    '1px solid rgba(0, 0, 0, 0.23)';
                } else {
                  document.getElementById('bt-payment-holder').style.border =
                    '1px solid #C10230';
                  field.container.nextElementSibling.style.display = 'block';
                }
              });
              setHostedFieldsClient(hostedFieldsInstance);
              return null;
            }
          );
        }
      );
    } catch (err) {
      throw err;
    }
  }, []);

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

  const handleSubmit = async (values, actions) => {
    const fieldErrors = {
      paymentDetails: {},
      billingAddress: {}
    };
    let isHostedFieldInvalid = false;
    const hostedFieldState = HostedFieldsClient._state;
    Object.keys(hostedFieldState.fields).forEach(function (field) {
      if (!hostedFieldState.fields[field].isValid) {
        const elem = hostedFieldState.fields[field];
        document.getElementById('bt-payment-holder').style.border =
          '1px solid #C10230';
        elem.container.nextElementSibling.style.display = 'block';
        fieldErrors[field] = 'This field is invalid';
        isHostedFieldInvalid = true;
      } else {
        fieldErrors[field] = undefined;
      }
    });
    formikFields.forEach(requiredField => {
      if (requiredField === 'cardholderName') {
        fieldErrors.paymentDetails[requiredField] = validateRequiredField(
          values.paymentDetails[requiredField]
        );
      } else {
        fieldErrors.billingAddress[requiredField] = validateRequiredField(
          values.billingAddress[requiredField]
        );
      }
    });
    actions.setErrors(omit(fieldErrors, ['number', 'expirationDate', 'cvv']));

    const firstInvalidField = checkedFields.find(field => {
      if (formikFields.includes(field)) {
        return !!get(fieldErrors, formikValueFieldsMap[field]);
      }
      return !!fieldErrors[field];
    });

    if (firstInvalidField) {
      actions.setSubmitting(false);
      return scrollToRef(fieldRefs[firstInvalidField]);
    }
    if (isHostedFieldInvalid) {
      actions.setSubmitting(false);
      return;
    }
    const cardData = await HostedFieldsClient.tokenize({
      cardholderName: values.paymentDetails.cardholderName
    });
    const payload = {
      ...values,
      cardData,
      billingAddress: {
        ...values.billingAddress,
        phone: values.billingAddress.phone
          ? values.billingAddress.phone.trim()
          : ''
      }
    };
    onSubmit(payload, actions);
  };

  /* eslint-disable */
  const renderForm = ({ values, setValues, isSubmitting }) => (
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
          <div ref={errRef}>
            <AlertPanel
              py={2}
              px={4}
              type="error"
              bgcolor="#ffcdd2"
              text={errorMessage}
              variant="subtitle2"
            />
          </div>
        </Grid>
        {!onlyCard && (
          <Grid item xs={12}>
            <Field
              name="paymentDetails.paymentMethod"
              label="Payment Method"
              component={SelectField}
              options={PAYMENT_METHOD_OPTIONS}
            />
          </Grid>
        )}
        {values.paymentDetails.paymentMethod ===
          PAYMENT_METHODS.CREDIT_CARD && (
            <>
              <Grid item xs={12}>
                <div ref={fieldRefs.cardholderName}>
                  <Field
                    name="paymentDetails.cardholderName"
                    label="Name on Card"
                    component={InputField}
                    autoComplete="name"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Box
                  position="relative"
                  className="bt-payment-holder"
                  id="bt-payment-holder"
                >
                  <Grid item xs={6}>
                    <div id="bt-cardNumber" ref={fieldRefs.number} />
                    <div className="btError">Please enter valid card number</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div
                      id="bt-cardExpiration"
                      ref={fieldRefs.expirationDate}
                    />
                    <div className="btError">Please enter valid Exp. Date</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div id="bt-cardCvv" ref={fieldRefs.cvv} />
                    <div className="btError">Please enter valid CVV</div>
                  </Grid>
                  <Grid item xs={2}>
                    <div id="bt-cardZipCode" ref={fieldRefs.postalCode} />
                    <div className="btError">Please enter valid Zip Code</div>
                  </Grid>
                </Box>
              </Grid>
              {allowFlyMode && (
                <Grid item xs={12} style={{ marginTop: '25px' }}>
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
                <div ref={fieldRefs.firstName}>
                  <Field
                    name="billingAddress.firstName"
                    label="First Name"
                    component={InputField}
                    autoComplete="given-name"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div ref={fieldRefs.lastName}>
                  <Field
                    name="billingAddress.lastName"
                    label="Last Name"
                    component={InputField}
                    autoComplete="family-name"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div ref={fieldRefs.address1}>
                  <Field
                    name="billingAddress.address1"
                    label="Street Address"
                    component={InputField}
                    autoComplete="address-line1"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <Field
                    name="billingAddress.address2"
                    label="Apt. suite, bldg, c/o (optional)"
                    component={InputField}
                    autoComplete="address-line2"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div ref={fieldRefs.city}>
                  <Field
                    name="billingAddress.city"
                    label="City"
                    component={InputField}
                    autoComplete="address-level2"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div ref={fieldRefs.state}>
                  <Field
                    name="billingAddress.state"
                    label="State"
                    component={SelectField}
                    options={STATE_OPTIONS}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="billingAddress.phone"
                  label="Phone #"
                  component={InputField}
                  helperText="In case we need to contact you about your order"
                  type="tel"
                  autoComplete="tel"
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
            <Button
              type="submit"
              children={submitLabel}
              loading={isSubmitting}
            />
          </ButtonGroup>
        </Grid>
      </Grid>
    </Form>
  );
  /* eslint-enable */

  return (
    <Formik
      initialValues={getInitialValues(INITIAL_VALUES, defaultValues)}
      onSubmit={handleSubmit}
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
