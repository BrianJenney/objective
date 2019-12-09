import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { get, omit } from 'lodash';
import { Formik, Field, Form } from 'formik';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { InputField, SelectField, CheckboxField } from '../form-fields';
import { Button, AlertPanel } from '../common';
import { COUNTRY_OPTIONS, STATE_OPTIONS } from '../../constants/location';
import {
  getInitialValues,
  getErrorMessage,
  scrollToRef
} from '../../utils/misc';

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

const INITIAL_VALUES = {
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

const checkedFields = [
  'firstName',
  'lastName',
  'address1',
  'city',
  'state',
  'zipcode'
];
const formikFields = [
  'firstName',
  'lastName',
  'address1',
  'city',
  'state',
  'zipcode'
];
const formikValueFieldsMap = {
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

const AddressForm = ({
  currentUser,
  formType,
  seedEnabled,
  addressSeed,
  useSeedLabel,
  defaultValues,
  clearPatchAccountError,
  onSubmit,
  onBack,
  submitLabel,
  backLabel,
  allowFlyMode
}) => {
  const fieldRefs = {
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
  const [initialValues, setInitialValues] = useState(
    getInitialValues(INITIAL_VALUES, defaultValues)
  );

  const handleUseAddressSeedToggle = (event, values, setValues) => {
    if (event.target.checked) {
      setValues({
        ...values,
        billingAddress: { ...values.billingAddress, ...addressSeed }
      });
    } else {
      setValues({
        ...values,
        billingAddress: { ...INITIAL_VALUES.billingAddress }
      });
    }
  };
  const topTitle =
    formType === FORM_TYPES.ACCOUNT ? 'Address' : 'Shipping Address';
  const bottomTitle = formType === FORM_TYPES.ACCOUNT ? '' : 'Shipping Method';
  const prevSubmitting = usePrevious(currentUser.patchAccountSubmitting);
  const errorMessage = getErrorMessage(
    currentUser.patchAccountError,
    scrollToRef(errRef)
  );

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

  const handleSubmit = (values, actions) => {
    const fieldErrs = {
      billingAdress: {}
    };

    Object.keys(formikValueFieldsMap).forEach(function(field) {
      if (!formikValueFieldsMap[field]) {
        fieldErrs[field] = 'This field is invalid';
      } else {
        fieldErrs[field] = undefined;
      }
    });

    formikFields.forEach(requiredField => {
      console.log('hello', requiredField);
      if (requiredField === 'firstName') {
        fieldErrs.billingAddress[requiredField] = validateRequiredField(
          values.billingAddress[requiredField]
        );
      } else {
        fieldErrs.billingAddress[requiredField] = validateRequiredField(
          values.billingAddress[requiredField]
        );
      }
    });
    actions.setErrors(omit(fieldErrs));

    const firstInvalidField = checkedFields.find(field => {
      if (formikFields.includes(field)) {
        return !!get(fieldErrs, formikValueFieldsMap[field]);
      }
      return !!fieldErrs[field];
    });

    if (firstInvalidField) {
      actions.setSubmitting(false);
      return scrollToRef(fieldRefs[firstInvalidField]);
    }

    const payload = {
      ...values,
      phone: values.phone ? values.phone.trim() : ''
    };
    onSubmit(payload, actions);
  };

  const renderForm = ({ values, setValues, isSubmitting }) => (
    <Form>
      <Box
        component={Typography}
        color="#231f20"
        variant="h5"
        children={topTitle}
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
        {seedEnabled && (
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Checkbox
                id="useAddressSeedToggle"
                onChange={handleUseAddressSeedToggle}
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
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div ref={fieldRefs.lastName}>
            <Field
              name="billingAddress.lastName"
              label="Last Name"
              component={InputField}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div ref={fieldRefs.address1}>
            <Field
              name="billingAddress.address1"
              label="Street Address"
              component={InputField}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Field
            name="billingAddress.address2"
            label="Apt. suite, bldg, c/o (optional)"
            component={InputField}
          />
        </Grid>
        <Grid item xs={12}>
          <div ref={fieldRefs.city}>
            <Field
              name="billingAddress.city"
              label="City"
              component={InputField}
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
          <div ref={fieldRefs.zipcode}>
            <Field
              name="billingAddress.zipcode"
              label="Zip Code"
              component={InputField}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Field
            name="billingAddress.phone"
            label="Phone #"
            component={InputField}
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
        {allowFlyMode && (
          <Grid item xs={12}>
            <Field
              name="shouldSaveData"
              label="Save details in account"
              component={CheckboxField}
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
              fontSize={xs ? 24 : 30}
              mb={xs ? 3 : 4}
            />
            <Box border="1px solid rgb(0, 0, 0, 0.23)" p="14px" mb="29px">
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

  return (
    <Formik
      initialValues={getInitialValues(INITIAL_VALUES, defaultValues)}
      onSubmit={handleSubmit}
      render={renderForm}
      enableReinitialize
    />
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
