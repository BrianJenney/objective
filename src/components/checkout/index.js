import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { fetchCreditCardBrainTreeNonce } from '../../utils/braintree';
import { Panel } from '../common';
import { AccountAddresses, AccountPaymentDetails } from '../account';
import { CheckoutReviewForm } from '../forms';
import CartDrawer from '../../pages/cart/CartDrawer';
import CheckoutAuth from './Auth';
import { STEPS, STEP_KEYS, DATA_KEYS, SHIPPING_METHOD } from './constants';
import { getDefaultEntity } from './helpers';

const getPanelTitleContent = (step, activeStep, payload = {}) => {
  const isActiveStep = step === activeStep;
  const stepTitle = STEPS[step];
  const payloadValues = Object.values(payload);
  const titleViewBgcolor = isActiveStep ? '#003833' : '#fbf7f3';
  const titleView = (
    <Box width={1} color="#4a4a4a" bgcolor={titleViewBgcolor} display="flex" alignItems="center" style={{ fontSize: 18, textTransform: 'uppercase' }}>
      <Box mr={1} component={Typography} children={`STEP ${step + 1}`} />
      <Box component={Typography} children={stepTitle} style={{ fontWeight: 600 }} />
    </Box>
  );
  const payloadView = isActiveStep ? null : (<Box width={1} color="#231f20" style={{ fontSize: 20 }}>{
      payloadValues.map((value, index) => (
        <Typography key={`value_${index}`} children={value} />
      ))
    }</Box>);
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
  const { enqueueSnackbar } = useSnackbar();
  const { account_jwt } = currentUser.data;

  const handleAddressesAndCardSteps = async values => {
    const key = STEP_KEYS[activeStep];
    const dataKey = DATA_KEYS[activeStep];
    const currentUserData = currentUser.data;
    const selectedEntity = values || getDefaultEntity(currentUserData[dataKey]);

    if (!selectedEntity) {
      return false;
    }

    if (!values || activeStep < 3) {
      setPayload({ ...payload, [key]: selectedEntity });
    } else {
      // card fly mode
      try {
        const nonce = await fetchCreditCardBrainTreeNonce({
          paymentDetails: selectedEntity,
          billingAddress: payload.billingAddress
        });
        const cardDetails = {
          name: selectedEntity.cardholderName,
          last4: selectedEntity.number.substring(
            selectedEntity.number.length - 4
          ),
          expirationDate: selectedEntity.expirationDate,
          nonce
        };
        setPayload({ ...payload, [key]: cardDetails });
      } catch (err) {
        enqueueSnackbar(err.message, { variant: 'error' });
        return false;
      }
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

    if (activeStep <= 3) {
      result = await handleAddressesAndCardSteps(values);
    } else if (activeStep === 4) {
      handleReviewStep();
      return true;
    }

    if (result) {
      setActiveStep(activeStep + 1);
    }
    return true;
  };

  return (
    <Container>
      <Box>
        <CssBaseline />
        <Box display="flex">
          <Box flex={1}>
            <Panel title={getPanelTitleContent(0, activeStep, {})} collapsible expanded={activeStep === 0}>
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
            <Panel title={getPanelTitleContent(1, activeStep, payload.shippingAddress)} collapsible expanded={activeStep === 1}>
              <AccountAddresses
                currentUser={currentUser}
                requestPatchAccount={requestPatchAccount}
                onBack={handleBack}
                onSubmit={handleNext}
                allowFlyMode
              />
            </Panel>
            <Panel title={getPanelTitleContent(2, activeStep, payload.billingAddress)} collapsible expanded={activeStep === 2}>
              <AccountAddresses
                currentUser={currentUser}
                requestPatchAccount={requestPatchAccount}
                onBack={handleBack}
                onSubmit={handleNext}
                allowFlyMode
                seedEnabled
                addressSeed={payload.shippingAddress}
                useSeedLabel="Use Shipping Address"
              />
            </Panel>
            <Panel title={getPanelTitleContent(3, activeStep, payload.paymentDetails)} collapsible expanded={activeStep === 3}>
              <AccountPaymentDetails
                currentUser={currentUser}
                requestPatchAccount={requestPatchAccount}
                onBack={handleBack}
                onSubmit={handleNext}
                allowFlyMode
              />
            </Panel>
            <Panel title={getPanelTitleContent(4, activeStep, {})} collapsible expanded={activeStep === 4}>
              <CheckoutReviewForm onSubmit={handleNext} />
            </Panel>
          </Box>
          <Box ml={3} width={415}>
            <CartDrawer />
          </Box>
        </Box>
      </Box>
    </Container>
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
