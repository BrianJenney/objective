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
  currentPassword: string().required('Your current password is required'),
  newPassword1: string().required('Both password fields are required'),
  newPassword2: string().required('Both password fields are required')
});

const INITIAL_VALUES = {
  currentPassword: '',
  newPassword1: '',
  newPassword2: ''
};

const ChangePasswordForm = ({
  title,
  defaultValues,
  onSubmit,
  onBack,
  submitLabel,
  backLabel
}) => {
  const renderForm = ({ isValid }) => (
    <Form>
      {title && <Typography variant="h6" gutterBottom children={title} />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            name="currentPassword"
            label="Current Password"
            component={InputField}
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="newPassword1"
            label="New Password"
            component={InputField}
            type="password"
            helperText="Must be at least 6 characters"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            name="newPassword2"
            label="Confirm New Password"
            component={InputField}
            type="password"
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
            <Button type="submit" children={submitLabel} disabled={!isValid} />
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
    />
  );
};

ChangePasswordForm.propTypes = {
  title: PropTypes.string,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  submitLabel: PropTypes.string,
  backLabel: PropTypes.string
};

ChangePasswordForm.defaultProps = {
  defaultValues: {},
  submitLabel: 'Change Password',
  backLabel: 'Cancel'
};

export default ChangePasswordForm;
