import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import moment from 'moment';
import { noop } from 'lodash';
import { DatePicker } from '@material-ui/pickers';

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
    form.setFieldValue(name, v ? moment(v).format(valueFormat) : null);
    onChange(moment(v).format(valueFormat));
  };

  return (
    <DatePicker
      className="date-picker"
      id={name}
      error={!!(touched && error)}
      helperText={(touched && error) || helperText}
      disabled={form.isSubmitting || disabled}
      onChange={handleChange}
      onError={(_, err) => form.setFieldError(name, err)}
      value={value ? moment(value, valueFormat) : null}
      {...rest}
    />
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
  valueFormat: 'YYYY-MM-DD',
  format: 'MM/DD/YYYY',
  onChange: noop
};

export default DatePickerField;
