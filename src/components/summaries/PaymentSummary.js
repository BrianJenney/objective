import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { Box, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { FormSummarySection } from '../common';

const PAYMENT_FIELDS = ['name', 'last4', 'expirationDate', 'isDefault'];
const labelsMap = {
  name: 'Name',
  last4: 'Last 4 digits',
  expirationDate: 'Exp. Date',
  isDefault: ''
};

const PaymentSummary = ({ values, children }) => {
  const defaultIndicator = values.isDefault ? (
    <Box height={36} display="flex" alignItems="center">
      <CheckIcon />
      <Typography variant="body1" children="Saved as Default" />
    </Box>
  ) : null;
  const neededValues = pick(values, PAYMENT_FIELDS);
  const pairs = PAYMENT_FIELDS.map(key => ({
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

PaymentSummary.propTypes = {
  values: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default PaymentSummary;
