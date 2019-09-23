import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import { FormSummarySection } from '../common';
import { COUNTRY_OPTIONS } from '../../constants/location';

const ADDRESS_FIELDS = [
  'firstName',
  'lastName',
  'line1',
  'line2',
  'city',
  'state',
  'postalCode',
  'countryCode',
  'isDefault'
];
const labelsMap = {
  firstName: 'First Name',
  lastName: 'Last Name',
  line1: 'Address Line 1',
  line2: 'Address Line 2',
  city: 'City',
  state: 'State',
  postalCode: 'Postal Code',
  countryCode: 'Country',
  isDefault: ''
};
const getValuesWithoutLabels = ({
  firstName,
  lastName,
  line1,
  line2,
  city,
  state,
  postalCode,
  countryCode
}) => {
  const name = [firstName, lastName].join(' ');
  const address1 = [line1, line2].join(' ');
  const address2 = `${city}, ${state} ${postalCode}`;
  const country = (COUNTRY_OPTIONS.find(c => c.value === countryCode) || {})
    .label;

  return [name, address1, address2, country];
};

const AddressSummary = ({ withLabels, noDefault, values, children }) => {
  let defaultIndicator = null;
  if (!noDefault) {
    defaultIndicator = values.isDefault ? (
      <Box my="10px" height={37} display="flex" alignItems="center">
        <CheckIcon style={{ width: '20px', height: '20px' }} />
        <Typography
          variant="body1"
          children="Saved as default"
          style={{ fontSize: 16, marginLeft: 7 }}
        />
      </Box>
    ) : (
      <Box my="10px" height={37} />
    );
  }

  const neededValues = pick(values, ADDRESS_FIELDS);
  let pairs = null;

  if (withLabels) {
    pairs = ADDRESS_FIELDS.map(key => ({
      label: labelsMap[key],
      value: key === 'isDefault' ? defaultIndicator : neededValues[key]
    }));
  } else {
    const pre = getValuesWithoutLabels(neededValues).map(value => ({ value }));
    pairs = [...pre, { value: defaultIndicator }];
  }

  return (
    <>
      <FormSummarySection title="" pairs={pairs} />
      {children}
    </>
  );
};

AddressSummary.propTypes = {
  withLabels: PropTypes.bool,
  noDefault: PropTypes.bool,
  values: PropTypes.object.isRequired,
  children: PropTypes.node
};

AddressSummary.defaultProps = {
  withLabels: false,
  noDefault: false
};

export default AddressSummary;
