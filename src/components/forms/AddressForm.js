import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { object, string, boolean } from 'yup';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { InputField, SelectField, CheckboxField } from '../form-fields';
import { Button } from '../common';
import { COUNTRY_OPTIONS } from '../../constants/location';
import { getInitialValues } from '../../utils/misc';

const schema = object().shape({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  line1: string().required('Address1 is required'),
  line2: string().nullable(),
  city: string().required('City is required'),
  state: string().required('State is required'),
  postalCode: string().required('Postal code is required'),
  countryCode: string().required('Country is required'),
  shouldSaveData: boolean()
});

const INITIAL_VALUES = {
  firstName: 'Kevin',
  lastName: 'Christian',
  line1: '1111 Sprng Street',
  line2: '',
  city: 'Raleigh',
  state: 'NC',
  postalCode: '22222',
  countryCode: 'US',
  isDefault: false,
  shouldSaveData: true
};

const AddressForm = ({
  title,
  seedEnabled,
  addressSeed,
  useSeedLabel,
  defaultValues,
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

  const renderForm = () => (
    <Form>
      {title && <Typography variant="h6" gutterBottom children={title} />}
      <Grid container spacing={2}>
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
          <Field name="firstName" label="First Name" component={InputField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="lastName" label="Last Name" component={InputField} />
        </Grid>
        <Grid item xs={12}>
          <Field name="line1" label="Address Line 1" component={InputField} />
        </Grid>
        <Grid item xs={12}>
          <Field name="line2" label="Address Line 2" component={InputField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="city" label="City" component={InputField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="state"
            label="State/Province/Region"
            component={InputField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="postalCode"
            label="Zip/Postal Code"
            component={InputField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            name="countryCode"
            label="Country"
            component={SelectField}
            options={COUNTRY_OPTIONS}
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
  title: PropTypes.string,
  seedEnabled: PropTypes.bool,
  addressSeed: PropTypes.object,
  useSeedLabel: PropTypes.string,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  submitLabel: PropTypes.string,
  backLabel: PropTypes.string,
  allowFlyMode: PropTypes.bool
};

AddressForm.defaultProps = {
  seedEnabled: false,
  addressSeed: {},
  defaultValues: {},
  submitLabel: 'Save',
  backLabel: 'Cancel',
  allowFlyMode: false
};

export default AddressForm;
