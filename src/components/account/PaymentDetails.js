import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { useSnackbar } from 'notistack';
import { Box, Grid, Typography } from '@material-ui/core';
import { fetchCreditCardBrainTreeNonce } from '../../utils/braintree';
import { EditablePanel, MenuLink, AlertPanel } from '../common';
import { PaymentSummary } from '../summaries';
import { PaymentForm } from '../forms';

const AccountPaymentDetails = ({ currentUser, requestPatchAccount }) => {
  const [addModeEnabled, setAddModeEnabled] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const creditCards = get(currentUser, 'paymentMethods', []);
  const deleteCreditCard = deletedCreditCardToken => {
    const payload = { deletedCreditCardToken };

    requestPatchAccount(currentUser.account_jwt, payload);
  };
  const setDefaultCreditCard = defaultCreditCardToken => {
    const payload = { defaultCreditCardToken };

    requestPatchAccount(currentUser.account_jwt, payload);
  };
  const addCreditCard = async (paymentDetails, actions) => {
    const addressBook = currentUser.addressBook || [];
    const billingAddress = addressBook.find(address => !!address.isDefault);
    if (!billingAddress) {
      return enqueueSnackbar(
        'Please fill in billing address first in addresses section.',
        { variant: 'error' }
      );
    }

    try {
      const nonce = await fetchCreditCardBrainTreeNonce({
        paymentDetails,
        billingAddress
      });
      const payload = {
        newCreditCard: {
          name: paymentDetails.cardholderName,
          last4: paymentDetails.number.substring(
            paymentDetails.number.length - 4
          ),
          expirationDate: paymentDetails.expirationDate
        },
        nonce
      };

      requestPatchAccount(currentUser.account_jwt, payload);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
    actions.setSubmitting(false);
    setAddModeEnabled(false);

    return true;
  };

  return (
    <Box>
      <Typography variant="h5" children="Payment Details" gutterBottom />
      <Typography variant="h6" children="Credit Cards" gutterBottom />
      <Grid container>
        {creditCards.map((creditCardEntity, index) => (
          <Grid key={`credit_card_entity_${index}`} item xs={12} sm={4}>
            <Box border="1px solid #979797" m={1} p={4}>
              <EditablePanel
                title=""
                defaultValues={creditCardEntity}
                Summary={PaymentSummary}
                onRemove={
                  creditCardEntity.isDefault
                    ? undefined
                    : () => deleteCreditCard(creditCardEntity.token)
                }
                onSetDefault={
                  creditCardEntity.isDefault
                    ? undefined
                    : () => setDefaultCreditCard(creditCardEntity.token)
                }
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        {isEmpty(creditCards) && (
          <AlertPanel type="info" text="No Credit Cards. Please add." />
        )}
        {addModeEnabled ? (
          <PaymentForm
            title=""
            onlyCard
            onSubmit={addCreditCard}
            onBack={() => setAddModeEnabled(false)}
          />
        ) : (
          <MenuLink
            onClick={() => setAddModeEnabled(true)}
            children="Add New Credit Card"
          />
        )}
      </Box>
    </Box>
  );
};

AccountPaymentDetails.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired
};

export default AccountPaymentDetails;
