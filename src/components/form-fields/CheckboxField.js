import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Checkbox } from '@material-ui/core';
import { fonts, sizes, lineHeight } from '../../components/Theme/fonts';

const { $brandSans, $brandSerif } = fonts;

const CheckboxField = ({ field, form, disabled, label, ...rest }) => (
  <Box display="flex" alignItems="center">
    <Checkbox
      id={field.name}
      disabled={form.isSubmitting || disabled}
      checked={field.value === true}
      {...field}
      {...rest}
    />
    <Typography
      children={label}
      style={{
        'font-family': $brandSans,
        'font-size': '18px',
        'margin-left': '10px'
      }}
    />
  </Box>
);

CheckboxField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string
};

export default CheckboxField;
