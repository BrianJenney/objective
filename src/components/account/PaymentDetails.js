import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { EditablePanel, MenuLink } from '../common';
import { PaymentSummary } from '../summaries';
import { PaymentForm } from '../forms';

const AccountPaymentDetails = ({ account }) => {
  const paymentDetails = account.paymentDetails || [
    {
      paymentMethod: 'creditCard',
      cardholderName: 'Leonardo Kim',
      number: 'XXXXXX2234',
      expirationDate: '02/2023',
      cvv: '434'
    },
    {
      paymentMethod: 'creditCard',
      cardholderName: 'Kevin Christian',
      number: 'XXXXXX1234',
      expirationDate: '02/2023',
      cvv: '534'
    }
  ];
  return (
    <Box>
      <Typography variant="h5" children="Payment Details" />
      <Typography variant="h6" children="Credit Card" />
      <Box display="flex">
        {paymentDetails.map((entity, index) => (
          <Box key={`entity_${index}`} border="1px solid #979797" m={1} p={4}>
            <EditablePanel
              title=""
              defaultValues={entity}
              onSubmit={() => null}
              Form={PaymentForm}
              Summary={PaymentSummary}
            />
          </Box>
        ))}
      </Box>
      <MenuLink onClick={() => null} children="Add New Card" />
    </Box>
  );
};

AccountPaymentDetails.propTypes = {
  account: PropTypes.object.isRequired
};

export default AccountPaymentDetails;
