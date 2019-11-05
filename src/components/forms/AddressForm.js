import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { object, string, boolean } from 'yup';
import { Formik, Field, Form } from 'formik';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { validateAddress } from '../../apis/SmartyStreets';
import { InputField, SelectField, CheckboxField } from '../form-fields';
import { Button, AlertPanel } from '../common';
import { COUNTRY_OPTIONS, STATE_OPTIONS } from '../../constants/location';
import { getInitialValues, getErrorMessage } from '../../utils/misc';

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

const schema = object().shape({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  address1: string().required('Street address is required'),
  address2: string().nullable(),
  city: string().required('City is required'),
  state: string().required('State is required'),
  zipcode: string().required('Zip code is required'),
  phone: string().nullable(),
  country: string().required('Country is required'),
  shouldSaveData: boolean()
});

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipcode: '',
  phone: '',
  country: 'US',
  isDefault: false,
  shouldSaveData: true
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
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const [initialValues, setInitialValues] = useState(
    getInitialValues(INITIAL_VALUES, defaultValues)
  );

  const handleUseAddressSeedToggle = event => {
    if (event.target.checked) {
      setInitialValues({ ...addressSeed });
    } else {
      setInitialValues(getInitialValues(INITIAL_VALUES, defaultValues));
    }
  };
  const topTitle =
    formType === FORM_TYPES.ACCOUNT ? 'Address' : 'Shipping Address';
  const bottomTitle = formType === FORM_TYPES.ACCOUNT ? '' : 'Shipping Method';
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

  const handleSubmit = (values, actions) => {
    const response = validateAddress(values);
    const payload = {
      ...values,
      phone: values.phone ? values.phone.trim() : ''
    };
    onSubmit(payload, actions);
  };

  const renderForm = ({ isSubmitting }) => (
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
          <AlertPanel
            py={2}
            px={4}
            type="error"
            bgcolor="#ffcdd2"
            text={errorMessage}
            variant="subtitle2"
          />
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
          <Field
            name="firstName"
            label="First Name"
            component={InputField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="lastName"
            label="Last Name"
            component={InputField}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="address1"
            label="Street Address"
            component={InputField}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="address2"
            label="Apt. suite, bldg, c/o (optional)"
            component={InputField}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="city"
            label="City"
            component={InputField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="state"
            label="State"
            component={SelectField}
            options={STATE_OPTIONS}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="zipcode"
            label="Zip Code"
            component={InputField}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="phone"
            label="Phone #"
            component={InputField}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="country"
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
            <Button type="submit" children={submitLabel} loading={isSubmitting} />
          </ButtonGroup>
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
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
