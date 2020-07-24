import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Button, Address } from '../components/common';
import { CartSummary } from '../components/summaries';
import { GuestOrderSetPasswordForm } from '../components/forms';
import {
  receivedLoginSuccess,
  requestChangePassword,
  receivedCreateAccountSuccess,
  receivedFetchAccountSuccess
} from '../modules/account/actions';

import { receivedGetOrder } from '../modules/order/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0)
    }
  },
  main: {
    padding: theme.spacing(10, 5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0)
    }
  },
  paper: {
    backgroundColor: theme.palette.common.white,
    padding: '40px',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: 'rgba(252, 248, 244, 0.6)',
      padding: '15px'
    }
  },
  title: {
    fontSize: '55px',
    fontFamily: 'Canela Text Web',
    paddingBottom: '0',
    marginBottom: '36px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '40px'
    }
  },
  text1: {
    fontSize: '18px',
    fontFamily: 'freight-text-pro',
    lineHeight: '1.5rem'
  },
  text2: {
    fontSize: '18px',
    fontFamily: 'p22-underground',
    fontWeight: '600',
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
      fontWeight: 'normal'
    }
  },
  subText: {
    fontSize: '20px',
    fontFamily: 'p22-underground',
    lineHeight: '1.2',
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px'
    }
  },
  button: {
    margin: theme.spacing(3, 0, 4),
    width: '409px',
    height: '80px',
    lineHeight: '1.88',
    letterSpacing: '1.33px',
    [theme.breakpoints.down('xs')]: {
      width: '385px',
      paddingRight: '50px',
      overflow: 'hidden'
    }
  }
}));

const OrderConfirmation = ({ history }) => {
  const order = useSelector(state => state.order.order);
  const account = useSelector(state => state.account);
  const [guestPasswordFormSubmitted, setGuestPasswordFormSubmitted] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const mainWidth = xs ? 12 : 8;
  const cartWidth = xs ? 12 : 4;
  const addressesWidth = xs ? 12 : 6;
  let orderItemsTransformedGA = [];

  if (order) {
    orderItemsTransformedGA = order.items.map(item => ({
      id: item.variant_id,
      name: item.variant_name,
      brand: order.storeCode,
      variant: item.sku,
      quantity: item.quantity,
      price: item.unit_price
    }));
  }
  useEffect(() => {
    if (order) {
      window.analytics.page('Order Confirmation');
      window.gtag('event', 'purchase', {
        transaction_id: order.orderNumber,
        affiliation: order.storeCode,
        value: order.total,
        currency: 'USD',
        tax: order.tax,
        shipping: order.shippingMethod.price,
        items: orderItemsTransformedGA
      });

      if (
        order.account &&
        Object.prototype.hasOwnProperty.call(order.account, 'isGuest') &&
        Object.prototype.hasOwnProperty.call(order.account, 'passwordSet')
      ) {
        if (!order.account.isGuest && order.account.passwordSet) {
          if (Object.prototype.hasOwnProperty.call(account, 'temporarilyLogin')) {
            delete account.temporarilyLogin;
          }
          dispatch(receivedCreateAccountSuccess(order.account, account.data.account_jwt));
        }

        if (
          order.account.isGuest &&
          !order.account.passwordSet &&
          Object.prototype.hasOwnProperty.call(order.account, 'newsletter') &&
          order.account.newsletter
        ) {
          window.analytics.track('Subscribed', {
            email: order.account.email,
            site_location: 'checkout'
          });

          window.analytics.track('Subscribed Listrak Auto', {
            email: order.account.email,
            site_location: 'checkout'
          });
        }
      }
    }

    return () => {
      if (!matchPath(history.location.pathname, { path: '/orders' })) {
        dispatch(receivedGetOrder(null));
      }
    };
  }, []);

  const onGuestOrderPasswordSubmit = (values, actions) => {
    dispatch(
      requestChangePassword(
        account.data.account_jwt,
        {
          currentPassword: '',
          newPassword1: values.password,
          newPassword2: values.password,
          skipComparison: true,
          isGuest: false,
          passwordSet: true
        },
        actions
      )
    );
    order.account.isGuest = false;
    order.account.passwordSet = true;
    if (Object.prototype.hasOwnProperty.call(order.account, 'temporarilyLogin')) {
      delete order.account.temporarilyLogin;
    }
    dispatch(receivedCreateAccountSuccess(account.data, account.data.account_jwt));
    dispatch(receivedLoginSuccess(account.data, account.data.account_jwt));
    setGuestPasswordFormSubmitted(true);
  };

  if (!order) {
    history.push('/');
    return null;
  }

  const OrderCartSummary = () => <CartSummary order={order} hideLPCoupon={order.hideCouponCode} />;

  const OrderDetail = () => {
    const paymentMethod =
      order.paymentData && order.paymentData.method ? order.paymentData.method : 'creditCard';
    const cardType =
      paymentMethod === 'creditCard' && order.paymentData && order.paymentData.cardType
        ? order.paymentData.cardType
        : '';
    const last4 =
      paymentMethod === 'creditCard' && order.paymentData && order.paymentData.last4
        ? order.paymentData.last4
        : '';
    const paymentEmail =
      'paypal' && order.paymentData && order.paymentData.email ? order.paymentData.email : '';
    const { shippingAddress, billingAddress } = order;
    const { email } = order;
    const handleOrderDetail = useCallback(
      e => {
        e.preventDefault();
        if (
          Object.prototype.hasOwnProperty.call(account, 'data') &&
          !Object.prototype.hasOwnProperty.call(account, '_id') &&
          order.account
        ) {
          order.account.temporarilyLogin = true;
          dispatch(receivedFetchAccountSuccess(account));
        }

        history.replace(`/orders/${order._id}`, order.hideCouponCode);
      },
      [history, order._id]
    );

    const shouldShowSetPasswordForm = account.data.isGuest && !account.data.passwordSet;

    return (
      <Box className={classes.paper}>
        <Typography className={classes.title}>You&#39;re all set!</Typography>
        <Typography className={classes.text1} gutterBottom>
          Your order has been placed and a confirmation email has been sent to: {email}.
        </Typography>
        <Typography className={classes.text1}>
          Your order number: <strong>{order.orderNumber}</strong>
        </Typography>

        {xs && !shouldShowSetPasswordForm && (
          <Grid container style={{ overflow: 'hidden' }}>
            <Grid item style={{ overflow: 'hidden' }}>
              <Button
                type="button"
                onClick={handleOrderDetail}
                children="Check Order Status"
                className={classes.button}
              />
            </Grid>
          </Grid>
        )}

        {!xs && !shouldShowSetPasswordForm && (
          <Button
            type="button"
            onClick={handleOrderDetail}
            children="Check Order Status"
            className={classes.button}
          />
        )}

        {shouldShowSetPasswordForm && (
          <GuestOrderSetPasswordForm
            title={
              !guestPasswordFormSubmitted
                ? 'Save your information to easily track your order'
                : 'Success! You can now login to track your order.'
            }
            submitLabel={!guestPasswordFormSubmitted ? 'Create Account' : 'Check Order Status'}
            onSubmit={onGuestOrderPasswordSubmit}
            isSuccessful={guestPasswordFormSubmitted}
            handleOrderDetail={handleOrderDetail}
            style={{ marginBottom: '50px', marginTop: '32px' }}
          />
        )}
        <Box
          display="flex"
          flexDirection={xs ? 'column' : 'row'}
          borderTop="1px solid #979797"
          borderBottom="1px solid #979797"
        >
          <Grid
            item
            xs={addressesWidth}
            style={{ display: paymentMethod !== 'paypal' ? 'block' : 'none' }}
          >
            <Box borderRight={xs ? 0 : '1px solid #979797'} paddingBottom={xs ? '25px' : '35px'}>
              <Typography
                className={classes.text2}
                style={{ padding: xs ? '25px 0 15px' : '35px 0 25px' }}
              >
                Billing Information
              </Typography>
              <Address address={billingAddress} email={email} />
            </Box>
          </Grid>
          <Grid item xs={addressesWidth}>
            <Box
              paddingLeft={xs || paymentMethod === 'paypal' ? 0 : 3}
              borderTop={xs ? '1px solid #979797' : 0}
              paddingBottom={xs ? '25px' : '35px'}
            >
              <Typography
                className={classes.text2}
                style={{ padding: xs ? '25px 0 15px' : '35px 0 25px' }}
              >
                Shipping Information
              </Typography>
              <Address address={shippingAddress} email={email} />
            </Box>
          </Grid>
        </Box>
        <Grid item xs={addressesWidth}>
          <Typography className={classes.text2} style={{ padding: '24px 0 16px' }}>
            Payment
          </Typography>
          <Typography className={classes.subText}>
            {paymentMethod === 'creditCard' ? `${cardType} - ***${last4}` : ''}
            {paymentMethod === 'paypal' ? `PayPal: ${paymentEmail}` : ''}
          </Typography>
        </Grid>
      </Box>
    );
  };

  return (
    <Box bgcolor="rgba(252, 248, 244, 0.6)">
      <Container className={classes.root}>
        <CssBaseline />
        <Box py={xs ? 0 : 10}>
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
  history: PropTypes.object.isRequired
};

export default withRouter(OrderConfirmation);
