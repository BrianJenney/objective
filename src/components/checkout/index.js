/* eslint-disable camelcase */
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { get, isNil } from 'lodash';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { Panel, Loader, MenuLink } from '../common';
import { AccountAddresses, AccountPaymentDetails } from '../account';
import { FORM_TYPES as PAYMENT_FORM_TYPES } from '../account/PaymentDetails';
import { AddressSummary, PaymentSummary } from '../summaries';
import { CheckoutReviewForm } from '../forms';
import { FORM_TYPES as ADDRESS_FORM_TYPES } from '../forms/AddressForm';
import CartDrawer from '../../pages/cart/CartDrawer';
import { STEP_KEYS, STEPS_V2 } from './constants';
import { scrollToRef } from '../../utils/misc';
import '../../pages/checkout/checkout-styles.scss';
import { requestSetShippingAddress } from '../../modules/cart/actions';
import { requestCheckEmailExistence } from '../../modules/account/actions';
import { resetOrderState } from '../../modules/order/actions';
import { setCheckoutPaypalPayload, unsetCheckoutPaypalPayload } from '../../modules/paypal/actions';
import TransactionMessage from './TransactionMessage';
import StateRestrictionsDialog from './StateRestrictionsDialog';
import Login from '../Login';
import { sendPaypalCheckoutRequest } from '../../utils/braintree';
const localStorageClient = require('store');

const getPanelTitleContent = (xs, step, activeStep, payload) => {
  const isActiveStep = step === activeStep;
  const stepTitle = STEPS_V2[step];
  const titleViewBgcolor = isActiveStep ? '#003833' : '#fbf7f3';
  const titleViewColor = isActiveStep ? '#ffffff' : '#4a4a4a';
  const titleView = (
    <Box
      px={xs ? '18px' : 3}
      py={2}
      width={1}
      color={titleViewColor}
      bgcolor={titleViewBgcolor}
      display="flex"
      alignItems="center"
      fontFamily="p22-underground, Helvetica, sans-serif"
      fontSize={xs ? 14 : 18}
      style={{ textTransform: 'uppercase' }}
      className="checkoutPanel"
    >
      <Box mr={1} children={`STEP ${step + 1}`} />
      <Box children={stepTitle} style={{ fontWeight: 600 }} />
    </Box>
  );
  let payloadSummary = null;

  if (!isNil(payload)) {
    if (step === 0) {
      payloadSummary = <AddressSummary checkoutVersion={2} noDefault values={payload} />;
    } else if (step === 1) {
      payloadSummary = <PaymentSummary checkoutVersion={2} noDefault values={payload} />;
    }
  }

  const payloadView =
    payloadSummary && !isActiveStep ? (
      <Box
        width={1}
        px={xs ? 8 : 14}
        py={xs ? 3 : 4}
        bgcolor="rgba(252, 248, 244, 0.5)"
        color="#231f20"
      >
        {payloadSummary}
      </Box>
    ) : null;

  return (
    <>
      {titleView}
      {payloadView}
    </>
  );
};

const Checkout = ({
  history,
  currentUser,
  cart,
  emitOrderSubmitted,
  clearCreateAccountError,
  requestLogin,
  clearLoginError,
  requestPatchAccount,
  clearPatchAccountError
}) => {
  const hideLPCoupon = !!history.location.state;
  const [payload, setPayload] = useState({});
  const [resetFormMode, setResetFormMode] = useState(false);
  const [authMode, setAuthMode] = useState('shipping');
  const [resetPaymentDetailsFormMode, setResetPaymentDetailsFormMode] = useState(false);
  const [shippingAddressActive, setShippingAddressActive] = useState({});
  const [accountCreated, setAccountCreated] = useState(false);
  const [paymentDetailsUpdated, setPaymentDetailsUpdated] = useState(false);
  const [addressBookUpdated, setAddressBookUpdated] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const { account_jwt, email: currentUserEmail, paymentMethods } = currentUser.data;
  const order = useSelector(state => state.order.order);
  const orderError = useSelector(state => state.order.transactionError);
  const orderIsLoading = useSelector(state => state.order.isLoading);
  const paypalPayloadState = useSelector(state => state.paypal);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const stepRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  // I don't want to have to disable the linter rule, but i also don't want to
  // devise, implement, & test a different way.  This is unrelated to EDA.
  // eslint-disable-next-line no-unused-vars
  const [closeShippingRestrictions, setCloseShippingRestrictions] = useState(false);
  const [restrictionMessage, setRestrictionMessage] = useState(false);
  const [restrictedProduct, setRestrictedProduct] = useState('');
  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  // const closeShippingRestrictionsDialog = useCallback(() => {
  //   setCloseShippingRestrictions(true);
  // }, [setCloseShippingRestrictions]);

  setTimeout(() => {
    setLoading(false);
  }, 300);

  const trackCheckoutStarted = () => {
    const orderItemsTransformed = [];
    cart.items.forEach(item => {
      orderItemsTransformed.push({
        image_url: item.variant_img,
        quantity: item.quantity,
        sku: item.sku,
        price: Number.parseFloat(item.unit_price),
        product_id: item.variant_id,
        variant: item.variant_id,
        name: item.variant_name,
        brand: cart.storeCode
      });
    });
    window.analytics.page('Checkout');
    window.analytics.track('Checkout Started', {
      cart_id: cart._id,
      currency: 'USD',
      discount: cart.discount ? Number.parseFloat(cart.discount) : 0,
      products: orderItemsTransformed,
      subtotal: cart.subtotal ? Number.parseFloat(cart.subtotal) : 0,
      tax: cart.tax ? Number.parseFloat(cart.tax) : 0,
      total: cart.total ? Number.parseFloat(cart.total) : 0
    });
  };

  // Reset signupError, patchError upon component unmount
  useEffect(
    () => () => {
      clearPatchAccountError();
      clearCreateAccountError();
    },
    []
  );

  // Set step 2 to active if there are any patch account errors
  useEffect(() => {
    if (
      accountCreated &&
      !paymentDetailsUpdated &&
      currentUser.patchAccountError &&
      currentUser.patchAccountError.length > 0
    ) {
      setResetPaymentDetailsFormMode(true);
      scrollToRef(stepRefs[1]);
      setActiveStep(1);
    }
  }, [currentUser.patchAccountError]);

  useEffect(() => {
    const isGuest =
      currentUser.data.isGuest && currentUser.data.isGuest ? currentUser.data.isGuest : false;
    if (accountCreated && paymentDetailsUpdated && !addressBookUpdated && !isGuest) {
      requestPatchAccount(account_jwt, {
        addressBook: [payload.shippingAddress]
      });
      setAddressBookUpdated(true);
    }
  }, [paymentDetailsUpdated]);

  useEffect(() => {
    if (accountCreated && !paymentDetailsUpdated && paymentMethods.length > 0) {
      setPayload({
        ...payload,
        paymentDetails: paymentMethods[0]
      });
      setPaymentDetailsUpdated(true);
    }
  }, [paymentMethods]);

  useEffect(() => {
    const isPaypalPaymentMethod = !!(payload.method && payload.method === 'paypal');
    const isGuest =
      currentUser.data.isGuest && currentUser.data.isGuest ? currentUser.data.isGuest : false;

    if (
      accountCreated &&
      account_jwt &&
      !paymentDetailsUpdated &&
      (isPaypalPaymentMethod || isGuest)
    ) {
      setPaymentDetailsUpdated(true);
    }
  }, [accountCreated]);

  useEffect(() => {
    if (!accountCreated && currentUser.data.account_jwt && activeStep === 2) {
      // Update payment details
      setAccountCreated(true);
    }
  }, [currentUser.data.account_jwt]);

  useEffect(() => {
    if (activeStep === 2 && !accountCreated) {
      const isGuest = !!(
        (payload.paymentDetails.billingAddress.password &&
          payload.paymentDetails.billingAddress.password.length === 0) ||
        !payload.paymentDetails.billingAddress.password
      );

      const accountInfoPayload = {
        storeCode: cart.storeCode,
        email: currentUserEmail || payload.shippingAddress.email.toLowerCase(),
        password: !isGuest ? payload.paymentDetails.billingAddress.password : ''
      };

      setPayload({
        ...payload,
        accountInfo: accountInfoPayload
      });
    }

    if (
      activeStep === 1 &&
      !account_jwt &&
      payload.paymentDetails &&
      payload.paymentDetails.billingAddress
    ) {
      setResetPaymentDetailsFormMode(true);
    }
  }, [activeStep]);

  useEffect(() => {
    if (Object.keys(paypalPayloadState).length > 0) {
      // Make a copy and preserve to preserve the payload
      const paymentDetailsPayload = JSON.parse(JSON.stringify(paypalPayloadState));
      // normalize paymentDetailsPayload
      paymentDetailsPayload.details.shippingAddress.address1 =
        paymentDetailsPayload.details.shippingAddress.line1;
      paymentDetailsPayload.details.shippingAddress.address2 = paymentDetailsPayload.details
        .shippingAddress.line2
        ? (paymentDetailsPayload.details.shippingAddress.address1 =
            paymentDetailsPayload.details.shippingAddress.line2)
        : '';
      paymentDetailsPayload.details.shippingAddress.zipcode =
        paymentDetailsPayload.details.shippingAddress.postalCode;
      paymentDetailsPayload.details.shippingAddress.country =
        paymentDetailsPayload.details.shippingAddress.countryCode;
      paymentDetailsPayload.details.shippingAddress.firstName =
        paymentDetailsPayload.details.firstName;
      paymentDetailsPayload.details.shippingAddress.lastName =
        paymentDetailsPayload.details.lastName;
      delete paymentDetailsPayload.details.shippingAddress.line1;
      if (paymentDetailsPayload.details.shippingAddress.line2) {
        delete paymentDetailsPayload.details.shippingAddress.line2;
      }
      delete paymentDetailsPayload.details.shippingAddress.postalCode;
      delete paymentDetailsPayload.details.shippingAddress.countryCode;
      delete paymentDetailsPayload.details.shippingAddress.recipientName;
      setTimeout(() => {
        setPayload({
          ...payload,
          nonce: paymentDetailsPayload.nonce,
          paymentDetails: {
            ...paymentDetailsPayload.details,
            nonce: paymentDetailsPayload.nonce,
            billingAddress: { ...paymentDetailsPayload.details.shippingAddress, password: '' },
            method: 'paypal'
          },
          shippingAddress: {
            ...paymentDetailsPayload.details.shippingAddress,
            email: paymentDetailsPayload.details.email
          },
          shippingMethod:
            cart.shipping && cart.shipping.options && cart.shipping.code
              ? cart.shipping.options[cart.shipping.code]
              : {},
          method: 'paypal'
        });

        setShippingAddressActive(paymentDetailsPayload.details.shippingAddress);
        dispatch(
          requestSetShippingAddress(cart._id, paymentDetailsPayload.details.shippingAddress)
        );
        setActiveStep(2);
      }, 100);
    }
  }, [paypalPayloadState]);

  useEffect(() => {
    if (orderIsLoading || orderError) {
      setCheckoutDialogOpen(true);
    } else {
      handleCheckoutDialogClose();
      if (orderError === false) {
        dispatch(unsetCheckoutPaypalPayload());
        setPayload({});
        history.replace('/order', hideLPCoupon);
      }
    }
  }, [orderError, orderIsLoading]);

  useEffect(() => {
    if (!account_jwt && activeStep > 0) {
      history.push('/');
    }
  }, [currentUser.data.account_jwt]);

  useEffect(() => {
    if (account_jwt && authMode === 'login' && activeStep === 0) {
      setAuthMode('shipping');
    }
  }, [currentUser.data.account_jwt]);

  useEffect(() => {
    if (activeStep === 1) {
      setShippingAddressActive(payload.shippingAddress);
      dispatch(requestSetShippingAddress(cart._id, payload.shippingAddress));
      if (
        payload.shippingAddress &&
        payload.shippingAddress.email &&
        typeof payload.shippingAddress.email === 'string' &&
        !account_jwt
      ) {
        dispatch(requestCheckEmailExistence(payload.shippingAddress.email));
      }
    }
  }, [activeStep, payload.shippingAddress]);

  useEffect(() => {
    if (cart && cart._id) {
      trackCheckoutStarted();
      trackCheckoutStepStarted(0);
      scrollToRef(stepRefs[0]);
    }
  }, [cart._id]);

  useEffect(() => {
    if (cart.shipping) {
      setPayload({
        ...payload,
        shippingMethod: cart.shipping.options[cart.shipping.code]
      });
    }
  }, [cart.shipping]);

  // Cart is empty, go to Home page
  useEffect(() => {
    if (cartCount === 0 && cart._id) {
      history.push('/');
    }
  }, [cart._id]);

  useEffect(() => {
    if (orderError && activeStep === 2) {
      setActiveStep(1);
    }
  }, [orderError]);

  const handleCheckoutDialogClose = () => {
    setCheckoutDialogOpen(false);
    dispatch(resetOrderState());
  };

  const handleAddressesAndCardSteps = async values => {
    const NEW_STEP_KEYS = STEP_KEYS.slice(1, 4);
    const key = NEW_STEP_KEYS[activeStep];

    if (!values) {
      return true;
    }

    setPayload({ ...payload, [key]: values });

    if (activeStep === 1 && isNil(payload[NEW_STEP_KEYS[0]])) {
      return false;
    }

    return true;
  };

  const handleReviewStep = values => {
    // Review step should only progress on Click event
    if (!values.nativeEvent) {
      return false;
    }
    const paymentMethodNonce = get(payload, 'paymentDetails.nonce');
    const paymentMethodToken = get(payload, 'paymentDetails.token');

    if (!account_jwt) {
      payload.shippingAddress.saveToAccount = true;
      payload.shippingAddress.isDefault = true;
    }
    delete payload.paymentDetails.billingAddress.password;
    delete payload.paymentDetails.billingAddress.shouldSubscribe;
    delete payload.shippingAddress.shouldSubscribe;
    if (paymentMethodNonce) {
      if (cart.items.length > 0) {
        emitOrderSubmitted({
          cartId: cart._id,
          email: payload.shippingAddress.email,
          ...payload,
          payment: { paymentMethodNonce },
          customerJwt: account_jwt || localStorageClient.get('olympusToken')
        });
      }
    } else if (paymentMethodToken) {
      if (cart.items.length > 0) {
        emitOrderSubmitted({
          cartId: cart._id,
          email: currentUser.data.email,
          ...payload,
          payment: { paymentMethodToken },
          customerJwt: account_jwt || localStorageClient.get('olympusToken')
        });
      }
    } else {
      return false;
    }

    if (orderIsLoading === true || orderError === null) return null;

    if (orderError === true) {
      setCheckoutDialogOpen(true);
    } else {
      setPayload({});
      history.replace('/order', hideLPCoupon);
    }
    return true;
  };

  const checkoutStepNames = ['Shipping', 'Payment', 'Review'];
  /*
  @description - Tracks Segment Analytics 'Checkout Step Completed' event
  */
  const trackCheckoutStepCompleted = step => {
    window.analytics.track('Checkout Step Completed', {
      cart_id: cart._id,
      step: step + 1,
      step_name: checkoutStepNames[step]
    });
  };

  const trackCheckoutStepStarted = step => {
    window.analytics.track('Checkout Step Started', {
      cart_id: cart._id,
      step: step + 1,
      step_name: checkoutStepNames[step]
    });
  };

  const setCurrentStep = stepIndex => {
    setActiveStep(stepIndex);
    trackCheckoutStepStarted(stepIndex);
    setTimeout(() => {
      scrollToRef(stepRefs[stepIndex]);
    }, 400);
  };

  const handleBack = () => activeStep > 0 && setCurrentStep(activeStep - 1);
  const handleNext = async values => {
    let result = null;
    if (activeStep <= 1) {
      result = await handleAddressesAndCardSteps(values);
    } else if (activeStep === 2) {
      handleReviewStep(values); // <-- Here! direct to /order page
      return true;
    }
    if (result) {
      setCurrentStep(activeStep + 1);
      trackCheckoutStepCompleted(activeStep);
    }
    return true;
  };

  const onPanelChange = (expanded, panelIndex) => {
    const NEW_STEP_KEYS = STEP_KEYS.slice(1, 4);
    const shippingKey = NEW_STEP_KEYS[0];
    const paymentKey = NEW_STEP_KEYS[1];

    if (
      !expanded ||
      activeStep === 0 ||
      ([2, 3].includes(panelIndex) && (isNil(payload[shippingKey]) || isNil(payload[paymentKey])))
    ) {
      return false;
    }
    trackCheckoutStepCompleted(panelIndex);
    if (panelIndex === 0) {
      setResetFormMode(true);
    }
    return setCurrentStep(panelIndex);
  };

  // eslint-disable-next-line consistent-return
  const getPaypalBraintreeNonce = async () => {
    const { total, shippingAddress } = cart;
    if (!cart || total === 0 || document.getElementById('paypal-checkout-button') === null) {
      return null;
    }

    const paymentDetailsPayload = await sendPaypalCheckoutRequest(
      total,
      shippingAddress,
      {
        label: 'paypal',
        shape: 'rect',
        color: 'gold',
        height: 45,
        size: 'responsive',
        tagline: 'false'
      },
      '#paypal-checkout-button'
    );
    dispatch(setCheckoutPaypalPayload(paymentDetailsPayload));
  };

  const paypalCheckoutButton = document.getElementById('paypal-checkout-button');
  useEffect(() => {
    if (activeStep === 0 && paypalCheckoutButton !== null) {
      paypalCheckoutButton.innerHTML = '';
      getPaypalBraintreeNonce();
    }
  }, [activeStep, paypalCheckoutButton, cart.total]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box bgcolor="rgba(252, 248, 244, 0.5)">
          <Container>
            <Box py={10} className="checkout-wrapper">
              <CssBaseline />
              <Grid container spacing={4}>
                {xs ? (
                  <MenuLink
                    to="/gallery"
                    children=" < Continue Shopping"
                    underline="always"
                    style={{ fontSize: '14px', padding: '50px 20px 12px' }}
                  />
                ) : null}
                <Grid
                  item
                  flex={1}
                  xs={12}
                  md={8}
                  style={xs ? { padding: 0 } : {}}
                  className="right-side"
                >
                  <div ref={stepRefs[0]}>
                    <Panel
                      title={getPanelTitleContent(xs, 0, activeStep, null, payload.shippingAddress)}
                      collapsible
                      expanded={activeStep === 0}
                      onChange={e => onPanelChange(e, 0)}
                    >
                      {authMode === 'shipping' ? (
                        <AccountAddresses
                          checkoutVersion={2}
                          currentUser={currentUser}
                          cart={cart}
                          setRestrictionMessage={setRestrictionMessage}
                          setRestrictedProduct={setRestrictedProduct}
                          requestPatchAccount={requestPatchAccount}
                          clearPatchAccountError={clearPatchAccountError}
                          formType={ADDRESS_FORM_TYPES.CHECKOUT}
                          onSubmit={handleNext}
                          selectionEnabled
                          allowFlyMode
                          resetFormMode={resetFormMode}
                          shippingAddressActive={shippingAddressActive}
                          switchToLogin={() => setAuthMode('login')}
                          mt={4}
                          mx={10}
                          mb={5}
                        />
                      ) : (
                        <Login
                          requestLogin={requestLogin}
                          clearLoginError={clearLoginError}
                          switchToSignup={() => setAuthMode('shipping')}
                        />
                      )}
                    </Panel>
                  </div>
                  {xs && activeStep === 1 && restrictionMessage ? (
                    <StateRestrictionsDialog
                      product_name={restrictedProduct}
                      cartCount={cartCount}
                      //     onExited={closeShippingRestrictionsDialog}
                    />
                  ) : null}
                  <div ref={stepRefs[1]}>
                    <Panel
                      title={getPanelTitleContent(xs, 1, activeStep, null, payload.paymentDetails)}
                      hideExpandIcon={activeStep <= 1}
                      collapsible
                      expanded={activeStep === 1}
                      onChange={e => onPanelChange(e, 1)}
                    >
                      <AccountPaymentDetails
                        checkoutVersion={2}
                        currentUser={currentUser}
                        requestPatchAccount={requestPatchAccount}
                        clearPatchAccountError={clearPatchAccountError}
                        formType={PAYMENT_FORM_TYPES.CHECKOUT}
                        onBack={handleBack}
                        onSubmit={handleNext}
                        selectionEnabled
                        seedEnabled
                        addressSeed={payload.shippingAddress}
                        useSeedLabel="Use shipping address"
                        allowFlyMode
                        mt={4}
                        mx={10}
                        mb={5}
                        backLabel="Cancel"
                        submitLabel="Review Order"
                        resetFormMode={resetPaymentDetailsFormMode}
                      />
                    </Panel>
                  </div>
                  <div ref={stepRefs[2]}>
                    <Panel
                      title={getPanelTitleContent(xs, 2, activeStep, null, {})}
                      collapsible
                      hideExpandIcon
                      expanded={activeStep === 2}
                      onChange={e => onPanelChange(e, 2)}
                      className="lastPanel"
                    >
                      {xs && (
                        <CartDrawer
                          checkoutVersion={2}
                          disableItemEditing
                          hideCheckoutProceedLink
                          hideTaxLabel
                          showOrderSummaryText
                          xsBreakpoint={xs}
                          activeStep={activeStep}
                          restrictionMessage={restrictionMessage}
                          restrictedProduct={restrictedProduct}
                        />
                      )}
                      <CheckoutReviewForm
                        xsBreakpoint={xs}
                        onSubmit={handleNext}
                        payload={payload}
                        setPayload={setPayload}
                        accountJwt={account_jwt}
                        activeStep={activeStep}
                      />
                    </Panel>
                  </div>
                </Grid>
                {!xs && currentUser ? (
                  <Grid item xs={12} md={4} className="left-side">
                    <CartDrawer
                      checkoutVersion={2}
                      disableItemEditing
                      hideCheckoutProceedLink
                      hideTaxLabel
                      showOrderSummaryText={false}
                      xsBreakpoint={xs}
                      activeStep={activeStep}
                      restrictionMessage={restrictionMessage}
                      restrictedProduct={restrictedProduct}
                    />
                  </Grid>
                ) : (
                  ''
                )}
              </Grid>
              <Dialog
                className="transaction-dialog-container"
                open={checkoutDialogOpen}
                onClose={handleCheckoutDialogClose}
                closeAfterTransition
              >
                {orderError ? (
                  <IconButton
                    aria-label="close"
                    style={{
                      position: 'absolute',
                      right: theme.spacing(1),
                      top: theme.spacing(1),
                      color: theme.palette.grey[500]
                    }}
                    onClick={handleCheckoutDialogClose}
                  >
                    <CloseIcon />
                  </IconButton>
                ) : null}
                <MuiDialogContent>
                  <TransactionMessage orderError={orderError} errorMessage={order} />
                </MuiDialogContent>
              </Dialog>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

Checkout.propTypes = {
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  clearCreateAccountError: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
  clearLoginError: PropTypes.func.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  clearPatchAccountError: PropTypes.func.isRequired,
  emitOrderSubmitted: PropTypes.func.isRequired
};

export default withRouter(Checkout);
