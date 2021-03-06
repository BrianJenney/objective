import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { get, isNil } from 'lodash';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Panel } from '../common';
import { AccountAddresses, AccountPaymentDetails } from '../account';
import { AccountSummary, AddressSummary, PaymentSummary } from '../summaries';
import { CheckoutReviewForm } from '../forms';
import CartDrawer from '../../pages/cart/CartDrawer';
import CheckoutAuth from './Auth';
import { STEPS, STEP_KEYS, DATA_KEYS, SHIPPING_METHOD } from './constants';
import { getDefaultEntity } from '../../utils/misc';
import { StyledCheckoutSteps } from '../../pages/checkout/StyledComponents';
import '../../pages/checkout/checkout-styles.scss';
import ScrollToTop from '../common/ScrollToTop';

const getPanelTitleContent = (step, activeStep, payload) => {
  const isActiveStep = step === activeStep;
  const stepTitle = STEPS[step];
  const titleViewBgcolor = isActiveStep ? '#003833' : '#fbf7f3';
  const titleViewColor = isActiveStep ? '#ffffff' : '#4a4a4a';
  const titleView = (
    <Box
      px={3}
      py={2}
      width={1}
      color={titleViewColor}
      bgcolor={titleViewBgcolor}
      display="flex"
      alignItems="center"
      style={{
        fontSize: 18,
        textTransform: 'uppercase'
      }}
    >
      <StyledCheckoutSteps>
        <Box mr={1} children={`STEP ${step + 1}`} />
      </StyledCheckoutSteps>
      <StyledCheckoutSteps>
        <Box children={stepTitle} style={{ fontWeight: 600 }} />
      </StyledCheckoutSteps>
    </Box>
  );
  let payloadSummary = null;

  if (!isNil(payload)) {
    if (step === 0) {
      payloadSummary = <AccountSummary values={payload} />;
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
        px={14}
        py={4}
        bgcolor="rgba(252, 248, 244, 0.5)"
        color="#231f20"
        style={{ fontSize: 20 }}
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
  requestLoginAttempt,
  requestPatchAccount,
  requestCreateOrder
}) => {
  const [payload, setPayload] = useState({ shippingMethod: SHIPPING_METHOD });
  const [activeStep, setActiveStep] = useState(0);
  const { account_jwt, email: currentUserEmail } = currentUser.data;

  useEffect(() => {
    if (!account_jwt && activeStep > 0) {
      history.push('/');
    }
  }, [currentUser.data.account_jwt]);

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

    setPayload({});
    history.push('/order');

    return true;
  };

  const handleBack = () => activeStep > 0 && setActiveStep(activeStep - 1);
  const handleNext = async values => {
    let result = null;

    if (activeStep <= 2) {
      result = await handleAddressesAndCardSteps(values);
    } else if (activeStep === 3) {
      handleReviewStep();
      return true;
    }

    if (result) {
      setActiveStep(activeStep + 1);
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

    return setActiveStep(panelIndex);
  };

  return (
    <ScrollToTop>
      <Box bgcolor="rgba(252, 248, 244, 0.5)">
        <Container>
          <Box py={10} className="checkout-wrapper">
            <CssBaseline />
            <Grid container spacing={4}>
              <Grid item flex={1} xs={12} md={8} className="right-side">
                <Panel
                  title={getPanelTitleContent(0, activeStep, {
                    email: currentUserEmail
                  })}
                  collapsible
                  hideExpandIcon
                  expanded={activeStep === 0}
                  onChange={() => null}
                >
                  <CheckoutAuth
                    currentUser={currentUser}
                    requestCreateAccount={requestCreateAccount}
                    requestLoginAttempt={requestLoginAttempt}
                    handleNext={() => {
                      if (activeStep === 0) {
                        setActiveStep(1);
                      }
                    }}
                  />
                </Panel>
                <Panel
                  title={getPanelTitleContent(
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
                    title="Shipping Address"
                    withSmallTitle
                    onSubmit={handleNext}
                    selectionEnabled
                    allowFlyMode
                    mt={4}
                    mx={10}
                    mb={5}
                  />
                </Panel>
                <Panel
                  title={getPanelTitleContent(
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
                    title="Credit Card"
                    withSmallTitle
                    subTitle=""
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
                  />
                </Panel>
                <Panel
                  title={getPanelTitleContent(3, activeStep, {})}
                  collapsible
                  hideExpandIcon
                  expanded={activeStep === 3}
                  onChange={e => onPanelChange(e, 3)}
                >
                  <CheckoutReviewForm onSubmit={handleNext} />
                </Panel>
              </Grid>
              <Grid item xs={12} md={4} className="left-side">
                <CartDrawer
                  disableItemEditing
                  hideCheckoutProceedLink
                  hideTaxLabel
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ScrollToTop>
  );
};

Checkout.propTypes = {
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  requestCreateAccount: PropTypes.func.isRequired,
  requestLoginAttempt: PropTypes.func.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  requestCreateOrder: PropTypes.func.isRequired
};

export default withRouter(Checkout);
