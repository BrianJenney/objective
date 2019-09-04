import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { EditablePanel, MenuLink } from '../../components/common';
import { PaymentSummary } from '../../components/summaries';
import { PaymentForm } from '../../components/forms';
import { fetchCreditCardBrainTreeNonce } from '../../utils/checkout';
import store from '../../store';
import { requestPatchAccount } from '../../modules/account/actions';

const AccountPaymentDetails = ({ account }) => {
  const addCard = async values => {
    // This is a hardcoded billingAddress that will have to get
    // replaced once addresses are done.
    const billingAddress = {
      postalCode: '11111'
    };

    const { paymentDetails } = values;
    const nonce = await fetchCreditCardBrainTreeNonce({
      paymentDetails,
      billingAddress
    });

    const paymentMethods = {
      newPaymentMethod: {
        name: values.paymentDetails.cardholderName,
        last4: values.paymentDetails.number.substring(
          values.paymentDetails.number.length - 4,
          values.paymentDetails.number.length
        ),
        expirationDate: values.paymentDetails.expirationDate
      },
      nonce: nonce
    };
    console.log(paymentMethods);

    store.dispatch(requestPatchAccount(account.account_jwt, paymentMethods));
  };

  const editCard = () => {
    alert('editing payment details');
  };

  const paymentDetails = account.paymentMethods || [
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
              onSubmit={editCard}
              Form={PaymentForm}
              Summary={PaymentSummary}
            />
          </Box>
        ))}
      </Box>
      <MenuLink onClick={() => null} children="Add New Card" />
      <PaymentForm onSubmit={addCard} />
    </Box>
  );
};

AccountPaymentDetails.propTypes = {
  account: PropTypes.object.isRequired
};

export default AccountPaymentDetails;
