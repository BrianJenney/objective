import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { FormSummarySection } from '../common';
import { Typography } from '@material-ui/core';

const ACCOUNT_FIELDS = ['email'];
const labelsMap = { email: 'Email' };
const getValuesWithoutLabels = ({ email }) => [email];

const AccountSummary = ({
  withLabels,
  values,
  children,
  signupConfirmation
}) => {
  const neededValues = pick(values, ACCOUNT_FIELDS);
  let pairs = null;

  if (withLabels) {
    pairs = ACCOUNT_FIELDS.map(key => ({
      label: labelsMap[key],
      value: neededValues[key]
    }));
  } else {
    pairs = getValuesWithoutLabels(neededValues).map(value => ({ value }));
  }

  return (
    <>
      {signupConfirmation && (
        <Typography style={{ fontSize: '20px', marginBottom: '10px' }}>
          Your account was successfully created!
        </Typography>
      )}

      <FormSummarySection title="" pairs={pairs} />
      {children}
    </>
  );
};

AccountSummary.propTypes = {
  withLabels: PropTypes.bool,
  values: PropTypes.object.isRequired,
  children: PropTypes.node
};

AccountSummary.defaultProps = {
  withLabels: false
};

export default AccountSummary;
