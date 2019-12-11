import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputField from './InputField';

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
  const [state, setState] = React.useState('');

  const handleChange = event => {
    setState(event.target.value);
  };
  return (
    <InputField
      select
      onChange={handleChange}
      value={state}
      SelectProps={{
        native: true,
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
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </InputField>
  );
}
