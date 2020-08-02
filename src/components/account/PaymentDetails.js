import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { get, isEmpty, omit } from 'lodash';
import { useSnackbar } from 'notistack';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';

import { useSelector, useDispatch } from 'react-redux';
import { EditablePanel, MenuLink, AlertPanel, Button } from '../common';
import { getDefaultEntity } from '../../utils/misc';
import { PaymentSummary } from '../summaries';
import { PaymentForm } from '../forms';
import { sendPaypalCheckoutRequest } from '../../utils/braintree';
import { setCheckoutPaypalPayload } from '../../modules/paypal/actions';

const useStyles = makeStyles(theme => ({
  formControlLabel: {
    fontSize: '20px',
    fontFamily: theme.typography.bodyFontFamily,
    color: theme.palette.brand.camoGreen,
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px'
    }
  },
  mobileLogin: {
    fontSize: '16px',
    fontFamily: theme.typography.bodyFontFamily
  },
  subTitle: {
    textAlign: 'right',
    fontSize: '16px',
    fontWeight: 'normal',
    fontFamily: theme.typography.bodyFontFamily,
    marginLeft: '3px',
    marginBottom: '16px',
    marginTop: '8px'
  },
  title: {
    fontSize: '26px',
    fontFamily: theme.typography.headerFontFamily,
    color: theme.palette.brand.camoGreen
  },
  mobileTitle: {
    fontSize: '24px',
    fontFamily: theme.typography.headerFontFamily
  }
}));

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
  window.analytics.track('Payment Info Entered', properties);
};

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
  const [paymentMethodMode, setPaymentMethodMode] = useState('creditCard');
  const [ppButtonRendered, setPpButtonRendered] = useState(false);
  const dispatch = useDispatch();
  const paypalPayloadState = useSelector(state => state.paypal);
  const paypalEmail =
    Object.keys(paypalPayloadState).length > 0 &&
    paypalPayloadState.details &&
    paypalPayloadState.details.email
      ? paypalPayloadState.details.email
      : false;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const prevPatchAccountSubmitting = usePrevious(currentUser.patchAccountSubmitting);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  const creditCards = get(currentUser, 'data.paymentMethods', []);
  const account_jwt = get(currentUser, 'data.account_jwt', '');
  const addressBook = get(currentUser, 'data.addressBook', []);
  const titleFontSize = formType === FORM_TYPES.ACCOUNT ? 36 : xs ? 24 : 30; // eslint-disable-line
  const cart = useSelector(state => state.cart);
  const orderErrorMessageState = useSelector(state => state.order.order);
  const orderErrorState = useSelector(state => state.order.transactionError);
  const orderErrorMessage = usePrevious(orderErrorMessageState);
  const orderError = usePrevious(orderErrorState);

  useEffect(() => {
    if (window.location.pathname.indexOf('/account/payment-details') !== -1) {
      window.analytics.page('Account Payment Details');
    }
  }, []);

  useEffect(() => {
    if (rest.resetFormMode && creditCards.length === 0 && !account_jwt) {
      setFormModeEnabled(true);
    }
  }, [rest]);

  useEffect(() => {
    if (paypalEmail) {
      setPaymentMethodMode('paypal');
    }
  }, [paypalPayloadState]);

  useEffect(() => {
    const paymentMethods = currentUser.data.paymentMethods || [];
    const defaultIndex = paymentMethods.findIndex(method => method.isDefault);
    // if there is a default payment method, select it.
    if (defaultIndex !== -1) {
      setSelectedIndex(defaultIndex);
    } else if (paymentMethods.length > 0) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(-1);
    }

    if (prevPatchAccountSubmitting && !currentUser.patchAccountSubmitting && formModeEnabled) {
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
    if (allowFlyMode && !values) {
      actions.setSubmitting(false);
      setFormModeEnabled(false);
      return onSubmit(false);
    }
    const pureValues = omit(values, ['shouldSaveData']);
    const { shouldSaveData } = values;
    const { cardData, paymentDetails, billingAddress } = pureValues;

    try {
      const payload = {
        newCreditCard: {
          name: paymentDetails.cardholderName,
          cardType: cardData.details.cardType,
          last4: cardData.details.lastFour,
          expirationDate: `${cardData.details.expirationMonth}/${cardData.details.expirationYear}`,
          billingAddress,
          isDefault: false
        },
        nonce: cardData.nonce
      };

      trackSegmentPaymentInfoEnteredEvent({
        cart_id: cart._id,
        payment_method: cardData.details.cardType
      });

      if (allowFlyMode && !account_jwt) {
        actions.setSubmitting(false);
        setFormModeEnabled(false);

        return onSubmit({
          ...payload.newCreditCard,
          nonce: payload.nonce,
          saveToAccount: shouldSaveData,
          isDefault: !!shouldSaveData
        });
      }
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
    if (paymentMethodMode === 'paypal' && paypalEmail) {
      dispatch(setCheckoutPaypalPayload(paypalPayloadState));
      onSubmit(false);
      return true;
    }
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

  const getPaypalBraintreeNonce = async () => {
    if (!cart) {
      return null;
    }
    const { total, shippingAddress } = cart;
    if (
      !cart ||
      total === 0 ||
      document.getElementById('paypal-checkout-button-payment-details') === null
    ) {
      return null;
    }
    setPpButtonRendered(true);
    const paypalRequest = await sendPaypalCheckoutRequest(
      total,
      shippingAddress,
      {
        label: 'checkout',
        shape: 'rect',
        color: 'gold',
        height: 55,
        size: 'responsive',
        tagline: 'false'
      },
      '#paypal-checkout-button-payment-details'
    );

    dispatch(setCheckoutPaypalPayload(paypalRequest));
  };

  if (!ppButtonRendered && cart) {
    getPaypalBraintreeNonce();
  }

  useEffect(() => {
    if (ppButtonRendered && cart && cart.total > 0 && formModeEnabled === false) {
      const paypalCheckoutButton = document.getElementById(
        'paypal-checkout-button-payment-details'
      );
      paypalCheckoutButton.innerHTML = '';
      getPaypalBraintreeNonce();
    }
  }, [cart, formModeEnabled]);

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
          checkoutVersion={rest.checkoutVersion ? rest.checkoutVersion : 1}
          cart={cart}
          submitLabel={submitLabel}
        />
      ) : (
        <>
          {(!xs || formType !== FORM_TYPES.ACCOUNT) && (
            <>
              <Box
                display={formType === FORM_TYPES.CHECKOUT ? 'block' : 'none'}
                mb={0}
                className="justify-content"
              >
                <Typography
                  color="#231f20"
                  variant="h5"
                  fontSize={xs ? 24 : 30}
                  className={xs ? classes.mobileTitle : classes.title}
                >
                  Secure Payment
                </Typography>

                <Box>
                  <Typography
                    variant="body1"
                    className={xs ? classes.mobileLogin : classes.subTitle}
                    style={{ textAlign: 'left', margin: '0px' }}
                  >
                    All transactions are secure and encrypted
                  </Typography>
                </Box>
              </Box>
              <Box
                component={Typography}
                color={theme.palette.brand.camoGreen}
                variant="h5"
                children={formType === FORM_TYPES.ACCOUNT ? 'Payment Details' : 'Credit Card'}
                mb={formType === FORM_TYPES.ACCOUNT ? 4 : 3}
                style={{ display: formType === FORM_TYPES.CHECKOUT ? 'none' : 'block' }}
              />
              {typeof orderErrorMessage === 'string' && orderError && (
                <AlertPanel mb={2} type="error" text={orderErrorMessage} />
              )}
              <FormControlLabel
                key="formControlLabelCreditCardMode"
                style={{ marginLeft: '-6px' }}
                value="creditCard"
                control={<Radio color="secondary" size="small" />}
                label="Credit Card"
                classes={{ label: classes.formControlLabel }}
                onClick={evt => {
                  setPaymentMethodMode(evt.target.value);
                }}
                checked={paymentMethodMode === 'creditCard'}
                style={{ display: formType !== FORM_TYPES.ACCOUNT ? 'block' : 'none' }}
              />
            </>
          )}
          {isEmpty(creditCards) && paymentMethodMode === 'creditCard' && (
            <AlertPanel mb={2} type="info" text="No Saved Credit Cards." />
          )}
          <Box mx="0px" my="-8px">
            <Grid
              container
              style={{ display: paymentMethodMode === 'creditCard' ? 'flex' : 'none' }}
            >
              {creditCards.map((creditCardEntity, index) => (
                <Grid key={`credit_card_entity_${index}`} item xs={12} sm={5}>
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    m={1}
                    px={4}
                    py={3}
                    style={{ marginLeft: '0px' }}
                    className="ListBox"
                  >
                    {selectionEnabled && (
                      <Box ml="-17px" mt="-9px">
                        <Radio
                          name="payment-method-selector"
                          value={index.toString()}
                          onChange={handleSelect}
                          checked={selectedIndex === index}
                        />
                      </Box>
                    )}
                    <Box maxWidth={selectionEnabled ? 'calc(100% - 28.5px)' : '100%'}>
                      <EditablePanel
                        title=""
                        defaultValues={creditCardEntity}
                        Summary={PaymentSummary}
                        checkoutVersion={rest.checkoutVersion ? rest.checkoutVersion : 1}
                        onRemove={() => deleteCreditCard(creditCardEntity.token)}
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
              <Grid item xs={12} sm={5}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize={xs ? 14 : 16}
                  fontWeight={600}
                  m={1}
                  ml={0}
                  px={1}
                  py={5.9}
                  border="1px solid #a06958"
                >
                  <div style={{ textAlign: 'center' }} onClick={() => setFormModeEnabled(true)}>
                    <AddIcon
                      style={{
                        fontSize: '50px',
                        color: theme.palette.brand.accentBrown,
                        cursor: 'pointer'
                      }}
                    />
                    <MenuLink
                      style={{
                        display: 'block',
                        color: theme.palette.brand.accentBrown,
                        fontWeight: 400
                      }}
                      children="Add New Card"
                      underline="always"
                    />
                  </div>
                </Box>
              </Grid>
            </Grid>
            <FormControlLabel
              key="formControlLabelCreditCardMode"
              style={{ marginLeft: '-6px' }}
              value="paypal"
              control={<Radio color="secondary" size="small" />}
              label={paypalEmail ? `PayPal: ${paypalEmail}` : 'PayPal'}
              classes={{ label: classes.formControlLabel }}
              onClick={evt => {
                setPaymentMethodMode(evt.target.value);
              }}
              checked={paymentMethodMode === 'paypal'}
              style={{ display: formType !== FORM_TYPES.ACCOUNT ? 'block' : 'none' }}
            />

            <Grid
              item
              xs={12}
              style={{ display: paymentMethodMode === 'paypal' && !paypalEmail ? 'block' : 'none' }}
            >
              <Box>
                <Typography
                  variant="body1"
                  className={xs ? classes.mobileLogin : classes.subTitle}
                  style={{ textAlign: 'left', margin: '0px' }}
                >
                  Click below to continue with PayPal
                </Typography>
              </Box>

              <Grid container style={{ marginTop: '11px' }}>
                <div id="paypal-checkout-button-payment-details" style={{ width: '100%' }}></div>
              </Grid>
            </Grid>
          </Box>

          <Box
            mt={xs ? '28px' : '55px'}
            style={{
              display:
                paymentMethodMode === 'creditCard' ||
                (paymentMethodMode === 'paypal' && paypalEmail)
                  ? 'block'
                  : 'none'
            }}
          >
            <ButtonGroup fullWidth>
              {onBack && paymentMethodMode === 'creditCard' && (
                <Button
                  color="secondary"
                  type="button"
                  onClick={onBack}
                  children={backLabel}
                  mr={2}
                  style={{
                    height: '55px',
                    padding: '0px'
                  }}
                />
              )}
              {onSubmit && (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  children={submitLabel}
                  disabled={selectedIndex === -1}
                  style={{
                    height: '55px',
                    padding: '0px',
                    display:
                      paymentMethodMode === 'creditCard' ||
                      (paymentMethodMode === 'paypal' && paypalEmail)
                        ? 'block'
                        : 'none'
                  }}
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
