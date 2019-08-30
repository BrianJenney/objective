import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { FormSummarySection } from '../common';

const PAYMENT_FIELDS = [
  'paymentMethod',
  'cardholderName',
  'number',
  'expirationDate',
  'cvv'
];
const labelsMap = {
  paymentMethod: 'Payment Method',
  cardholderName: 'Name',
  number: 'Card Number',
  expirationDate: 'Expiration Date',
  cvv: 'CVV'
};

const PaymentSummary = ({ values }) => {
  const neededValues = pick(values, PAYMENT_FIELDS);
  const pairs = Object.keys(neededValues).map(key => ({
    label: labelsMap[key],
    value: neededValues[key]
  }));

  return <FormSummarySection title="" pairs={pairs} />;
};

PaymentSummary.propTypes = {
  values: PropTypes.object.isRequired
};

export default PaymentSummary;
