import React, { useState, Fragment } from 'react';
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  sendCreditCardBraintreeRequest,
  sendPaypalCheckoutBraintreeRequest
} from '../utils/braintree';
import store from '../store';
import { requestPatchCart } from '../modules/cart/actions';
import { requestCreateOrder } from '../modules/order/actions';
import ShippingAddressForm from './checkout/ShippingAddressForm';
import BillingAddressForm from './checkout/BillingAddressForm';
import PaymentForm from './checkout/PaymentForm';
import ShippingForm from './checkout/ShippingForm';
import Review from './checkout/Review';
import Result from './checkout/Result';

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
  const [activeStep, setActiveStep] = useState(0);
  const { cart } = store.getState();
  const fetchBrainTreeNonce = async () => {
    const { paymentDetails, billingAddress } = cart;

    try {
      const creditCardResponse = await sendCreditCardBraintreeRequest({
        ...paymentDetails,
        postalCode: billingAddress.postalCode
      });

      const { nonce } = creditCardResponse.creditCards[0];

      return nonce;
    } catch (e) {
      console.log('Error', e);
    }

    return null;
  };
  const handleBack = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep(activeStep - 1);
  };
  const handleNext = async values => {
    if (activeStep === 0) {
      // update mongo & redux
      store.dispatch(
        requestPatchCart(cart._id, {
          shipping: shippingMethods[values.shipping]
        })
      );
    } else if (activeStep <= 3) {
      // update mongo & redux
      store.dispatch(requestPatchCart(cart._id, values));
    } else if (activeStep === 4) {
      // Fetch braintree nonce
      const nonce = await fetchBrainTreeNonce();
      // @TODO: Error handling
      // We're done...place the cart onto the order exchange
      store.dispatch(requestCreateOrder(cart, nonce));
    }

    setActiveStep(activeStep + 1);
  };
  const getStepContent = step => {
    switch (step) {
      case 0:
        return <ShippingForm onSubmit={handleNext} />;
      case 1:
        return (
          <ShippingAddressForm onBack={handleBack} onSubmit={handleNext} />
        );
      case 2:
        return (
          <BillingAddressForm
            shippingAddressSeed={cart}
            onBack={handleBack}
            onSubmit={handleNext}
          />
        );
      case 3:
        return <PaymentForm onBack={handleBack} onSubmit={handleNext} />;
      case 4:
        return <Review cart={cart} onBack={handleBack} onSubmit={handleNext} />;
      case 5:
        return <Result onSubmit={handleNext} />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <Fragment>
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
          <Fragment>
            {activeStep === steps.length ? (
              <Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </Fragment>
            ) : (
              <Fragment>{getStepContent(activeStep)}</Fragment>
            )}
          </Fragment>
        </Paper>
      </main>
    </Fragment>
  );
};

export default Checkout;
