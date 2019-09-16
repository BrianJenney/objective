import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Address } from '../../components/common';
import { CartSummary } from '../../components/summaries';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { StyledSmallCaps } from '../../pages/cart/StyledComponents';
import {formatDateTime} from '../../utils/misc';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fffde7'
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

const OrderCartSummary = ({cart}) => {
  return cart ? <CartSummary cart={cart} /> : null;
};

const OrderSummary = ({
  account,
  cart,
  transactions,
  classes,
  orderId,
  status,
  updatedAt,
  addressesWidth,
  xs,
}) => {
  const { cardType, last4 } = transactions[0].paymentMethod;
  const { shippingAddress, paymentDetails: { billingAddress }, shippingMethod } = cart;
  const { email } = account.data;
  return (
    <Box className={classes.paper}>
      <Typography className={classes.text}>
        Your order number: <strong>{orderId}</strong>
      </Typography>
      <Typography className={classes.text}>
        Status: <strong>{status}</strong> on {updatedAt}
      </Typography>
      <br/>
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
      <Box
        display="flex"
        flexDirection={xs ? 'column' : 'row'}
        borderTop={1}
        borderBottom={1}
      >
        <Grid item xs={addressesWidth}>
          <Box borderRight={xs ? 0 : 1} paddingBottom={3}>
            <StyledSmallCaps style={{ padding: '24px 0 16px' }}>
              Payment
            </StyledSmallCaps>
            <Typography className={classes.text}>
              {cardType} - ***{last4}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={addressesWidth}>
          <Box
            paddingLeft={xs ? 0 : 3}
            borderTop={xs ? 1 : 0}
            paddingBottom={3}
          >
            <StyledSmallCaps style={{ padding: '24px 0 16px' }}>
              Shipment Method
            </StyledSmallCaps>
            <Typography className={classes.text}>
              {shippingMethod.displayName} - {shippingMethod.deliveryEstimate}
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

const OrderDetail = () => {
  const account = useSelector(state => state.account);
  const order = useSelector(state => state.order.order);
  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const mainWidth = xs ? 12 : 8;
  const cartWidth = xs ? 12 : 4;
  const addressesWidth = xs ? 12 : 6;

  if (!order ) return null;
  const { cart, transactions } = order;
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Box className={classes.main}>
        <Grid container spacing={xs ? 0 : 4}>
          <Grid item xs={12} >
            <Box>
              <Typography className={classes.title}>Order Detail</Typography>
            </Box>
          </Grid>
          <Grid item xs={mainWidth}>
            <OrderSummary
              account={account}
              orderId={order._id}
              status={order.status}
              updatedAt={formatDateTime(order.updatedAt, true)}
              cart={cart}
              transactions={transactions}
              classes={classes}
              addressesWidth={addressesWidth}
              xs={xs}
            />
          </Grid>
          <Grid item xs={cartWidth}>
            <OrderCartSummary
              cart={cart}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default OrderDetail;
