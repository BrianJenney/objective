import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import TextField from '@material-ui/core/TextField';

const InputField = props => {
  const { field, form, helperText, disabled, renderCustom, ...rest } = props;
  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);

  const textFieldProps = {
    disabled: disabled || form.isSubmitting,
    ...field,
    ...rest
  };

  if (!renderCustom) {
    Object.assign({}, textFieldProps, {
      helperText: (touched && error) || helperText,
      error: !!(touched && error)
    });
  }

  return (
    <div>
      <TextField {...textFieldProps} />
    </div>
  );
};

InputField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
  renderCustom: PropTypes.bool
};

InputField.defaultProps = {
  fullWidth: true,
  variant: 'outlined',
  renderCustom: false
};

export default InputField;
