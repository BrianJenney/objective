import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Box, CssBaseline } from '@material-ui/core';
import { Panel } from '../common';
import { AccountAddresses, AccountPaymentDetails } from '../account';
import { ShippingMethodForm, ReviewForm, ResultForm } from '../forms';
import CheckoutAuth from './Auth';
import { STEPS, STEP_KEYS, DATA_KEYS, shippingMethods } from './constants';
import { getDefaultEntity } from './helpers';

const Checkout = ({
  currentUser,
  cart,
  requestCreateAccount,
  requestLoginAttempt,
  requestPatchAccount,
  requestCreateOrder
}) => {
  const [payload, setPayload] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => activeStep > 0 && setActiveStep(activeStep - 1);

  const handleNext = values => {
    if (activeStep === 1) {
      setPayload({ shippingMethod: shippingMethods[values.shippingMethod] });
    } else if (activeStep <= 4) {
      const key = STEP_KEYS[activeStep];
      const dataKey = DATA_KEYS[activeStep];
      const selectedEntity = getDefaultEntity(currentUser[dataKey]);

      if (!selectedEntity) {
        return false;
      }

      setPayload({ ...payload, [key]: selectedEntity });
    } else if (activeStep === 5) {
      const creditCardToken = get(payload, 'paymentDetails.token');

      if (!creditCardToken) {
        return false;
      }

      requestCreateOrder(
        { ...cart, ...payload, account_jwt: currentUser.account_jwt },
        { creditCardToken }
      );
    }

    setActiveStep(activeStep + 1);

    return true;
  };

  return (
    <Box>
      <CssBaseline />
      <Panel title={STEPS[0]} collapsible expanded={activeStep === 0}>
        <CheckoutAuth
          currentUser={currentUser}
          requestCreateAccount={requestCreateAccount}
          requestLoginAttempt={requestLoginAttempt}
          handleNext={() => setActiveStep(1)}
        />
      </Panel>
      <Panel title={STEPS[1]} collapsible expanded={activeStep === 1}>
        <ShippingMethodForm title="Shipping Method" onSubmit={handleNext} />
      </Panel>
      <Panel title={STEPS[2]} collapsible expanded={activeStep === 2}>
        <AccountAddresses
          currentUser={currentUser}
          requestPatchAccount={requestPatchAccount}
          onBack={handleBack}
          onSubmit={handleNext}
        />
      </Panel>
      <Panel title={STEPS[3]} collapsible expanded={activeStep === 3}>
        <AccountAddresses
          currentUser={currentUser}
          requestPatchAccount={requestPatchAccount}
          onBack={handleBack}
          onSubmit={handleNext}
        />
      </Panel>
      <Panel title={STEPS[4]} collapsible expanded={activeStep === 4}>
        <AccountPaymentDetails
          currentUser={currentUser}
          requestPatchAccount={requestPatchAccount}
          onBack={handleBack}
          onSubmit={handleNext}
        />
      </Panel>
      <Panel title={STEPS[5]} collapsible expanded={activeStep === 5}>
        <ReviewForm
          cart={{ ...cart, ...payload }}
          onBack={handleBack}
          onSubmit={handleNext}
        />
      </Panel>
      <Panel title={STEPS[6]} collapsible expanded={activeStep === 6}>
        <ResultForm onSubmit={() => null} />
      </Panel>
    </Box>
  );
};

Checkout.propTypes = {
  currentUser: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  requestCreateAccount: PropTypes.func.isRequired,
  requestLoginAttempt: PropTypes.func.isRequired,
  requestPatchAccount: PropTypes.func.isRequired,
  requestCreateOrder: PropTypes.func.isRequired
};

export default Checkout;
