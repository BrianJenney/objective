import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { get, omit } from 'lodash';
import { Formik, Field, Form } from 'formik';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { InputField, SelectField, CheckboxField } from '../form-fields';
import { Button, AlertPanel, NavLink, MenuLink } from '../common';
import { COUNTRY_OPTIONS, STATE_OPTIONS, STATE_OPTIONS_ABBR } from '../../constants/location';
import { getInitialValues, getErrorMessage, scrollToRef } from '../../utils/misc';
import { validateAddress } from '../../apis/SmartyStreets';
import AddressValidation from '../account/AddressValidation';

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
    fontFamily: 'p22-underground, Helvetica, sans-serif'
  },
  subTitleLink: {
    fontWeight: 600,
    marginLeft: '5px'
  },
  mobileLogin: {
    fontFamily: 'P22-Underground',
    fontSize: '14px',
    fontWeight: 'normal'
  },
  mobileBox: {},
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
      color: '#7f7470',
      lineHeight: '14px',
      marginTop: '-8px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.brand.accentBrown
    },
    '& .MuiCheckbox-root': {
      padding: '3px'
    }
  }
}));

export const FORM_TYPES = {
  ACCOUNT: 'account',
  CHECKOUT: 'checkout'
};

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

let INITIAL_VALUES = {
  address: {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    country: 'US',
    email: '',
    shouldSubscribe: true
  },
  isDefault: false,
  shouldSaveData: true
};
const emptyForm = INITIAL_VALUES;
const checkedFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zipcode', 'email'];
const formikFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zipcode', 'email'];
const formikValueFieldsMap = {
  firstName: 'address.firstName',
  lastName: 'address.lastName',
  address1: 'address.address1',
  city: 'address.city',
  state: 'address.state',
  zipcode: 'address.zipcode',
  email: 'address.email'
};
const validateRequiredField = value => {
  if (value) {
    return undefined;
  }
  return 'This field is required';
};

const AddressForm = ({
  currentUser,
  formType,
  isEditing,
  seedEnabled,
  addressSeed,
  useSeedLabel,
  defaultValues,
  clearPatchAccountError,
  onSubmit,
  onBack,
  submitLabel,
  backLabel,
  allowFlyMode,
  ...rest
}) => {
  const fieldRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    address1: useRef(null),
    city: useRef(null),
    state: useRef(null),
    zipcode: useRef(null),
    email: useRef(null)
  };
  const errRef = useRef(null);
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [initialValues, setInitialValues] = useState(
    getInitialValues(INITIAL_VALUES, defaultValues)
  );
  const [addressSuggestionEnabled, setAddressSuggestion] = useState(false);
  const [originalAddress, setOriginalAddress] = useState(null);
  const [suggestedAddress, setSuggestedAddress] = useState(null);
  const [formActions, setFormActions] = useState(null);
  // Edit form with current input
  if (isEditing && defaultValues) {
    const {
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zipcode,
      phone,
      country,
      isDefault,
      email
    } = defaultValues;

    INITIAL_VALUES = {
      address: {
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zipcode,
        phone,
        country,
        email,
        shouldSubscribe: true
      },
      isDefault,
      shouldSaveData: true
    };
  }
  if (!isEditing) {
    INITIAL_VALUES = emptyForm;
  }
  // If user is logged in, do not require email
  if (currentUser.data.account_jwt) {
    delete checkedFields[checkedFields.findIndex(field => field === 'email')];
  }

  const handleUseAddressSeedToggle = (event, values, setValues) => {
    if (event.target.checked) {
      setValues({
        ...values,
        address: { ...values.address, ...addressSeed }
      });
    } else {
      setValues({
        ...values,
        address: { ...INITIAL_VALUES.address }
      });
    }
  };

  const topTitle =
    rest.checkoutVersion && rest.checkoutVersion === 2
      ? currentUser.data.account_jwt
        ? 'Shipping Address'
        : 'Objective Secure Checkout'
      : formType === FORM_TYPES.ACCOUNT
      ? 'Address'
      : 'Shipping Address';
  const bottomTitle = formType === FORM_TYPES.ACCOUNT ? '' : 'Shipping Method';
  const prevSubmitting = usePrevious(currentUser.patchAccountSubmitting);
  const errorMessage = getErrorMessage(currentUser.patchAccountError);

  useEffect(() => {
    if (errorMessage) {
      scrollToRef(errRef);
    }
  }, [currentUser.patchAccountError]);

  useEffect(() => {
    clearPatchAccountError();
  }, []);

  useEffect(() => {
    if (prevSubmitting && !currentUser.patchAccountSubmitting && !currentUser.patchAccountError) {
      onBack();
    }
  }, [currentUser.patchAccountSubmitting]);

  const isSameAddress = (original, suggested) => {
    if (
      original.address1.trim().toLowerCase() === suggested.address1.trim().toLowerCase() &&
      original.address2.trim().toLowerCase() === suggested.address2.trim().toLowerCase() &&
      original.city.trim().toLowerCase() === suggested.city.trim().toLowerCase() &&
      original.zipcode === suggested.zipcode
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = (values, actions) => {
    const fieldErrs = {
      address: {}
    };
    Object.keys(formikValueFieldsMap).forEach(function(field) {
      if (!formikValueFieldsMap[field]) {
        fieldErrs[field] = 'This field is invalid';
      } else {
        fieldErrs[field] = undefined;
      }
    });

    formikFields.forEach(requiredField => {
      fieldErrs.address[requiredField] = validateRequiredField(values.address[requiredField]);
    });
    actions.setErrors(fieldErrs);

    const firstInvalidField = checkedFields.find(field => {
      if (formikFields.includes(field)) {
        return !!get(fieldErrs, formikValueFieldsMap[field]);
      }
      return !!fieldErrs[field];
    });
    // scroll to the first invalid Field
    if (firstInvalidField) {
      actions.setSubmitting(false);
      return scrollToRef(fieldRefs[firstInvalidField]);
    }

    // Validate input address with SmartyStreet
    validateAddress(values.address).then(
      response => {
        const inputAddress = {
          ...values.address,
          shouldSaveData: values.shouldSaveData,
          isDefault: values.isDefault
        };
        setOriginalAddress(inputAddress);
        setSuggestedAddress(response);
        setFormActions(actions);
        if (response !== false) {
          // Compare addreses, no suggestion dialog if same
          const isSame = isSameAddress(values.address, response);
          if (isSame) {
            const payload = {
              ...values.address,
              phone: values.address.phone ? values.address.phone.trim() : ''
            };

            onSubmit(payload, actions);
          } else {
            setAddressSuggestion(true);
          }
        } else {
          setAddressSuggestion(true);
        }
      },
      error => {
        console.log('validation error, address form', error);
      }
    );
  };

  const handleDialogExit = actions => {
    actions.setSubmitting(false);
    setAddressSuggestion(false);
  };

  const renderForm = ({ values, setValues, setFieldValue, isSubmitting }) => (
    <Form className={rest.checkoutVersion && rest.checkoutVersion === 2 ? classes.root : ''}>
      <Box display="block" mb={xs ? 3 : 4} className="justify-content">
        {!currentUser.data.account_jwt && (
          <>
            <Typography
              color="#231f20"
              variant="h5"
              fontSize={xs ? 24 : 30}
              className={xs ? classes.mobileTitle : classes.title}
            >
              Express Checkout
              <Grid container alignItems={'left'} style={{ marginTop: '11px' }}>
                <div id="paypal-checkout-button" style={{ width: '187px' }}></div>
              </Grid>
            </Typography>

            <Grid
              container
              spacing={1}
              alignItems={'center'}
              style={{ marginTop: '23px', marginBottom: '23px' }}
            >
              <Grid item xs>
                <hr style={{ border: 'solid 1px #231f20' }}></hr>
              </Grid>
              <Grid item xs={1} style={{ textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  children={'or'}
                  style={{ color: '#231f20', fontWeight: '500', fontSize: '22px' }}
                />
              </Grid>
              <Grid item xs>
                <hr style={{ border: 'solid 1px #231f20' }}></hr>
              </Grid>
            </Grid>
          </>
        )}
        <Typography
          color="#231f20"
          variant="h5"
          fontSize={xs ? 24 : 30}
          className={xs ? classes.mobileTitle : classes.title}
        >
          {topTitle}
        </Typography>

        {!currentUser.data.account_jwt && (
          <>
            <Box style={{ float: 'left' }}>
              <Typography variant="body1" className={xs ? classes.mobileLogin : classes.subTitle}>
                Already have an account?
                <MenuLink
                  onClick={rest.switchToLogin}
                  children="LOG IN"
                  underline="always"
                  className={classes.subTitleLink}
                />
              </Typography>
            </Box>
          </>
        )}
      </Box>
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
        {seedEnabled && (
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Checkbox id="useAddressSeedToggle" onChange={handleUseAddressSeedToggle} />
              <Typography variant="body2" children={useSeedLabel} style={{ color: '#231f20' }} />
            </Box>
          </Grid>
        )}

        <Grid item xs={rest.checkoutVersion && rest.checkoutVersion === 2 ? 6 : 12} sm={6}>
          <div ref={fieldRefs.firstName}>
            <Field
              name="address.firstName"
              label="First Name"
              component={InputField}
              autoComplete="given-name"
            />
          </div>
        </Grid>
        <Grid item xs={rest.checkoutVersion && rest.checkoutVersion === 2 ? 6 : 12} sm={6}>
          <div ref={fieldRefs.lastName}>
            <Field
              name="address.lastName"
              label="Last Name"
              component={InputField}
              autoComplete="family-name"
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <div ref={fieldRefs.address1}>
            <Field
              name="address.address1"
              label="Street Address"
              component={InputField}
              autoComplete="address-line1"
              helperText={
                rest.checkoutVersion && rest.checkoutVersion === 2 ? '*No APO/FPO addresses' : false
              }
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Field
            name="address.address2"
            label="Apt. suite, bldg, c/o (optional)"
            component={InputField}
            autoComplete="address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={rest.checkoutVersion && rest.checkoutVersion === 2 ? 6 : false}>
          <div ref={fieldRefs.city}>
            <Field
              name="address.city"
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
              name="address.state"
              label="State"
              component={SelectField}
              options={
                rest.checkoutVersion && rest.checkoutVersion === 2
                  ? STATE_OPTIONS_ABBR
                  : STATE_OPTIONS
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
              name="address.zipcode"
              label="Zip Code"
              component={InputField}
              autoComplete="postal-code"
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Field
            name="address.phone"
            label="Phone #"
            component={InputField}
            type="tel"
            autoComplete="tel"
            helperText={
              rest.checkoutVersion && rest.checkoutVersion === 2
                ? 'In case we need to contact you about your order'
                : false
            }
          />
        </Grid>
        {!currentUser.data.account_jwt && (
          <Grid item xs={12}>
            <div ref={fieldRefs.email}>
              <Field
                name="address.email"
                label="Email Address"
                component={InputField}
                type="email"
                autoComplete="email"
                helperText={
                  rest.checkoutVersion && rest.checkoutVersion === 2
                    ? "We do not sell your information. We'll confirm your order to this e-mail."
                    : false
                }
              />
            </div>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          style={rest.checkoutVersion && rest.checkoutVersion === 2 ? { display: 'none' } : {}}
        >
          <Field
            name="address.country"
            label="Country"
            component={SelectField}
            options={COUNTRY_OPTIONS}
            disabled
          />
        </Grid>
        {allowFlyMode && currentUser.data.account_jwt && (
          <Grid item xs={12} style={{ padding: '0px', marginTop: '-8px' }}>
            <Field
              name="shouldSaveData"
              label="Save details in account"
              component={CheckboxField}
            />
          </Grid>
        )}
        {allowFlyMode && !currentUser.data.account_jwt && (
          <Grid item xs={12} style={{ paddingTop: '0px', paddingLeft: '3px', display: 'none' }}>
            <Field
              name="address.shouldSubscribe"
              label="Keep me updated with exclusive offers and product launches"
              component={CheckboxField}
              style={{ paddingLeft: '3px' }}
            />
          </Grid>
        )}
        {formType === FORM_TYPES.CHECKOUT && (
          <Grid item xs={12}>
            <Box
              component={Typography}
              color="#231f20"
              variant="h5"
              children={bottomTitle}
              fontSize={
                rest.checkoutVersion && rest.checkoutVersion === 2 ? (xs ? 24 : 26) : xs ? 24 : 30
              }
              mb={rest.checkoutVersion && rest.checkoutVersion === 2 ? (xs ? 2 : 3) : xs ? 3 : 4}
            />
            <Box
              border={
                rest.checkoutVersion && rest.checkoutVersion === 2
                  ? '1px solid #231f20'
                  : '1px solid rgb(0, 0, 0, 0.23)'
              }
              p="14px"
              mb="29px"
            >
              <Box
                component={Typography}
                color="#231f20"
                variant="body2"
                children="Standard Shipping"
                fontSize={18}
                lineHeight={1.69}
              />
              <Box
                component={Typography}
                color="#979797"
                variant="body2"
                children="USPS Priority 3-5 days"
                fontSize={16}
                lineHeight={1.69}
              />
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <ButtonGroup fullWidth>
            {onBack && currentUser.data.addressBook && currentUser.data.addressBook.length > 0 && (
              <Button
                color="secondary"
                type="button"
                onClick={onBack}
                children={backLabel}
                mr={2}
                style={{ height: '60px', padding: '0px' }}
              />
            )}
            <Button
              type="submit"
              children={submitLabel}
              loading={isSubmitting}
              style={{ height: '60px', padding: '0px' }}
            />
          </ButtonGroup>
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <>
      {addressSuggestionEnabled ? (
        <AddressValidation
          origAddress={originalAddress}
          suggAddress={suggestedAddress}
          actions={formActions}
          onSubmit={onSubmit}
          onExited={() => {
            handleDialogExit(formActions);
          }}
        />
      ) : null}
      <Formik
        initialValues={getInitialValues(INITIAL_VALUES, defaultValues)}
        onSubmit={handleSubmit}
        render={renderForm}
        enableReinitialize
      />
    </>
  );
};

AddressForm.propTypes = {
  currentUser: PropTypes.object.isRequired,
  formType: PropTypes.oneOf(Object.values(FORM_TYPES)),
  seedEnabled: PropTypes.bool,
  addressSeed: PropTypes.object,
  useSeedLabel: PropTypes.string,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  clearPatchAccountError: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  submitLabel: PropTypes.string,
  backLabel: PropTypes.string,
  allowFlyMode: PropTypes.bool
};

AddressForm.defaultProps = {
  formType: FORM_TYPES.ACCOUNT,
  seedEnabled: false,
  addressSeed: {},
  defaultValues: {},
  submitLabel: 'Save',
  backLabel: 'Cancel',
  allowFlyMode: false
};

export default AddressForm;
