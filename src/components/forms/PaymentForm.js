import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { get, omit } from 'lodash';
import { Formik, Field, Form } from 'formik';

import braintreeClient from 'braintree-web/client';
import HostedFields from 'braintree-web/hosted-fields';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { InputField, SelectField, CheckboxField, RadioGroupField } from '../form-fields';
import { Button, AlertPanel, NavLink } from '../common';
import { COUNTRY_OPTIONS, STATE_OPTIONS, STATE_OPTIONS_ABBR } from '../../constants/location';
import { PAYMENT_METHODS, PAYMENT_METHOD_OPTIONS } from '../../constants/payment';
import { getInitialValues, getErrorMessage, scrollToRef } from '../../utils/misc';
import { sendPaypalCheckoutRequest } from '../../utils/braintree';
import { setCheckoutPaypalPayload } from '../../modules/paypal/actions';
import { useDispatch, useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '26px',
    fontFamily: 'Canela Text Web'
  },
  mobileTitle: {
    fontSize: '24px',
    fontFamily: 'FreightTextProBook'
  },
  subTitle: {
    textAlign: 'right',
    fontSize: '16px',
    fontWeight: 'normal',
    fontFamily: 'p22-underground, Helvetica, sans-serif',
    marginLeft: 'auto',
    lineHeight: '1.2rem',
    marginBottom: '16px',
    marginTop: '8px'
  },
  formControlLabel: {
    fontSize: '20px',
    fontFamily: 'p22-underground',
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px'
    }
  },
  mobileLogin: {
    fontSize: '16px',
    fontFamily: 'p22-underground'
  },
  root: {
    '& .MuiInputLabel-root': {
      fontSize: '16px'
    },
    '& .MuiInputBase-root': {
      fontSize: '16px',
      marginBottom: '10px'
    },
    '& .MuiFormHelperText-root': {
      fontSize: '11px',
      color: '#231f20',
      marginTop: '-8px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#231f20'
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
    country: 'US',
    password: ''
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
  'zipcode',
  'password'
];
const formikFields = ['cardholderName', 'firstName', 'lastName', 'address1', 'city', 'state', 'zipcode', 'password'];
const formikValueFieldsMap = {
  cardholderName: 'paymentDetails.cardholderName',
  firstName: 'billingAddress.firstName',
  lastName: 'billingAddress.lastName',
  address1: 'billingAddress.address1',
  city: 'billingAddress.city',
  state: 'billingAddress.state',
  zipcode: 'billingAddress.zipcode',
  password: 'billingAddress.password'
};
const validateRequiredField = (value, field = false) => {
  if (field === 'password') {
    if (value && value.length && value.length < 6) {
      return 'Password must be atleast 6 characters';
    }
    //Make password optional if no value is supplied
    if (!value) {
      return undefined;
    }
  }
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
  allowFlyMode,
  ...rest
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
    zipcode: useRef(null),
    password: useRef(null)
  };
  const errRef = useRef(null);
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();
  const paypalPayloadState = useSelector(state => state.paypal);
  const paypalEmail =
    Object.keys(paypalPayloadState).length > 0 && paypalPayloadState.details && paypalPayloadState.details.email
      ? paypalPayloadState.details.email
      : false;
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

  const [billingAddressMode, setBillingAddressMode] = useState('sameAsShipping');
  const [paymentMethodMode, setPaymentMethodMode] = useState('creditCard');
  const [initialRender, setInitialRender] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [ppButtonRendered, setPpButtonRendered] = useState(false);
  const togglePasswordVisibility = useCallback(
    event => {
      event.preventDefault();
      setPasswordVisible(!passwordVisible);
    },
    [passwordVisible, setPasswordVisible]
  );

  const prevSubmitting = usePrevious(currentUser.patchAccountSubmitting);
  const errorMessage = getErrorMessage(currentUser.patchAccountError);

  const handleSetBillingAddressMode = (event, values, setValues) => {
    if (event.target.value === 'sameAsShipping') {
      handleUseAddressSeedToggle({ target: { checked: true } }, values, setValues);
    } else {
      handleUseAddressSeedToggle({ target: { checked: false } }, values, setValues);
    }

    setBillingAddressMode(event.target.value);
  };

  useEffect(() => {
    if (paypalEmail) {
      setPaymentMethodMode('paypal');
    }
  }, [paypalPayloadState]);
  useEffect(() => {
    if (errorMessage) {
      scrollToRef(errRef);
    }
  }, [currentUser.patchAccountError]);

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
                  'font-size': rest.checkoutVersion && rest.checkoutVersion === 2 ? '16px' : '18px',
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
                  'font-size': rest.checkoutVersion && rest.checkoutVersion === 2 ? '16px' : '1rem'
                },
                ':-moz-placeholder': {
                  'font-size': rest.checkoutVersion && rest.checkoutVersion === 2 ? '16px' : '1rem'
                },
                '::-moz-placeholder': {
                  'font-size': rest.checkoutVersion && rest.checkoutVersion === 2 ? '16px' : '1rem'
                },
                ':-ms-input-placeholder': {
                  'font-size': rest.checkoutVersion && rest.checkoutVersion === 2 ? '16px' : '1rem'
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
                }
              }
            },
            (hostedFieldsErr, hostedFieldsInstance) => {
              if (hostedFieldsErr) {
                console.log(hostedFieldsErr);
                // @TODO need to handle this gracefully
              }
              hostedFieldsInstance.on('blur', function(event) {
                const field = event.fields[event.emittedBy];
                if (field.isValid) {
                  field.container.nextElementSibling.style.display = 'none';
                  document.getElementById('bt-payment-holder').style.border = '1px solid rgba(0, 0, 0, 0.23)';
                } else {
                  document.getElementById('bt-payment-holder').style.border = '1px solid #C10230';
                  field.container.nextElementSibling.style.display = 'block';
                }
              });
              hostedFieldsInstance.on('validityChange', function(event) {
                const field = event.fields[event.emittedBy];
                if (field.isPotentiallyValid) {
                  field.container.nextElementSibling.style.display = 'none';
                  document.getElementById('bt-payment-holder').style.border = '1px solid rgba(0, 0, 0, 0.23)';
                } else {
                  document.getElementById('bt-payment-holder').style.border = '1px solid #C10230';
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
    if (prevSubmitting && !currentUser.patchAccountSubmitting && !currentUser.patchAccountError) {
      onBack();
    }
  }, [currentUser.patchAccountSubmitting]);

  if (currentUser.data.account_jwt) {
    delete checkedFields[checkedFields.findIndex(field => field === 'password')];
    delete formikFields[checkedFields.findIndex(field => field === 'password')];
    delete formikValueFieldsMap.password;
    delete INITIAL_VALUES.billingAddress.password;
  }
  const handleSubmit = async (values, actions) => {
    const fieldErrors = {
      paymentDetails: {},
      billingAddress: {}
    };
    const isGuest = currentUser.data.isGuest && currentUser.data.isGuest ? currentUser.data.isGuest : false;
    if (isGuest) {
      values.shouldSaveData = false;
    }
    if (paypalEmail && paymentMethodMode === 'paypal') {
      onSubmit(false, actions);
      return;
    }
    let isHostedFieldInvalid = false;
    const hostedFieldState = HostedFieldsClient._state;
    Object.keys(hostedFieldState.fields).forEach(function(field) {
      if (!hostedFieldState.fields[field].isValid) {
        const elem = hostedFieldState.fields[field];
        document.getElementById('bt-payment-holder').style.border = '1px solid #C10230';
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
          values.paymentDetails[requiredField],
          requiredField
        );
      } else {
        //If password field is empty, disregard. This makes the password optional
        if (
          requiredField === 'password' &&
          values.billingAddress[requiredField] &&
          values.billingAddress[requiredField].length === 0
        ) {
        } else {
          fieldErrors.billingAddress[requiredField] = validateRequiredField(
            values.billingAddress[requiredField],
            requiredField
          );
        }
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
      cardholderName: values.paymentDetails.cardholderName,
      billingAddress: {
        postalCode: values.billingAddress.zipcode
      }
    });
    const payload = {
      ...values,
      cardData,
      billingAddress: {
        ...values.billingAddress,
        phone: values.billingAddress.phone ? values.billingAddress.phone.trim() : ''
      }
    };
    onSubmit(payload, actions);
  };

  const getPaypalBraintreeNonce = async () => {
    if (!rest.cart) {
      return null;
    }
    const { total, shippingAddress } = rest.cart;
    if (!rest.cart || total === 0 || document.getElementById('paypal-checkout-button-payment-form') === null) {
      return null;
    }
    setPpButtonRendered(true);
    const paypalRequest = await sendPaypalCheckoutRequest(
      total,
      shippingAddress,
      {
        label: 'checkout',
        shape: 'rect',
        color: 'gold',
        height: 55,
        size: 'responsive',
        tagline: 'false'
      },
      '#paypal-checkout-button-payment-form'
    );

    dispatch(setCheckoutPaypalPayload(paypalRequest));
  };

  if (!ppButtonRendered && rest.cart) {
    getPaypalBraintreeNonce();
  }

  useEffect(() => {
    if (ppButtonRendered && rest.cart && rest.cart.total > 0) {
      let paypalCheckoutButton = document.getElementById('paypal-checkout-button-payment-form');
      paypalCheckoutButton.innerHTML = '';
      getPaypalBraintreeNonce();
    }
  }, [rest.cart]);

  const preRenderBillingAddress = (values, setValues) => {
    if (
      !initialRender &&
      billingAddressMode === 'sameAsShipping' &&
      Object.keys(addressSeed).length > 0 &&
      seedEnabled &&
      rest.checkoutVersion &&
      rest.checkoutVersion === 2
    ) {
      handleSetBillingAddressMode({ target: { value: 'sameAsShipping' } }, values, setValues);
      setInitialRender(true);
    }
  };
  /* eslint-disable */
  const renderForm = ({ values, setValues, isSubmitting }) => {
    preRenderBillingAddress(values, setValues);
    return (
      <Form className={rest.checkoutVersion && rest.checkoutVersion === 2 ? classes.root : ''}>
        {rest.checkoutVersion && rest.checkoutVersion === 2 && (
          <Box display="block" mb={xs ? 1 : 2} className="justify-content">
            <Typography
              color="#231f20"
              variant="h5"
              fontSize={xs ? 24 : 30}
              className={xs ? classes.mobileTitle : classes.title}
            >
              Secure Payment
            </Typography>

            <Box>
              <Typography
                variant="body1"
                className={xs ? classes.mobileLogin : classes.subTitle}
                style={{ textAlign: 'left', margin: '0px', lineHeight: '2.3rem' }}
              >
                All transactions are secure and encrypted
              </Typography>
            </Box>
          </Box>
        )}
        {!allowFlyMode && (
          <Box
            component={Typography}
            color="#231f20"
            variant="h5"
            children="Credit Card"
            fontSize={xs ? 24 : 30}
            mb={xs ? 3 : 4}
          />
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div ref={errRef}>
              <AlertPanel py={2} px={4} type="error" bgcolor="#ffcdd2" text={errorMessage} variant="subtitle2" />
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

          {allowFlyMode && (
            <FormControlLabel
              style={{ marginLeft: '-6px' }}
              key="formControlLabelCreditCardMode"
              value="creditCard"
              control={<Radio color={'primary'} size={'small'} />}
              label="Credit Card"
              classes={{ label: classes.formControlLabel }}
              onClick={evt => {
                setPaymentMethodMode(evt.target.value);
              }}
              checked={paymentMethodMode === 'creditCard'}
            />
          )}

          {values.paymentDetails.paymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
            <>
              <Grid item xs={12} style={{ display: paymentMethodMode === 'creditCard' ? 'block' : 'none' }}>
                <div ref={fieldRefs.cardholderName}>
                  <Field
                    name="paymentDetails.cardholderName"
                    label="Name on Card"
                    component={InputField}
                    autoComplete="name"
                  />
                </div>
              </Grid>
              <Grid item xs={12} style={{ display: paymentMethodMode === 'creditCard' ? 'block' : 'none' }}>
                <Box
                  position="relative"
                  className="bt-payment-holder"
                  id="bt-payment-holder"
                  style={rest.checkoutVersion && rest.checkoutVersion === 2 ? { border: '1px solid #231f20' } : {}}
                >
                  <Grid item xs={6}>
                    <div id="bt-cardNumber" ref={fieldRefs.number} />
                    <div className="btError">Please enter valid card number</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div id="bt-cardExpiration" ref={fieldRefs.expirationDate} />
                    <div className="btError">Please enter valid Exp. Date</div>
                  </Grid>
                  <Grid item xs={3}>
                    <div id="bt-cardCvv" ref={fieldRefs.cvv} />
                    <div className="btError">Please enter valid CVV</div>
                  </Grid>
                </Box>
              </Grid>
              {allowFlyMode && (
                <>
                  <Grid
                    item
                    xs={12}
                    style={
                      rest.checkoutVersion && rest.checkoutVersion === 2
                        ? { marginTop: '8px', paddingLeft: '3px', padding: '0px' }
                        : {}
                    }
                  >
                    {paymentMethodMode === 'creditCard' && (
                      <Field
                        name="shouldSaveData"
                        label={
                          rest.checkoutVersion && rest.checkoutVersion === 2
                            ? 'Save as default card'
                            : 'Save details in account'
                        }
                        component={CheckboxField}
                        style={rest.checkoutVersion && rest.checkoutVersion === 2 ? { paddingLeft: '3px' } : {}}
                      />
                    )}
                  </Grid>

                  <FormControlLabel
                    key="formControlLabelPayPalMode"
                    style={{ marginLeft: '-6px' }}
                    value="paypal"
                    control={<Radio color={'primary'} size={'small'} />}
                    label={paypalEmail ? `PayPal: ${paypalEmail}` : 'PayPal'}
                    classes={{ label: classes.formControlLabel }}
                    onClick={evt => {
                      setPaymentMethodMode(evt.target.value);
                    }}
                    checked={paymentMethodMode === 'paypal'}
                  />
                </>
              )}

              <Grid item xs={12} style={{ display: paymentMethodMode === 'paypal' && !paypalEmail ? 'block' : 'none' }}>
                <Box>
                  <Typography
                    variant="body1"
                    className={xs ? classes.mobileLogin : classes.subTitle}
                    style={{ textAlign: 'left', margin: '0px' }}
                  >
                    Click below to continue with PayPal
                  </Typography>
                </Box>
                <Grid container style={{ marginTop: '11px' }}>
                  <div id="paypal-checkout-button-payment-form" style={{ width: '100%' }}></div>
                </Grid>
              </Grid>

              {paymentMethodMode === 'creditCard' && (
                <Grid item xs={12} style={{ marginTop: '10px', marginBottom: xs ? '0px' : '8px' }}>
                  <Box
                    component={Typography}
                    color="#231f20"
                    variant="h5"
                    children="Billing Address"
                    style={{ fontFamily: 'CanelaText' }}
                    fontSize={xs ? 24 : 30}
                    mb={xs ? 0 : 1}
                    mt={1}
                  />
                </Grid>
              )}
              {seedEnabled && paymentMethodMode === 'creditCard' && rest.checkoutVersion && rest.checkoutVersion === 2 && (
                <Grid item xs={12}>
                  <Box>
                    <RadioGroup
                      id="toggleBillingAddressFormMode"
                      onChange={evt => {
                        handleSetBillingAddressMode(evt, values, setValues);
                      }}
                      value={billingAddressMode}
                    >
                      <FormControlLabel
                        key="formControlLabelSameAsShipping"
                        value="sameAsShipping"
                        control={<Radio color={'primary'} size={'small'} />}
                        label="Same as shipping address"
                        classes={{ label: classes.formControlLabel }}
                      />
                      <FormControlLabel
                        key="formControlLabelDifferentShipping"
                        value="differentShipping"
                        control={<Radio color={'primary'} size={'small'} />}
                        label="Use a different billing address"
                        classes={{ label: classes.formControlLabel }}
                      />
                    </RadioGroup>
                  </Box>
                </Grid>
              )}
              {seedEnabled &&
                paymentMethodMode === 'creditCard' &&
                (!rest.checkoutVersion || (rest.checkoutVersion && rest.checkoutVersion === 1)) && (
                  <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        id="useAddressSeedToggle"
                        onChange={evt => handleUseAddressSeedToggle(evt, values, setValues)}
                      />
                      <Typography variant="body2" children={useSeedLabel} style={{ color: '#231f20' }} />
                    </Box>
                  </Grid>
                )}

              {((billingAddressMode === 'differentShipping' && paymentMethodMode === 'creditCard') ||
                !rest.checkoutVersion ||
                (rest.checkoutVersion && rest.checkoutVersion === 1)) && (
                <>
                  <Grid item xs={rest.checkoutVersion && rest.checkoutVersion === 2 ? 6 : 12} sm={6}>
                    <div ref={fieldRefs.firstName}>
                      <Field
                        name="billingAddress.firstName"
                        label="First Name"
                        component={InputField}
                        autoComplete="given-name"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={rest.checkoutVersion && rest.checkoutVersion === 2 ? 6 : 12} sm={6}>
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
                        helperText={
                          rest.checkoutVersion && rest.checkoutVersion === 2
                            ? '*No PO Boxes or APO/FPO addresses'
                            : false
                        }
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
                  <Grid item xs={12} sm={rest.checkoutVersion && rest.checkoutVersion === 2 ? 6 : false}>
                    <div ref={fieldRefs.city}>
                      <Field
                        name="billingAddress.city"
                        label="City"
                        component={InputField}
                        autoComplete="address-level2"
                      />
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={rest.checkoutVersion && rest.checkoutVersion === 2 ? 6 : 12}
                    sm={rest.checkoutVersion && rest.checkoutVersion === 2 ? 2 : 6}
                  >
                    <div ref={fieldRefs.state}>
                      <Field
                        name="billingAddress.state"
                        label="State"
                        component={SelectField}
                        options={
                          rest.checkoutVersion && rest.checkoutVersion === 2 ? STATE_OPTIONS_ABBR : STATE_OPTIONS
                        }
                      />
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={rest.checkoutVersion && rest.checkoutVersion === 2 ? 6 : 12}
                    sm={rest.checkoutVersion && rest.checkoutVersion === 2 ? 4 : 6}
                  >
                    <div ref={fieldRefs.zipcode}>
                      <Field
                        name="billingAddress.zipcode"
                        label="Zip Code"
                        component={InputField}
                        autoComplete="postal-code"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="billingAddress.phone"
                      label="Phone #"
                      component={InputField}
                      helperText="In case we need to contact you about your order"
                      type="tel"
                      autoComplete="tel"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={rest.checkoutVersion && rest.checkoutVersion === 2 ? { display: 'none' } : {}}
                  >
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
              {!currentUser.data.account_jwt && paymentMethodMode === 'creditCard' && (
                <>
                  <Grid item xs={12} style={{ marginBottom: '10px' }}>
                    <Box
                      component={Typography}
                      color="#231f20"
                      variant="h5"
                      children="Easy order status and snappy checkout"
                      fontSize={xs ? 24 : 26}
                      mb={1}
                      mt={xs ? 2 : 3}
                    />
                    <Typography
                      variant="p"
                      children="For faster checkout next time, create a password (optional)"
                      className={classes.subTitle}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: '40px' }}>
                    <div ref={fieldRefs.password}>
                      <Field
                        name="billingAddress.password"
                        label="Password"
                        component={InputField}
                        type={passwordVisible ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <Box width={1} textAlign="right">
                              <NavLink
                                style={{
                                  fontFamily: 'P22-underground',
                                  fontSize: '12px'
                                }}
                                type="button"
                                underline="always"
                                onClick={event => togglePasswordVisibility(event)}
                                children={passwordVisible ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}
                              />
                            </Box>
                          )
                        }}
                        autoComplete="current-password"
                      />
                    </div>
                  </Grid>
                </>
              )}
            </>
          )}
          <Grid item xs={12}>
            <ButtonGroup fullWidth>
              {onBack && currentUser.data.paymentMethods && currentUser.data.paymentMethods.length > 0 && (
                <Button
                  style={{ height: '55px', padding: '0px' }}
                  color="secondary"
                  type="button"
                  onClick={onBack}
                  children={backLabel}
                  mr={2}
                />
              )}
              <Button
                style={{
                  height: '55px',
                  padding: '0px',
                  display:
                    paymentMethodMode === 'creditCard' || (paymentMethodMode === 'paypal' && paypalEmail)
                      ? 'block'
                      : 'none'
                }}
                type="submit"
                children={submitLabel}
                loading={isSubmitting}
              />
            </ButtonGroup>
          </Grid>
        </Grid>
      </Form>
    );
  };
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
