import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
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
    maxHeight: '200px'
  }
});

SelectField.propTypes = {
  options: PropTypes.array
};

SelectField.defaultProps = {
  options: []
};

export default function SelectField(props) {
  const { options, ...rest } = props;
  return (
    <Autocomplete
      options={options}
      filterOptions={filterOptions}
      getOptionLabel={option => option.label}
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
