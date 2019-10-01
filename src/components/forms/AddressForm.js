import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { object, string, boolean } from 'yup';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { InputField, SelectField, CheckboxField } from '../form-fields';
import { Button, AlertPanel } from '../common';
import { COUNTRY_OPTIONS, STATE_OPTIONS } from '../../constants/location';
import { getInitialValues, getErrorMessage } from '../../utils/misc';

export const FORM_TYPES = {
  ACCOUNT: 'account',
  CHECKOUT: 'checkout'
};

const schema = object().shape({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  line1: string().required('Street address is required'),
  line2: string().nullable(),
  city: string().required('City is required'),
  state: string().required('State is required'),
  postalCode: string().required('Zip code is required'),
  phone: string().required('Phone number is required'),
  countryCode: string().required('Country is required'),
  shouldSaveData: boolean()
});

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
  countryCode: 'US',
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
  const errorMessage = getErrorMessage(currentUser.patchAccountError);

  useEffect(() => {
    clearPatchAccountError();
  }, []);

  const renderForm = () => (
    <Form>
      <Box
        component={Typography}
        color="#231f20"
        variant="h5"
        children={topTitle}
        fontSize={30}
        mb={4}
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
          <Field name="firstName" label="First Name" component={InputField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="lastName" label="Last Name" component={InputField} />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="line1"
            label="Street Address"
            component={InputField}
            helperText="*No PO Boxes or APO/FPO addresses"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="line2"
            label="Apt. suite, bldg, c/o (optional)"
            component={InputField}
          />
        </Grid>
        <Grid item xs={12}>
          <Field name="city" label="City" component={InputField} />
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
          <Field name="postalCode" label="Zip Code" component={InputField} />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="phone"
            label="Phone #"
            component={InputField}
            helperText="*No PO Boxes or APO/FPO addresses"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="countryCode"
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
              fontSize={30}
              mb={4}
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
                children="FedEx Ground 3-5 days"
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
            <Button type="submit" children={submitLabel} />
          </ButtonGroup>
        </Grid>
      </Grid>
    </Form>
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
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
