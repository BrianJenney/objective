import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import { useSnackbar } from 'notistack';
import { Box, Grid, Typography } from '@material-ui/core';
import { fetchCreditCardBrainTreeNonce } from '../../utils/braintree';
import { EditablePanel, MenuLink, AlertPanel, Button } from '../common';
import { PaymentSummary } from '../summaries';
import { PaymentForm } from '../forms';

const AccountPaymentDetails = ({
  currentUser,
  requestPatchAccount,
  onBack,
  onSubmit,
  allowFlyMode
}) => {
  const [addModeEnabled, setAddModeEnabled] = useState(false);
  const [flyModeEnabled, setFlyModeEnabled] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const creditCards = get(currentUser, 'data.paymentMethods', []);
  const account_jwt = get(currentUser, 'data.account_jwt', '');
  const deleteCreditCard = deletedCreditCardToken => {
    const payload = { deletedCreditCardToken };

    requestPatchAccount(account_jwt, payload);
  };
  const setDefaultCreditCard = defaultCreditCardToken => {
    const payload = { defaultCreditCardToken };

    requestPatchAccount(account_jwt, payload);
  };
  const addCreditCard = async (paymentDetails, actions) => {
    const { addressBook: currentAddressBook } = currentUser.data;
    const addressBook = currentAddressBook || [];
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

      requestPatchAccount(account_jwt, payload);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
    actions.setSubmitting(false);
    setAddModeEnabled(false);
    setFlyModeEnabled(false);

    return true;
  };

  return (
    <Box>
      <Box mx={1}>
        <Typography variant="h5" children="Payment Details" gutterBottom />
        <Typography variant="h6" children="Credit Cards" gutterBottom />
      </Box>
      <Grid container>
        {creditCards.map((creditCardEntity, index) => {
          const borderStyle = creditCardEntity.isDefault
            ? '2px solid #000'
            : '1px solid #979797';
          return (
            <Grid key={`credit_card_entity_${index}`} item xs={12} sm={4}>
              <Box border={borderStyle} m={1} p={2}>
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
          );
        })}
      </Grid>
      <Box mx={1} my={2}>
        {isEmpty(creditCards) && (
          <AlertPanel type="info" text="No Saved Credit Cards." />
        )}
        {addModeEnabled || flyModeEnabled ? (
          <PaymentForm
            title=""
            onlyCard
            onSubmit={addModeEnabled ? addCreditCard : onSubmit}
            onBack={() => {
              setAddModeEnabled(false);
              setFlyModeEnabled(false);
            }}
            submitLabel={addModeEnabled ? 'Save' : 'Next'}
            backLabel={addModeEnabled ? 'Cancel' : 'Back'}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            fontSize={16}
            fontWeight="bold"
            style={{ textTransform: 'uppercase' }}
          >
            <Box>
              <MenuLink
                onClick={() => {
                  setAddModeEnabled(true);
                  setFlyModeEnabled(false);
                }}
                children="Add New Credit Card"
                underline="always"
              />
            </Box>
            {allowFlyMode && (
              <Box ml={2}>
                <MenuLink
                  onClick={() => {
                    setAddModeEnabled(false);
                    setFlyModeEnabled(true);
                  }}
                  children="Use One-time Credit Card"
                  underline="always"
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
      {!addModeEnabled && !flyModeEnabled && (
        <Box display="flex" alignItems="center">
          {onBack && (
            <Button type="button" onClick={onBack} children="Back" mr={2} />
          )}
          {onSubmit && (
            <Button type="button" onClick={() => onSubmit()} children="Next" />
          )}
        </Box>
      )}
    </Box>
  );
};

AccountPaymentDetails.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func,
  allowFlyMode: PropTypes.bool
};

AccountPaymentDetails.defaultProps = {
  allowFlyMode: false
};

export default AccountPaymentDetails;
