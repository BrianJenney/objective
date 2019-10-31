import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, omit } from 'lodash';
import { useSnackbar } from 'notistack';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { sendCreditCardRequest } from '../../utils/braintree';
import { EditablePanel, MenuLink, AlertPanel, Button } from '../common';
import { getDefaultEntity } from '../../utils/misc';
import { PaymentSummary } from '../summaries';
import { PaymentForm } from '../forms';

export const FORM_TYPES = {
  ACCOUNT: 'account',
  CHECKOUT: 'checkout'
};

const usePrevious = value => {
  const useRefObj = useRef();
  useEffect(() => {
    useRefObj.current = value;
  }, [value]);
  return useRefObj.current;
};

/*
* @description - Wrapper function for tracking the Payment Info Entered Segment Event
* @return void
*/
const trackSegmentPaymentInfoEnteredEvent = properties => {
  window.analytics.track("Payment Info Entered",properties);
}

const AccountPaymentDetails = ({
  currentUser,
  requestPatchAccount,
  clearPatchAccountError,
  formType,
  onBack,
  onSubmit,
  selectionEnabled,
  seedEnabled,
  addressSeed,
  useSeedLabel,
  allowFlyMode,
  backLabel,
  submitLabel,
  ...rest
}) => {
  const [formModeEnabled, setFormModeEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const prevPatchAccountSubmitting = usePrevious(
    currentUser.patchAccountSubmitting
  );
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const creditCards = get(currentUser, 'data.paymentMethods', []);
  const account_jwt = get(currentUser, 'data.account_jwt', '');
  const addressBook = get(currentUser, 'data.addressBook', []);
  const titleFontSize = formType === FORM_TYPES.ACCOUNT ? 48 : xs ? 24 : 30; // eslint-disable-line

  useEffect(() => {
    if (window.location.pathname.indexOf('/account/payment-details') !== -1) {
      window.analytics.page('Account Payment Details');
    }
  }, []);

  useEffect(() => {
    const paymentMethods = currentUser.data.paymentMethods || [];

    if (selectedIndex < 0) {
      const defaultIndex = paymentMethods.findIndex(method => method.isDefault);
      setSelectedIndex(defaultIndex);
    }

    if (
      prevPatchAccountSubmitting &&
      !currentUser.patchAccountSubmitting &&
      formModeEnabled
    ) {
      if (!currentUser.patchAccountError && paymentMethods.length > 0) {
        setSelectedIndex(paymentMethods.length - 1);
        if (onSubmit) {
          onSubmit(paymentMethods[paymentMethods.length - 1]);
        }
      }
    }

    if (paymentMethods.length === 0) {
      setFormModeEnabled(true);
    } else {
      setFormModeEnabled(false);
    }
  }, [currentUser.data.paymentMethods]);

  const handleSelect = evt => {
    const index = parseInt(evt.target.value, 10);
    setSelectedIndex(index);
  };

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
      const cardResult = await sendCreditCardRequest({
        ...paymentDetails,
        zipcode: billingAddress.zipcode
      });
      const { nonce, details } = cardResult.creditCards[0];
      const payload = {
        newCreditCard: {
          name: paymentDetails.cardholderName,
          cardType: details.cardType,
          last4: details.lastFour,
          expirationDate: paymentDetails.expirationDate,
          billingAddress
        },
        nonce
      };

      trackSegmentPaymentInfoEnteredEvent({payment_method:cardData.details.cardType});

      if (allowFlyMode && !shouldSaveData) {
        actions.setSubmitting(false);
        setFormModeEnabled(false);

        return onSubmit({
          ...payload.newCreditCard,
          nonce: payload.nonce
        });
      }

      if (isEmpty(creditCards)) {
        payload.newCreditCard.isDefault = true;
      }

      requestPatchAccount(account_jwt, payload);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
    actions.setSubmitting(false);

    return true;
  };

  const handleSubmit = () => {
    if (selectedIndex < 0) {
      return false;
    }

    const selectedCreditCard = creditCards[selectedIndex];
    onSubmit(selectedCreditCard);

    return true;
  };

  let addressSeedData = addressSeed;
  if (seedEnabled && isEmpty(addressSeed)) {
    addressSeedData = getDefaultEntity(addressBook);
  }

  return (
    <Box {...rest} className="step-3-wrapper account-payment-details">
      {formModeEnabled ? (
        <PaymentForm
          currentUser={currentUser}
          seedEnabled={seedEnabled}
          addressSeed={addressSeedData}
          useSeedLabel={useSeedLabel}
          onlyCard
          clearPatchAccountError={clearPatchAccountError}
          onSubmit={handleSave}
          onBack={() => setFormModeEnabled(false)}
          allowFlyMode={allowFlyMode}
        />
      ) : (
        <>
          {(!xs || formType !== FORM_TYPES.ACCOUNT) && (
            <Box
              component={Typography}
              color="#231f20"
              variant="h5"
              children={
                formType === FORM_TYPES.ACCOUNT
                  ? 'Payment Details'
                  : 'Credit Card'
              }
              fontSize={titleFontSize}
              mb={formType === FORM_TYPES.ACCOUNT ? 4 : 3}
            />
          )}
          {!xs && formType === FORM_TYPES.ACCOUNT && (
            <Box
              color="#231f20"
              component={Typography}
              variant="h5"
              children="Credit Card"
              fontSize={18}
              fontWeight={600}
              fontFamily="p22-underground"
              style={{ textTransform: 'uppercase' }}
              mb={4}
            />
          )}
          {isEmpty(creditCards) && (
            <AlertPanel mb={2} type="info" text="No Saved Credit Cards." />
          )}
          <Box mx="-8px" my="-8px">
            <Grid container>
              {creditCards.map((creditCardEntity, index) => (
                <Grid key={`credit_card_entity_${index}`} item xs={12} sm={6}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    m={1}
                    px={4}
                    py={3}
                    border="2px solid #979797"
                  >
                    {selectionEnabled && (
                      <Box ml="-17px" mt="-9px">
                        <Radio
                          name="payment-method-selector"
                          style={{ color: '#231f20' }}
                          value={index.toString()}
                          onChange={handleSelect}
                          checked={selectedIndex === index}
                        />
                      </Box>
                    )}
                    <Box
                      maxWidth={
                        selectionEnabled ? 'calc(100% - 28.5px)' : '100%'
                      }
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
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            mt="26px"
            fontSize={xs ? 14 : 16}
            fontWeight={600}
            style={{ textTransform: 'uppercase' }}
          >
            <MenuLink
              onClick={() => setFormModeEnabled(true)}
              children="Add New Card"
              underline="always"
            />
          </Box>
          <Box mt={xs ? '28px' : '55px'}>
            <ButtonGroup fullWidth>
              {onBack && (
                <Button
                  color="secondary"
                  type="button"
                  onClick={onBack}
                  children={backLabel}
                  mr={2}
                />
              )}
              {onSubmit && (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  children={submitLabel}
                />
              )}
            </ButtonGroup>
          </Box>
        </>
      )}
    </Box>
  );
};

AccountPaymentDetails.propTypes = {
  currentUser: PropTypes.object.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  clearPatchAccountError: PropTypes.func.isRequired,
  formType: PropTypes.oneOf(Object.values(FORM_TYPES)),
  onBack: PropTypes.func,
  onSubmit: PropTypes.func,
  selectionEnabled: PropTypes.bool,
  seedEnabled: PropTypes.bool,
  addressSeed: PropTypes.object,
  useSeedLabel: PropTypes.string,
  allowFlyMode: PropTypes.bool,
  backLabel: 'Back',
  submitLabel: 'Next'
};

AccountPaymentDetails.defaultProps = {
  formType: FORM_TYPES.ACCOUNT,
  allowFlyMode: false
};

export default AccountPaymentDetails;
