import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fonts } from '../components/Theme/fonts';
import store from '../store';
import { PAYMENT_METHODS } from '../constants/payment';
import { withAuthToken } from '../hoc';
import {
  fetchCreditCardBrainTreeNonce,
  fetchPaypalCheckoutBrainTreeNonce
} from '../utils/checkout';
import { requestPatchCart } from '../modules/cart/actions';
import { requestCreateOrder } from '../modules/order/actions';
import { requestCreateAccount } from '../modules/account/actions';
import {
  CreateAccountForm,
  ShippingAddressForm,
  BillingAddressForm,
  PaymentForm,
  ShippingForm,
  ReviewForm,
  ResultForm
} from '../components/forms';
import {
  StyledContainerGrid,
  StyledMainWrapper,
  StyledCheckoutWrapper,
  StyledCartWrapper,
  StyledExpansionPanelSummary
} from './checkout/StyledComponents';
import Cart from './cart/CartDrawer';
import Login from './Login';
import EditablePanel from '../components/common/EditablePanel';

const { $brandSans } = fonts;
const useStyles = makeStyles(theme => ({
  // panelTabBackround: {
  //   backgroundColor: theme.palette.brand.LIGHT_GRAY,
  // },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '8%',
    flexShrink: 0,
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
    fontFamily: $brandSans
  },
  secondaryHeading: {
    fontFamily: `${theme.typography.fontSans} !important`,
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
    fontFamily: $brandSans,
    fontWeight: 'bold'
  },
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

const Checkout = ({ authToken }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { account, cart } = store.getState();
  const [activeStep, setActiveStep] = useState(
    authToken || (account && account.account_jwt) ? 1 : 0
  );
  // sets open and closed panels
  const [expanded, setExpanded] = useState(false);
  const [keepOpen, setKeepOpen] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : true);
  };

  //  no nandleback in panels
  const handleBack = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep(activeStep - 1);
  };

  // handlenext now will keep panel open while
  // doing its job
  // TODO: rearrannge order of steps into panels
  const handleNext = async values => {
    handleChange();

    if (activeStep === 0) {
      store.dispatch(requestCreateAccount(values));
    } else if (activeStep === 1) {
      store.dispatch(
        requestPatchCart(cart._id, {
          account_jwt: store.getState().account.account_jwt, // we got this when an account was created
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
    console.log(authToken);
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
        return (
          <ReviewForm cart={cart} onBack={handleBack} onSubmit={handleNext} />
        );
      case 6:
        return <ResultForm onSubmit={handleNext} />;
      default:
        enqueueSnackbar('Unknown step', { variant: 'error' });
        return null;
    }
  };

  return (
    <>
      {/* <CssBaseline /> */}
      <StyledContainerGrid>
        <StyledMainWrapper container xs={12} sm={11}>
          <StyledCheckoutWrapper item xs={6} sm={9}>
            <div>
              <ExpansionPanel
                style={{ 'background-color': 'transparent' }}
                square
                defaultExpanded={true}
                onChange={handleChange('panel1')}
              >
                <StyledExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Step 1</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Account
                  </Typography>
                </StyledExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {/* <Login /> */}
                  <Grid container xs={12} style={{ 'max-width': '670px' }}>
                    <CreateAccountForm onSubmit={handleNext} />
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
              >
                <StyledExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>Step 2</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Shipping
                  </Typography>
                </StyledExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container xs={12} style={{ 'max-width': '670px' }}>
                    <ShippingAddressForm
                      onBack={handleBack}
                      onSubmit={handleNext}
                    />
                    <ShippingForm onBack={handleBack} onSubmit={handleNext} />
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
              >
                <StyledExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className={classes.heading}>Step 3</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Payment & Billing Address
                  </Typography>
                </StyledExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container xs={12} style={{ 'max-width': '670px' }}>
                    <PaymentForm onBack={handleBack} onSubmit={handleNext} />
                    <BillingAddressForm
                      shippingAddressSeed={cart}
                      onBack={handleBack}
                      onSubmit={handleNext}
                    />
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={expanded === 'panel4'}
                onChange={handleChange('panel4')}
              >
                <StyledExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography className={classes.heading}>Step 4</Typography>
                  <Typography className={classes.secondaryHeading}>
                    Review & Order
                  </Typography>
                </StyledExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid
                    justify="space-around"
                    container
                    xs={12}
                    style={{ 'max-width': '670px' }}
                  >
                    <ReviewForm
                      cart={cart}
                      onBack={handleBack}
                      onSubmit={handleNext}
                    />
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
            <br />
            <br />
            <br />
            <br />
            <Paper>
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
                      confirmation, and will send you an update when your order
                      has shipped.
                    </Typography>
                  </>
                ) : (
                  <>{getStepContent(activeStep)}</>
                )}
              </>
            </Paper>
          </StyledCheckoutWrapper>
          <StyledCartWrapper item xs={6} sm={3}>
            <Cart />
          </StyledCartWrapper>
        </StyledMainWrapper>
      </StyledContainerGrid>
    </>
  );
};

Checkout.propTypes = {
  authToken: PropTypes.string
};

export default withAuthToken(Checkout);
