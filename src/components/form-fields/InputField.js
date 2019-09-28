import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import TextField from '@material-ui/core/TextField';

InputField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string
};

InputField.defaultProps = {
  fullWidth: true,
  variant: 'outlined'
};

export default function InputField(props) {
  const { field, form, helperText, ...rest } = props;
  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);

  return (
    <TextField
      style={{ fontFamily: 'P22-underground', fontSize: '18px' }}
      id={field.name}
      error={!!(touched && error)}
      helperText={(touched && error) || helperText}
      {...field}
      {...rest}
    />
  );
}
