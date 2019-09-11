import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { Box, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { FormSummarySection } from '../common';

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

const AddressSummary = ({ values, children }) => {
  const defaultIndicator = values.isDefault ? (
    <Box height={30} display="flex" alignItems="center">
      <CheckIcon />
      <Typography variant="body1" children="Saved as Default" />
    </Box>
  ) : (
    <Box height={30} />
  );
  const neededValues = pick(values, ADDRESS_FIELDS);
  const pairs = ADDRESS_FIELDS.map(key => ({
    label: labelsMap[key],
    value: key === 'isDefault' ? defaultIndicator : neededValues[key]
  }));

  return (
    <>
      <FormSummarySection title="" pairs={pairs} />
      {children}
    </>
  );
};

AddressSummary.propTypes = {
  values: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default AddressSummary;
