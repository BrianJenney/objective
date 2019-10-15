import React, { useState, useEffect, useRef } from 'react';
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

import { Panel } from '../common';
import { AccountAddresses, AccountPaymentDetails } from '../account';
import { FORM_TYPES as PAYMENT_FORM_TYPES } from '../account/PaymentDetails';
import { AccountSummary, AddressSummary, PaymentSummary } from '../summaries';
import { CheckoutReviewForm } from '../forms';
import { FORM_TYPES as ADDRESS_FORM_TYPES } from '../forms/AddressForm';
import CartDrawer from '../../pages/cart/CartDrawer';
import CheckoutAuth from './Auth';
import { STEPS, STEP_KEYS, DATA_KEYS, SHIPPING_METHOD } from './constants';
import { getDefaultEntity, scrollToRef } from '../../utils/misc';
import '../../pages/checkout/checkout-styles.scss';
import { requestSetShippingAddress } from '../../modules/cart/actions';
import { resetCart } from '../../modules/cart/actions';
import { resetOrderState } from '../../modules/order/actions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TransactionMessage from './TransactionMessage';

let checkoutStartedTracked = false;
const getPanelTitleContent = (
  xs,
  step,
  activeStep,

  signupConfirmation,
  payload
) => {
  const isActiveStep = step === activeStep;
  const stepTitle = STEPS[step];
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
      payloadSummary = (
        <AccountSummary
          values={payload}
          signupConfirmation={signupConfirmation}
        />
      );
    } else if (step === 1) {
      payloadSummary = <AddressSummary noDefault values={payload} />;
    } else if (step === 2) {
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
  console.log('==CURRENT USER==', currentUser);

  const [payload, setPayload] = useState({ shippingMethod: SHIPPING_METHOD });
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const { account_jwt, email: currentUserEmail } = currentUser.data;
  const orderError = useSelector(state => state.order.transactionError);
  const orderIsLoading = useSelector(state => state.order.isLoading);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const { signupConfirmation } = currentUser;
  const stepRefs = [useRef(null), useRef(null), useRef(null)];

  const trackCheckoutStarted = () => {
      let orderItemsTransformed = [];
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
        revenue: cart.total ? Number.parseFloat(cart.total) : 0,
        subtotal: cart.subtotal ? Number.parseFloat(cart.subtotal) : 0,
        tax: cart.tax ? Number.parseFloat(cart.tax) : 0,
        total: cart.total ? Number.parseFloat(cart.total) : 0
      });
      
    
  };

  useEffect(() => {
    if (orderIsLoading || orderError) {
      setCheckoutDialogOpen(true);
    } else {
      handleCheckoutDialogClose();
      if (orderError === false) {
        dispatch(resetCart());
        setPayload({});
        history.replace('/order');
      }
    }
  }, [orderError, orderIsLoading]);

  useEffect(() => {
    if (!account_jwt && activeStep > 0) {
      history.push('/');
    }
  }, [currentUser.data.account_jwt]);

  useEffect(() => {
    if (activeStep === 2) {
      dispatch(requestSetShippingAddress(cart._id, payload.shippingAddress));
    }
  }, [
    activeStep,
    payload.shippingAddress,
    dispatch,
    requestSetShippingAddress
  ]);

  useEffect(()=>{
    trackCheckoutStarted();
  },[]);

  const handleCheckoutDialogClose = () => {
    setCheckoutDialogOpen(false);
    dispatch(resetOrderState());
  };

  const handleAddressesAndCardSteps = async values => {
    const key = STEP_KEYS[activeStep];
    const dataKey = DATA_KEYS[activeStep];
    const currentUserData = currentUser.data;
    const selectedEntity = values || getDefaultEntity(currentUserData[dataKey]);

    if (!selectedEntity) {
      return false;
    }

    setPayload({ ...payload, [key]: selectedEntity });

    if (activeStep === 2 && isNil(payload[STEP_KEYS[1]])) {
      return false;
    }

    return true;
  };

  const handleReviewStep = () => {
    const paymentMethodNonce = get(payload, 'paymentDetails.nonce');
    const paymentMethodToken = get(payload, 'paymentDetails.token');
    delete payload.paymentDetails.nonce;

    if (!paymentMethodNonce && !paymentMethodToken) {
      return false;
    }

    if (paymentMethodNonce) {
      requestCreateOrder(
        { ...cart, ...payload, account_jwt },
        { paymentMethodNonce }
      );
    } else {
      requestCreateOrder(
        { ...cart, ...payload, account_jwt },
        { paymentMethodToken }
      );
    }
    console.log(orderIsLoading, orderError);
    if (orderIsLoading === true || orderError === null) return null;

    if (orderError === true) {
      console.log('TEEESSSTT');
      setCheckoutDialogOpen(true);
    } else {
      console.log('in else block');
      dispatch(resetCart());
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

  const setCurrentStep = stepIndex => {
    setActiveStep(stepIndex);
    scrollToRef(stepRefs[stepIndex - 1]);
  };

  const handleBack = () => activeStep > 0 && setCurrentStep(activeStep - 1);

  const handleNext = async values => {
    let result = null;

    if (activeStep <= 2) {
      result = await handleAddressesAndCardSteps(values);
    } else if (activeStep === 3) {
      handleReviewStep();
      return true;
    }

    if (result) {
      setCurrentStep(activeStep + 1);
      trackCheckoutStepCompleted(activeStep);
    }
    return true;
  };

  const onPanelChange = (expanded, panelIndex) => {
    const shippingKey = STEP_KEYS[1];
    const paymentKey = STEP_KEYS[2];
    if (
      !expanded ||
      activeStep === 0 ||
      (panelIndex === 3 &&
        (isNil(payload[shippingKey]) || isNil(payload[paymentKey])))
    ) {
      return false;
    }

    trackCheckoutStepCompleted(panelIndex);

    return setCurrentStep(panelIndex);
  };

  return (
    <>
      <Box bgcolor="rgba(252, 248, 244, 0.5)">
        <Container>
          <Box py={10} className="checkout-wrapper">
            <CssBaseline />
            <Grid container spacing={4}>
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

                    signupConfirmation,
                    {
                      email: currentUserEmail
                    }
                  )}
                  collapsible
                  hideExpandIcon
                  expanded={activeStep === 0}
                  onChange={() => null}
                  className="firstPanel"
                >
                  <CheckoutAuth
                    currentUser={currentUser}
                    requestCreateAccount={requestCreateAccount}
                    clearCreateAccountError={clearCreateAccountError}
                    requestLogin={requestLogin}
                    clearLoginError={clearLoginError}
                    handleNext={() => {
                      if (activeStep === 0) {
                        setCurrentStep(1);
                        trackCheckoutStepCompleted(0);
                      }
                    }}
                  />
                </Panel>
                <Panel
                  title={getPanelTitleContent(
                    xs,
                    1,
                    activeStep,
                    payload.shippingAddress
                  )}
                  collapsible
                  expanded={activeStep === 1}
                  onChange={e => onPanelChange(e, 1)}
                >
                  <AccountAddresses
                    currentUser={currentUser}
                    requestPatchAccount={requestPatchAccount}
                    clearPatchAccountError={clearPatchAccountError}
                    formType={ADDRESS_FORM_TYPES.CHECKOUT}
                    onSubmit={handleNext}
                    selectionEnabled
                    allowFlyMode
                    mt={4}
                    mx={10}
                    mb={5}
                    ref={stepRefs[0]}
                  />
                </Panel>
                <Panel
                  title={getPanelTitleContent(
                    xs,
                    2,
                    activeStep,
                    payload.paymentDetails
                  )}
                  collapsible
                  expanded={activeStep === 2}
                  onChange={e => onPanelChange(e, 2)}
                >
                  <AccountPaymentDetails
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
                    ref={stepRefs[1]}
                  />
                </Panel>
                <Panel
                  title={getPanelTitleContent(xs, 3, activeStep, {})}
                  collapsible
                  hideExpandIcon
                  expanded={activeStep === 3}
                  onChange={e => onPanelChange(e, 3)}
                  className="lastPanel"
                >
                  <Box ref={stepRefs[2]}>
                    {xs && (
                      <CartDrawer
                        disableItemEditing
                        hideCheckoutProceedLink
                        hideTaxLabel
                        showOrderSummaryText
                        xsBreakpoint={xs}
                      />
                    )}
                    <CheckoutReviewForm
                      xsBreakpoint={xs}
                      onSubmit={handleNext}
                    />
                  </Box>
                </Panel>
              </Grid>
              {!xs ? (
                <Grid item xs={12} md={4} className="left-side">
                  <CartDrawer
                    disableItemEditing
                    hideCheckoutProceedLink
                    hideTaxLabel
                    showOrderSummaryText={false}
                    xsBreakpoint={xs}
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
