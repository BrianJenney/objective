import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import moment from 'moment';
import { noop } from 'lodash';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const DatePickerField = ({
  field,
  form,
  helperText,
  disabled,
  valueFormat,
  onChange,
  ...rest
}) => {
  const { name, value } = field;
  const error = getIn(form.errors, name);
  const touched = getIn(form.touched, name);

  const handleChange = v => {
    const fieldValue = v ? moment(v).format(valueFormat) : null;
    form.setFieldValue(name, fieldValue);
    onChange(fieldValue);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        id={name}
        error={!!(touched && error)}
        helperText={(touched && error) || helperText}
        disabled={form.isSubmitting || disabled}
        onChange={handleChange}
        onError={(_, err) => form.setFieldError(name, err)}
        value={value ? moment(value, valueFormat) : null}
        KeyboardButtonProps={{ 'aria-label': 'change date' }}
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
};

DatePickerField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
  inputVariant: PropTypes.string,
  format: PropTypes.string,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  variant: PropTypes.string,
  valueFormat: PropTypes.string,
  onChange: PropTypes.func
};

DatePickerField.defaultProps = {
  fullWidth: true,
  margin: 'dense',
  inputVariant: 'outlined',
  valueFormat: 'MM/DD/YYYY',
  format: 'MM/DD/YYYY',
  onChange: noop
};

export default DatePickerField;
