import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import store from '../store';
import { PAYMENT_METHODS } from '../constants/payment';
import {
  fetchCreditCardBrainTreeNonce,
  fetchPaypalCheckoutBrainTreeNonce
} from '../utils/checkout';
import { requestPatchCart } from '../modules/cart/actions';
import { requestCreateOrder } from '../modules/order/actions';
import { requestCreateAccount } from '../modules/account/actions';
import CreateAccountForm from './checkout/CreateAccount';
import ShippingAddressForm from './checkout/ShippingAddressForm';
import BillingAddressForm from './checkout/BillingAddressForm';
import PaymentForm from './checkout/PaymentForm';
import ShippingForm from './checkout/ShippingForm';
import Review from './checkout/Review';
import Result from './checkout/Result';

const localStorageClient = require('store');

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = [
  'Create Account',
  'Shipping Method',
  'Shipping Address',
  'Billing Address',
  'Payment Details',
  'Review Your Order',
  'Confirmation'
];

const shippingMethods = {
  ground: {
    displayName: 'Ground',
    name: 'ground',
    price: 0.0,
    deliveryEstimate: '3-7 Business Days'
  },
  twodayair: {
    displayName: '2 Day Air',
    name: '2dayair',
    price: 17.9,
    deliveryEstimate: '2 Business Days'
  }
};

const Checkout = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { account, cart } = store.getState();
  const [activeStep, setActiveStep] = useState(
    typeof account._id === 'undefined' ? 0 : 1
  );

  const handleBack = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep(activeStep - 1);
  };
  const handleNext = async values => {
    if (activeStep === 0) {
      store.dispatch(requestCreateAccount(values));
    } else if (activeStep === 1) {
      store.dispatch(
        requestPatchCart(cart._id, {
          account_id: store.getState().account._id, // we got this when an account was created
          shipping: shippingMethods[values.shipping]
        })
      );
    } else if (activeStep <= 4) {
      // update mongo & redux
      store.dispatch(requestPatchCart(cart._id, values));
    } else if (activeStep === 5) {
      // Fetch braintree nonce
      const { paymentDetails, billingAddress, shippingAddress, total } = cart;
      let nonce = null;

      try {
        if (paymentDetails.paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
          nonce = await fetchCreditCardBrainTreeNonce({
            paymentDetails,
            billingAddress
          });
        } else {
          nonce = await fetchPaypalCheckoutBrainTreeNonce({
            total,
            shippingAddress
          });
        }
        // We're done...place the cart onto the order exchang.
        store.dispatch(requestCreateOrder(cart, nonce));
      } catch (err) {
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    }

    setActiveStep(activeStep + 1);
  };
  const getStepContent = step => {
    console.log(store.getState());
    switch (step) {
      case 0:
        return <CreateAccountForm onSubmit={handleNext} />;
      case 1:
        return <ShippingForm onBack={handleBack} onSubmit={handleNext} />;
      case 2:
        return (
          <ShippingAddressForm onBack={handleBack} onSubmit={handleNext} />
        );
      case 3:
        return (
          <BillingAddressForm
            shippingAddressSeed={cart}
            onBack={handleBack}
            onSubmit={handleNext}
          />
        );
      case 4:
        return <PaymentForm onBack={handleBack} onSubmit={handleNext} />;
      case 5:
        return <Review cart={cart} onBack={handleBack} onSubmit={handleNext} />;
      case 6:
        return <Result onSubmit={handleNext} />;
      default:
        enqueueSnackbar('Unknown step', { variant: 'error' });
        return null;
    }
  };

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
            ) : (
              <>{getStepContent(activeStep)}</>
            )}
          </>
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
