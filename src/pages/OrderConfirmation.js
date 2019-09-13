import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '../components/common';
import { CartSummary } from '../components/summaries';

const Address = ({ address, email }) => {
  return (
    <>
      <Typography component="h1" variant="h4" align="left">
        {address.firstName} {address.lastName}
      </Typography>
      <Typography component="h1" variant="h4" align="left">
        {address.line1}
      </Typography>
      <Typography component="h1" variant="h4" align="left">
        {address.city}, {address.state} {address.postalCode}
      </Typography>
      <Typography component="h1" variant="h4" align="left">
        {email}
      </Typography>
    </>
  );
};
const OrderConfirmation = ({ onSubmit }) => {
  const account = useSelector(state => state.account);
  const order = useSelector(state => state.order);
  const { cart, transactions } = order;
  const theme = useTheme();
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
    const { email } = account;
    return (
      <Grid container xs={12}>
        <Grid item xs={mainWidth}>
          <Typography component="h1" variant="h2" align="left">
            <strong>You&#39;re all set!</strong>
          </Typography>
          <br />
          <Typography component="h1" variant="h4" align="left">
            Your order has been placed and a confirmation email email has been
            sent to: {email}.
          </Typography>
          <br />
          <Typography component="h1" variant="h4" align="left">
            Your order number: {order._id}.
          </Typography>
          <br />
          <Button
            type="button"
            onClick={onSubmit}
            children="Check Order Status"
          />
          <br />
        </Grid>
        <br />
        <br />
        <Grid container xs={mainWidth}>
          <Grid item xs={addressesWidth}>
            <br />
            <Typography component="h1" variant="h4" align="left">
              <strong>Billing Information</strong>
            </Typography>
            <Address address={billingAddress} email={email} />
          </Grid>
          <Grid item xs={addressesWidth}>
            <br />
            <Typography component="h1" variant="h4" align="left">
              <strong>Shipping Information</strong>
            </Typography>
            <Address address={shippingAddress} email={email} />
          </Grid>
          <Grid item xs={addressesWidth}>
            <br />
            <Typography component="h1" variant="h4" align="left">
              Payment **** {cardType} - {last4}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container direction={xs ? 'column' : 'row'}>
      <Grid item xs={mainWidth}>
        <OrderDetail />
      </Grid>
      <Grid item xs={cartWidth}>
        <OrderCartSummary />
      </Grid>
    </Grid>
  );
};

OrderConfirmation.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default OrderConfirmation;
