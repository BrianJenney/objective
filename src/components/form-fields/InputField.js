import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { colorPalette } from '../../components/Theme/color-palette';

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

const { BLACK } = colorPalette;

const StyledTextField = withStyles(theme => ({
  root: {
    height: '80px',
    padding: '30px'
  }
}))(TextField);

export default function InputField(props) {
  const { field, form, helperText, disabled, ...rest } = props;
  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);

  return (
    <TextField
      variant=""
      id={field.name}
      error={!!(touched && error)}
      helperText={(touched && error) || helperText}
      disabled={form.isSubmitting || disabled}
      {...field}
      {...rest}
    />
  );
}
