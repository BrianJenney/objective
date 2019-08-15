import React, { useState } from 'react';
import braintree from 'braintree-web';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShippingAddressForm from './checkout/ShippingAddressForm';
import BillingAddressForm from './checkout/BillingAddressForm';
import PaymentForm from './checkout/PaymentForm';
import ShippingForm from './checkout/ShippingForm';
import Review from './checkout/Review';
import Result from './checkout/Result';
import store from '../store';
import { requestPatchCart } from '../modules/cart/actions';
import { requestCreateOrder } from '../modules/order/actions';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
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

const Checkout = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState({});
  const cart = store.getState().cart;
  const fetchBrainTreeNonce = async () => {
    const { paymentDetails, billingAddress } = values;
    let nonce = null;

    try {
      const client = await braintree.client.create({
        authorization: process.env.BRAINTREE_CLIENT_AUTHORIZATION
      });
      const braintreeResponse = await client.request({
        endpoint: 'payment_methods/credit_cards',
        method: 'post',
        data: {
          creditCard: {
            number: paymentDetails.cardNumber,
            expirationDate: paymentDetails.expDate,
            cvv: paymentDetails.cvv,
            cardholderName: paymentDetails.cardName,
            billingAddress
          }
        }
      });
      nonce = braintreeResponse.creditCards[0].nonce;
    } catch (e) {
      console.log('Error', e);
    }

    return nonce;
  };
  const handleNext = () => {
    if (activeStep == 4) {
      //We're done...place the cart onto the order exchange
      store.dispatch(requestCreateOrder(cart));
    } else if (activeStep != 5) {
      // update mongo & redux
      store.dispatch(requestPatchCart(cart._id, values));
    }
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleFormValuesUpdate = formValues =>
    setValues({
      ...values,
      ...formValues
    });
  const getStepContent = step => {
    switch (step) {
      case 0:
        return <ShippingForm onSubmit={handleFormValuesUpdate} />;
      case 1:
        return <ShippingAddressForm onSubmit={handleFormValuesUpdate} />;
      case 2:
        return <BillingAddressForm onSubmit={handleFormValuesUpdate} />;
      case 3:
        return <PaymentForm onSubmit={handleFormValuesUpdate} />;
      case 4:
        return <Review cart={{ ...cart, ...values }} />;
      case 5:
        return <Result cart={cart} />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <React.Fragment>
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
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, cart)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && activeStep != steps.length - 1 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep != steps.length - 1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 2 ? 'Place order' : 'Next'}
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default Checkout;
