import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import { FormSummarySection } from '../common';

const PAYMENT_FIELDS = ['name', 'last4', 'expirationDate', 'isDefault'];
const labelsMap = {
  name: 'Name',
  last4: 'Last 4 digits',
  expirationDate: 'Exp. Date',
  isDefault: ''
};
const getValuesWithoutLabels = payload => Object.values(payload);

const PaymentSummary = ({ withLabels, noDefault, values, children }) => {
  let defaultIndicator = null;
  if (!noDefault) {
    defaultIndicator = values.isDefault ? (
      <Box height={36} display="flex" alignItems="center">
        <CheckIcon />
        <Typography variant="body1" children="Saved as Default" />
      </Box>
    ) : null;
  }

  const neededValues = pick(values, PAYMENT_FIELDS);
  let pairs = null;

  if (withLabels) {
    pairs = PAYMENT_FIELDS.map(key => ({
      label: labelsMap[key],
      value: key === 'isDefault' ? defaultIndicator : neededValues[key]
    }));
  } else {
    pairs = getValuesWithoutLabels(neededValues).map(value => ({ value }));
  }

  return (
    <>
      <FormSummarySection title="" pairs={pairs} />
      {children}
    </>
  );
};

PaymentSummary.propTypes = {
  withLabels: PropTypes.bool,
  noDefault: PropTypes.bool,
  values: PropTypes.object.isRequired,
  children: PropTypes.node
};

PaymentSummary.defaultProps = {
  withLabels: false,
  noDefault: false
};

export default PaymentSummary;
