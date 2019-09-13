import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '../components/common';
import { CartSummary } from '../components/summaries';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[400]
  },
  main: {
    padding: theme.spacing(10, 5, 10, 15),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 0)
    }
  },
  paper: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(3, 4)
  },
  title: {
    fontSize: '40px',
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: '17px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    padding: theme.spacing(3, 0, 2)
  },
  text: {
    fontSize: '17px'
  },
  button: {
    margin: theme.spacing(3, 0, 4)
  }
}));

const Address = ({ address, email }) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.text}>
        {address.firstName} {address.lastName}
      </Typography>
      <Typography className={classes.text}>{address.line1}</Typography>
      <Typography className={classes.text}>
        {address.city}, {address.state} {address.postalCode}
      </Typography>
      <Typography className={classes.text}>{email}</Typography>
    </>
  );
};
const OrderConfirmation = ({ onSubmit }) => {
  const account = useSelector(state => state.account);
  const order = useSelector(state => state.order);
  const { cart, transactions } = order;
  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const mainWidth = xs ? 12 : 8;
  const cartWidth = xs ? 12 : 4;
  const addressesWidth = xs ? 12 : 6;
  console.log('OrderConfirmation', { order, account });
  const isEmptyOrSpaces = str => {
    return str === null || str.match(/^ *$/) !== null;
  };

  // This is how you test for an empty object literal:
  if (Object.keys(order).length === 0 && order.constructor === Object)
    return <div></div>;

  const OrderCartSummary = () => {
    return <CartSummary cart={cart} />;
  };

  const OrderDetail = () => {
    const { cardType, last4 } = transactions[0].paymentMethod;
    const { shippingAddress, billingAddress } = cart;
    const { email } = account.data;
    return (
      <Box className={classes.paper}>
        <Typography className={classes.title}>You&#39;re all set!</Typography>

        <Typography className={classes.text} gutterBottom>
          Your order has been placed and a confirmation email email has been
          sent to: {email}.
        </Typography>

        <Typography className={classes.text}>
          Your order number: <strong>{order._id}</strong>
        </Typography>

        <Button
          type="button"
          onClick={onSubmit}
          children="Check Order Status"
          className={classes.button}
        />

        <Box display="flex" flexDirection="row" borderTop={1} borderBottom={1}>
          <Grid item xs={addressesWidth}>
            <Box borderRight={1} paddingBottom={3}>
              <Typography className={classes.subTitle}>
                Billing Information
              </Typography>
              <Address address={billingAddress} email={email} />
            </Box>
          </Grid>
          <Grid item xs={addressesWidth}>
            <Box paddingLeft={3}>
              <Typography className={classes.subTitle}>
                Shipping Information
              </Typography>
              <Address address={shippingAddress} email={email} />
            </Box>
          </Grid>
        </Box>
        <Grid item xs={addressesWidth}>
          <Typography className={classes.subTitle}>Payment</Typography>
          <Typography className={classes.text}>
            {cardType} - ***{last4}
          </Typography>
        </Grid>
      </Box>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Box className={classes.main}>
        <Grid container spacing={2}>
          <Grid item xs={mainWidth}>
            <OrderDetail />
          </Grid>
          <Grid item xs={cartWidth}>
            <OrderCartSummary />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

OrderConfirmation.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default OrderConfirmation;
