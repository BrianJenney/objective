import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import Box from '@material-ui/core/Box';
import { FormSummarySection } from '../common';

const PAYMENT_FIELDS = ['name', 'cardType', 'last4', 'expirationDate'];
const labelsMap = {
  name: 'Name',
  cardType: 'Card Type',
  last4: 'Last 4 digits',
  expirationDate: 'Expires'
};
const getValuesWithoutLabels = ({ name, cardType, last4, expirationDate }) => [
  `${cardType} ${last4}`,
  `Expires ${expirationDate}`,
  name
];

const PaymentSummary = ({ withLabels, values, children, ...rest }) => {
  const neededValues = pick(values, PAYMENT_FIELDS);
  let pairs = null;

  if (withLabels) {
    pairs = PAYMENT_FIELDS.map(key => ({
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

PaymentSummary.propTypes = {
  withLabels: PropTypes.bool,
  values: PropTypes.object.isRequired,
  children: PropTypes.node
};

PaymentSummary.defaultProps = {
  withLabels: false
};

export default PaymentSummary;
