import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import Box from '@material-ui/core/Box';
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
  'countryCode'
];
const labelsMap = {
  firstName: 'First Name',
  lastName: 'Last Name',
  line1: 'Address Line 1',
  line2: 'Address Line 2',
  city: 'City',
  state: 'State',
  postalCode: 'Postal Code',
  countryCode: 'Country'
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

const AddressSummary = ({ withLabels, values, children, ...rest }) => {
  const neededValues = pick(values, ADDRESS_FIELDS);
  let pairs = null;

  if (withLabels) {
    pairs = ADDRESS_FIELDS.map(key => ({
      label: labelsMap[key],
      value: neededValues[key]
    }));
  } else {
    pairs = getValuesWithoutLabels(neededValues).map(value => ({ value }));
  }

  return (
    <Box {...rest}>
      <FormSummarySection title="" pairs={pairs} />
      {children}
    </Box>
  );
};

AddressSummary.propTypes = {
  withLabels: PropTypes.bool,
  values: PropTypes.object.isRequired,
  children: PropTypes.node
};

AddressSummary.defaultProps = {
  withLabels: false
};

export default AddressSummary;
