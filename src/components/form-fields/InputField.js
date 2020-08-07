import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import TextField from '@material-ui/core/TextField';

const InputField = props => {
  const { field, form, helperText, disabled, ...rest } = props;
  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);

  return (
    <TextField
      disabled={disabled || form.isSubmitting}
      error={!!(touched && error)}
      helperText={(touched && error) || helperText}
      {...field}
      {...rest}
    />
  );
};

InputField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string
};

InputField.defaultProps = {
  fullWidth: true,
  variant: 'outlined'
};

export default InputField;
