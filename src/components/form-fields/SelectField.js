import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import InputField from './InputField';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: option => option.label
});

const popoverStyles = makeStyles({
  paper: {
    boxShadow:
      '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
    backgroundColor: 'F5F5F5',
    border: '1px black solid'
  }
});

SelectField.propTypes = {
  options: PropTypes.array
};

SelectField.defaultProps = {
  options: []
};

export default function SelectField(props) {
  const { options, disabled, defaultLabel, ...rest } = props;
  const { initialValues, setFieldValue } = props.form;
  const field = props.field ? props.field : null;
  const handleChange = (e, value) => {
    console.log('value', value);
    if (field.name === 'address.state') {
      setFieldValue(
        'address.state',
        value !== null ? value.value : initialValues.address.state
      );
    }
    if (field.name === 'billingAddress.state') {
      setFieldValue(
        'billingAddress.state',
        value !== null ? value.value : initialValues.billingAddress.state
      );
    }
  };
  return (
    <Autocomplete
      classes={popoverStyles()}
      autoHighlight
      options={options}
      inputValue={defaultLabel || null}
      disabled={disabled}
      filterOptions={filterOptions}
      getOptionLabel={option => option.label}
      onChange={(e, value) => handleChange(e, value)}
      renderInput={params => (
        <InputField
          {...params}
          inputProps={{
            ...params.inputProps,
            MenuProps: {
              classes: popoverStyles(),
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
              }
            }
          }}
          {...rest}
        />
      )}
    />
  );
}
