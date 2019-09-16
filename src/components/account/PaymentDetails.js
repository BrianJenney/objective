import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, omit } from 'lodash';
import { useSnackbar } from 'notistack';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { fetchCreditCardBrainTreeNonce } from '../../utils/braintree';
import { EditablePanel, MenuLink, AlertPanel, Button } from '../common';
import { getDefaultEntity } from '../../utils/misc';
import { PaymentSummary } from '../summaries';
import { PaymentForm } from '../forms';

const AccountPaymentDetails = ({
  currentUser,
  requestPatchAccount,
  onBack,
  onSubmit,
  seedEnabled,
  addressSeed,
  useSeedLabel,
  allowFlyMode,
  ...rest
}) => {
  const [addModeEnabled, setAddModeEnabled] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const creditCards = get(currentUser, 'data.paymentMethods', []);
  const account_jwt = get(currentUser, 'data.account_jwt', '');
  const addressBook = get(currentUser, 'data.addressBook', []);

  const deleteCreditCard = deletedCreditCardToken => {
    const payload = { deletedCreditCardToken };

    requestPatchAccount(account_jwt, payload);
  };
  const setDefaultCreditCard = defaultCreditCardToken => {
    const payload = { defaultCreditCardToken };

    requestPatchAccount(account_jwt, payload);
  };
  const handleSave = async (values, actions) => {
    const pureValues = omit(values, ['shouldSaveData']);
    const { shouldSaveData } = values;
    const { paymentDetails, billingAddress } = pureValues;

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
          expirationDate: paymentDetails.expirationDate,
          billingAddress
        },
        nonce
      };

      if (allowFlyMode && !shouldSaveData) {
        actions.setSubmitting(false);
        setAddModeEnabled(false);
        return onSubmit(payload);
      }

      if (isEmpty(creditCards)) {
        payload.newCreditCard.isDefault = true;
      }

      requestPatchAccount(account_jwt, payload);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
    actions.setSubmitting(false);
    setAddModeEnabled(false);

    return true;
  };

  let addressSeedData = addressSeed;
  if (seedEnabled && isEmpty(addressSeed)) {
    addressSeedData = getDefaultEntity(addressBook);
  }
  let isCheckout = false;
  if (window.location.pathname.includes('checkout')) {
    isCheckout = true;
  }

  return (
    <Box {...rest} className="step-3-wrapper">
      {isCheckout ? (
        <Box
          component={Typography}
          mx={1}
          color="#231f20"
          variant="h5"
          children="Credit Card"
          fontFamily="Canela Text, serif"
          gutterBottom
        />
      ) : (
        <Box mx={1} color="#231f20">
          <Typography variant="h5" children="Payment Details" gutterBottom />
          <Typography variant="h6" children="Credit Cards" gutterBottom />
        </Box>
      )}
      <Grid container>
        {creditCards.map((creditCardEntity, index) => {
          const borderStyle = creditCardEntity.isDefault
            ? '2px solid #000'
            : '1px solid #979797';
          return (
            <Grid key={`credit_card_entity_${index}`} item xs={12} sm={6}>
              <Box
                border={borderStyle}
                m={1}
                px={4}
                py={3}
                className="checkout-box"
              >
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
        {addModeEnabled ? (
          <PaymentForm
            title=""
            seedEnabled={seedEnabled}
            addressSeed={addressSeedData}
            useSeedLabel={useSeedLabel}
            onlyCard
            onSubmit={handleSave}
            onBack={() => setAddModeEnabled(false)}
            allowFlyMode={allowFlyMode}
          />
        ) : (
          <Box
            fontSize={16}
            fontWeight="bold"
            style={{ textTransform: 'uppercase' }}
          >
            <MenuLink
              onClick={() => setAddModeEnabled(true)}
              children="Add New Card"
              underline="always"
            />
          </Box>
        )}
      </Box>
      {!addModeEnabled && (
        <ButtonGroup fullWidth aria-label="full width button group">
          {onBack && (
            <Button type="button" onClick={onBack} children="Back" mr={2} />
          )}
          {onSubmit && (
            <Button type="button" onClick={() => onSubmit()} children="Next" />
          )}
        </ButtonGroup>
      )}
    </Box>
  );
};

AccountPaymentDetails.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func,
  seedEnabled: PropTypes.bool,
  addressSeed: PropTypes.object,
  useSeedLabel: PropTypes.string,
  allowFlyMode: PropTypes.bool
};

AccountPaymentDetails.defaultProps = {
  allowFlyMode: false
};

export default AccountPaymentDetails;
