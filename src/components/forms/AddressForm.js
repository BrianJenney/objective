import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import { Box, Grid, Typography, Checkbox } from '@material-ui/core';
import { InputField, SelectField } from '../form-fields';
import { Button } from '../common';
import { COUNTRY_OPTIONS } from '../../constants/location';
import { getInitialValues } from '../../utils/misc';

const schema = object().shape({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  line1: string().required('Address1 is required'),
  line2: string(),
  city: string().required('City is required'),
  state: string().required('State is required'),
  postalCode: string().required('Postal code is required'),
  countryCode: string().required('Country is required')
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
  isDefault: false
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
  backLabel
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
      <Grid container spacing={3}>
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
          <Field name="firstName" label="First name" component={InputField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="lastName" label="Last name" component={InputField} />
        </Grid>
        <Grid item xs={12}>
          <Field name="line1" label="Address line 1" component={InputField} />
        </Grid>
        <Grid item xs={12}>
          <Field name="line2" label="Address line 2" component={InputField} />
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
            label="Zip/Postal code"
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
  backLabel: PropTypes.string
};

AddressForm.defaultProps = {
  seedEnabled: false,
  addressSeed: {},
  defaultValues: {},
  submitLabel: 'Save',
  backLabel: 'Cancel'
};

export default AddressForm;
