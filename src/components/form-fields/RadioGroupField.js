import React from 'react';
import PropTypes from 'prop-types';
import { Radio, RadioGroup, FormControlLabel, Box } from '@material-ui/core';

const RadioGroupField = ({
  field,
  form,
  label,
  options,
  disabled,
  ...rest
}) => (
  <Box>
    <RadioGroup
      id={field.name}
      aria-label={label}
      disabled={form.isSubmitting || disabled}
      {...field}
      {...rest}
    >
      {options.map(option => (
        <FormControlLabel
          key={option.key}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  </Box>
);

RadioGroupField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  disabled: PropTypes.bool
};

export default RadioGroupField;
