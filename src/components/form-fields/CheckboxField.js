import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  text: {
    fontFamily: theme.typography.bodyFontFamily,
    fontSize: '14px',
    color: theme.palette.brand.darkSubTextGray,
    lineHeight: 'normal'
  }
}));
const CheckboxField = ({ field, form, disabled, label, ...rest }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <Checkbox
        color="primary"
        id={field.name}
        disabled={form.isSubmitting || disabled}
        checked={field.value === true}
        {...field}
        {...rest}
      />
      <Typography className={classes.text} children={label} />
    </Box>
  );
};

CheckboxField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string
};

export default CheckboxField;
