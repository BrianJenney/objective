import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Checkbox } from '@material-ui/core';

const CheckboxField = ({ field, form, disabled, label, ...rest }) => (
  <Box display="flex" alignItems="center">
    <Checkbox
      id={field.name}
      disabled={form.isSubmitting || disabled}
      checked={field.value === true}
      {...field}
      {...rest}
    />
    <Typography children={label} />
  </Box>
);

CheckboxField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string
};

export default CheckboxField;
