import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Grid, Paper, Typography } from '@material-ui/core';
import { Button } from '../common';
import store from '../../store';
import Cart from '../../pages/Cart';

const ResultForm = ({ onSubmit }) => {
  const { account, cart, order } = store.getState();

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const mainWidth = xs ? 12 : 10;
  const cartWidth = xs ? 12 : 2;
  const addressesWidth = xs ? 12 : 6;

  const isEmptyOrSpaces = str => {
    return str === null || str.match(/^ *$/) !== null;
  };

  return (
    <Grid container xs={12}>
      <Grid item xs={mainWidth}>
        <Typography component="h1" variant="h2" align="center">
          You&#39;re all set!
        </Typography>
        <Typography component="h1" variant="h4" align="center">
          Your order has been placed and a confirmation email email has been
          sent to: {account.email}.
        </Typography>
        <Typography component="h1" variant="h4" align="center">
          Your order number: {order._id}.
        </Typography>
        <Button
          type="button"
          onClick={onSubmit}
          children="Check Order Status"
        />
      </Grid>
      <Grid container xs={mainWidth}>
        <Grid item xs={addressesWidth}>
          <Typography component="h1" variant="h4" align="center">
            Billing Information:
          </Typography>
          <Typography component="h1" variant="h4" align="center">
            {cart.billingAddress.firstName} {cart.billingAddress.lastName}
            <br />
            {cart.billingAddress.line1}
            <br />
            {!isEmptyOrSpaces(cart.billingAddress.line2) && cart.billingAddress.line2(<br />)}
            {account.email}
          </Typography>
        </Grid>
        <Grid item xs={addressesWidth}>
          <Typography component="h1" variant="h4" align="center">
            Shipping Information
          </Typography>
          <Typography component="h1" variant="h4" align="center">
            {cart.shippingAddress.firstName} {cart.shippingAddress.lastName}
            <br />
            {cart.shippingAddress.line1}
            <br />
            {!isEmptyOrSpaces(cart.shippingAddress.line2) && cart.shippingAddress.line2 (<br />)}
            {account.email}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={cartWidth}>
        <Cart />
      </Grid>
      <Grid item xs={12}>
        <Typography component="h1" variant="h4" align="left">
          Payment
        </Typography>
        ****{cart.paymentDetails.number}
      </Grid>
    </Grid>
  );
};

ResultForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ResultForm;
