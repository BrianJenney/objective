import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button, Address } from '../components/common';
import { CartSummary } from '../components/summaries';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { StyledSmallCaps } from '../pages/cart/StyledComponents';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rgba(252, 248, 244, 0.5)'
  },
  main: {
    padding: theme.spacing(10, 5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 0)
    }
  },
  paper: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(3, 4),
    [theme.breakpoints.down('xs')]: {
      backgroundColor: '#fffde7'
    }
  },
  title: {
    fontSize: '45px',
    fontWeight: 'bold',
    paddingBottom: theme.spacing(4)
  },
  text: {
    fontSize: '20px'
  },
  button: {
    margin: theme.spacing(3, 0, 4)
  }
}));

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
  // console.log('OrderConfirmation', { order, account });

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
          Your order has been placed and a confirmation email has been
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
        <Box
          display="flex"
          flexDirection={xs ? 'column' : 'row'}
          borderTop={1}
          borderBottom={1}
        >
          <Grid item xs={addressesWidth}>
            <Box borderRight={xs ? 0 : 1} paddingBottom={3}>
              <StyledSmallCaps style={{ padding: '24px 0 16px' }}>
                Billing Information
              </StyledSmallCaps>
              {/* No billingAddress in returned data. Use shippingAddress here for design purpose */}
              <Address address={billingAddress} email={email} />
            </Box>
          </Grid>
          <Grid item xs={addressesWidth}>
            <Box
              paddingLeft={xs ? 0 : 3}
              borderTop={xs ? 1 : 0}
              paddingBottom={3}
            >
              <StyledSmallCaps style={{ padding: '24px 0 16px' }}>
                Shipping Information
              </StyledSmallCaps>
              <Address address={shippingAddress} email={email} />
            </Box>
          </Grid>
        </Box>
        <Grid item xs={addressesWidth}>
          <StyledSmallCaps style={{ padding: '24px 0 16px' }}>
            Payment
          </StyledSmallCaps>
          <Typography className={classes.text}>
            {cardType} - ***{last4}
          </Typography>
        </Grid>
      </Box>
    );
  };

  return (
    <Box bgcolor="rgba(252, 248, 244, 0.5)">
      <Container>
        <CssBaseline />
        <Box py={10}>
          <Grid container spacing={xs ? 0 : 4}>
            <Grid item xs={mainWidth}>
              <OrderDetail />
            </Grid>
            <Grid item xs={cartWidth}>
              <OrderCartSummary />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

OrderConfirmation.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default OrderConfirmation;
