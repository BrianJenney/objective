import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import Box from '@material-ui/core/Box';
import { FormSummarySection } from '../common';
import { COUNTRY_OPTIONS } from '../../constants/location';

const ADDRESS_FIELDS = [
  'firstName',
  'lastName',
  'address1',
  'address2',
  'city',
  'state',
  'zipcode',
  'country',
  'email'
];
const labelsMap = {
  firstName: 'First Name',
  lastName: 'Last Name',
  address1: 'Address Line 1',
  address2: 'Address Line 2',
  city: 'City',
  state: 'State',
  zipcode: 'Postal Code',
  country: 'Country',
  email: 'Email'
};
const getValuesWithoutLabels = ({
  firstName,
  lastName,
  address1,
  address2,
  city,
  state,
  zipcode,
  country,
  email
}) => {
  const name = [firstName, lastName].join(' ');
  const addressText1 = [address1, address2].join(' ');
  const addressText2 = `${city}, ${state} ${zipcode}`;
  const countryLabel = (COUNTRY_OPTIONS.find(c => c.value === country) || {})
    .label;

  return [name, addressText1, addressText2, countryLabel, email];
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
