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

import { Panel, Loader } from '../common';
import { AccountAddresses, AccountPaymentDetails } from '../account';
import { FORM_TYPES as PAYMENT_FORM_TYPES } from '../account/PaymentDetails';
import { AccountSummary, AddressSummary, PaymentSummary } from '../summaries';
import { CheckoutReviewForm } from '../forms';
import { FORM_TYPES as ADDRESS_FORM_TYPES } from '../forms/AddressForm';
import CartDrawer from '../../pages/cart/CartDrawer';
import CheckoutAuth from './Auth';
import { STEPS, STEP_KEYS, STEPS_V2, DATA_KEYS } from './constants';
import { getDefaultEntity, scrollToRef } from '../../utils/misc';
import '../../pages/checkout/checkout-styles.scss';
import { requestSetShippingAddress } from '../../modules/cart/actions';
import { resetOrderState } from '../../modules/order/actions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TransactionMessage from './TransactionMessage';
import StateRestrictionsDialog from './StateRestrictionsDialog';
import Login from '../Login';

const getPanelTitleContent = (
  xs,
  step,
  activeStep,
  signupConfirmation,
  payload
) => {
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
      payloadSummary = <AddressSummary noDefault values={payload} />;
    } else if (step === 1) {
      payloadSummary = <PaymentSummary noDefault values={payload} />;
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
  requestCreateAccount,
  clearCreateAccountError,
  requestLogin,
  clearLoginError,
  requestPatchAccount,
  clearPatchAccountError,
  requestCreateOrder
}) => {
  const [payload, setPayload] = useState({});
  const [resetFormMode, setResetFormMode] = useState(false);
  const [authMode, setAuthMode] = useState('shipping');
  const [
    resetPaymentDetailsFormMode,
    setResetPaymentDetailsFormMode
  ] = useState(false);
  const [shippingAddressActive, setShippingAddressActive] = useState({});
  const [accountCreated, setAccountCreated] = useState(false);
  const [paymentDetailsUpdated, setPaymentDetailsUpdated] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const {
    account_jwt,
    email: currentUserEmail,
    paymentMethods
  } = currentUser.data;
  const orderError = useSelector(state => state.order.transactionError);
  const orderIsLoading = useSelector(state => state.order.isLoading);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { signupConfirmation } = currentUser;
  const stepRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [closeShippingRestrictions, setCloseShippingRestrictions] = useState(
    false
  );
  const [restrictionMessage, setRestrictionMessage] = useState(false);
  const [restrictedProduct, setRestrictedProduct] = useState('');

  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const closeShippingRestrictionsDialog = useCallback(() => {
    setCloseShippingRestrictions(true);
  }, [setCloseShippingRestrictions]);

  setTimeout(function () {
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
  // Set step 1 to active if there were any signup errors
  useEffect(() => {
    if (!accountCreated && currentUser.signupError) {
      if (currentUser.signupError.errorMessage) {
        setResetPaymentDetailsFormMode(true);
        setResetFormMode(true);
        scrollToRef(stepRefs[0]);
        setActiveStep(0);
      }
    }
  }, [currentUser.signupError]);

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
    if (accountCreated && !paymentDetailsUpdated) {
      setPayload({
        ...payload,
        paymentDetails: paymentMethods[0]
      });
      setPaymentDetailsUpdated(true);
    }
  }, [paymentMethods]);

  useEffect(() => {
    if (accountCreated && account_jwt && !paymentDetailsUpdated) {
      // Update payment details
      const paymentDetailsPayload = payload.paymentDetails;
      const creditCardNonce = paymentDetailsPayload.nonce;
      delete paymentDetailsPayload.billingAddress.password;
      delete paymentDetailsPayload.billingAddress.email;
      delete paymentDetailsPayload.nonce;
      const requestPayload = {
        newCreditCard: { ...paymentDetailsPayload },
        nonce: creditCardNonce
      };
      requestPatchAccount(account_jwt, requestPayload);
    }
  }, [accountCreated]);

  useEffect(() => {
    if (!accountCreated && currentUser.data.account_jwt && activeStep === 2) {
      // Update payment details
      setAccountCreated(true);
    }
  }, [currentUser.data.account_jwt]);

  useEffect(() => {
    if (activeStep === 2 && !account_jwt) {
      // Create user here...
      requestCreateAccount({
        firstName: payload.paymentDetails.billingAddress.firstName,
        lastName: payload.paymentDetails.billingAddress.lastName,
        email: payload.shippingAddress.email,
        password: payload.paymentDetails.billingAddress.password,
        newsletter: payload.shippingAddress.shouldSubscribe
      });
    }
  }, [activeStep]);

  useEffect(() => {
    if (orderIsLoading || orderError) {
      setCheckoutDialogOpen(true);
    } else {
      handleCheckoutDialogClose();
      if (orderError === false) {
        setPayload({});
        history.replace('/order');
      }
    }
  }, [orderError, orderIsLoading]);

  useEffect(() => {
    if (!account_jwt && activeStep > 0) {
      history.push('/');
    }

    if (xs && currentUser.data.account_jwt) {
      if (
        !currentUser.data.addressBook ||
        currentUser.data.addressBook.length === 0
      ) {
        setCurrentStep(0);
      } else if (
        !currentUser.data.paymentMethods ||
        currentUser.data.paymentMethods.length === 0
      ) {
        setCurrentStep(1);
      } else {
        setCurrentStep(2);
      }
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
    }
  }, [activeStep, payload.shippingAddress]);

  useEffect(() => {
    trackCheckoutStarted();
    scrollToRef(stepRefs[0]);
  }, []);

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
  }, [cart.items]);

  const handleCheckoutDialogClose = () => {
    setCheckoutDialogOpen(false);
    dispatch(resetOrderState());
  };

  const handleAddressesAndCardSteps = async values => {
    const NEW_STEP_KEYS = STEP_KEYS.slice(1, 4);
    const key = NEW_STEP_KEYS[activeStep];

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

    delete payload.paymentDetails.nonce;

    if (paymentMethodNonce !== '') {
      if (cart.items.length > 0) {
        requestCreateOrder(
          { ...cart, ...payload, account_jwt },
          { paymentMethodNonce }
        );
      }
    } else if (paymentMethodToken !== '') {
      if (cart.items.length > 0) {
        requestCreateOrder(
          { ...cart, ...payload, account_jwt },
          { paymentMethodToken }
        );
      }
    } else {
      return false;
    }

    if (orderIsLoading === true || orderError === null) return null;

    if (orderError === true) {
      setCheckoutDialogOpen(true);
    } else {
      setPayload({});
      history.replace('/order');
    }
    return true;
  };

  /*
  @description - Tracks Segment Analytics 'Checkout Step Completed' event
  */
  const trackCheckoutStepCompleted = step => {
    window.analytics.track('Checkout Step Completed', {
      cart_id: cart._id,
      step: step + 1
    });
  };

  const trackCheckoutStepStarted = step => {
    window.analytics.track('Checkout Step Started', {
      cart_id: cart._id,
      step: step + 1
    });
  };

  const setCurrentStep = stepIndex => {
    setActiveStep(stepIndex);
    scrollToRef(stepRefs[stepIndex]);
    trackCheckoutStepStarted(stepIndex);
  };

  const handleBack = () => activeStep > 0 && setCurrentStep(activeStep - 1);

  const handleNext = async values => {
    let result = null;
    if (activeStep <= 1) {
      result = await handleAddressesAndCardSteps(values);
    } else if (activeStep === 2) {
      handleReviewStep(values);
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
      ([2, 3].includes(panelIndex) &&
        (isNil(payload[shippingKey]) || isNil(payload[paymentKey])))
    ) {
      return false;
    }
    trackCheckoutStepCompleted(panelIndex);
    if (panelIndex === 0) {
      setResetFormMode(true);
    }
    return setCurrentStep(panelIndex);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
          <Box bgcolor="rgba(252, 248, 244, 0.5)">
            <Container>
              <Box py={10} className="checkout-wrapper">
                <CssBaseline />
                <Grid container spacing={4} style={{ 'margin-top': '50px' }}>
                  <Grid
                    item
                    flex={1}
                    xs={12}
                    md={8}
                    style={xs ? { padding: 0 } : {}}
                    className="right-side"
                  >
                    <Panel
                      title={getPanelTitleContent(
                        xs,
                        0,
                        activeStep,
                        null,
                        payload.shippingAddress
                      )}
                      collapsible
                      expanded={activeStep === 0}
                      onChange={e => onPanelChange(e, 0)}
                    >
                      <div ref={stepRefs[0]}>
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
                      </div>
                    </Panel>
                    {xs && activeStep === 1 && restrictionMessage ? (
                      <StateRestrictionsDialog
                        product_name={restrictedProduct}
                        cartCount={cartCount}
                        onExited={closeShippingRestrictionsDialog}
                      />
                    ) : null}
                    <Panel
                      title={getPanelTitleContent(
                        xs,
                        1,
                        activeStep,
                        null,
                        payload.paymentDetails
                      )}
                      collapsible
                      expanded={activeStep === 1}
                      onChange={e => onPanelChange(e, 1)}
                    >
                      <div ref={stepRefs[1]}>
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
                      </div>
                    </Panel>
                    <Panel
                      title={getPanelTitleContent(xs, 2, activeStep, null, {})}
                      collapsible
                      hideExpandIcon
                      expanded={activeStep === 2}
                      onChange={e => onPanelChange(e, 2)}
                      className="lastPanel"
                    >
                      <div ref={stepRefs[2]}>
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
                        />
                      </div>
                    </Panel>
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
                    <TransactionMessage orderError={orderError} />
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
  requestCreateAccount: PropTypes.func.isRequired,
  clearCreateAccountError: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
  clearLoginError: PropTypes.func.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  clearPatchAccountError: PropTypes.func.isRequired,
  requestCreateOrder: PropTypes.func.isRequired
};

export default withRouter(Checkout);
