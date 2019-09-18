import React from 'react';
import PropTypes from 'prop-types';
import { object, string } from 'yup';
import { Formik, Field, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { InputField } from '../form-fields';
import { Button } from '../common';
import { getInitialValues } from '../../utils/misc';

const schema = object().shape({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string()
    .required('Email is required')
    .email('Please enter a valid email'),
  phone: string().nullable()
});

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
};

const ProfileDetailsForm = ({
  title,
  defaultValues,
  onSubmit,
  onBack,
  submitLabel,
  backLabel
}) => {
  const renderForm = () => (
    <Form>
      {title && <Typography variant="h6" gutterBottom children={title} />}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Field name="firstName" label="First Name" component={InputField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="lastName" label="Last Name" component={InputField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="email" label="Email" component={InputField} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name="phone" label="Phone Number" component={InputField} />
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
      initialValues={getInitialValues(INITIAL_VALUES, defaultValues)}
      onSubmit={onSubmit}
      validationSchema={schema}
      render={renderForm}
      enableReinitialize
    />
  );
};

ProfileDetailsForm.propTypes = {
  title: PropTypes.string,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  submitLabel: PropTypes.string,
  backLabel: PropTypes.string
};

ProfileDetailsForm.defaultProps = {
  defaultValues: {},
  submitLabel: 'Save Changes',
  backLabel: 'Cancel'
};

export default ProfileDetailsForm;
