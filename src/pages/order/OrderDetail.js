import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@material-ui/core/Link';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import LeftArrowIcon from '@material-ui/icons/ChevronLeft';

import { Address, Button as CommonButton } from '../../components/common';
import { GuestOrderSetPasswordForm } from '../../components/forms';
import { CartSummary } from '../../components/summaries';
import { StyledArrowIcon, StyledSmallCaps } from '../cart/StyledComponents';
import { formatDateTime, getShippingAndTracking } from '../../utils/misc';
import {
  requestChangePassword,
  receivedLoginSuccess,
  receivedCreateAccountSuccess
} from '../../modules/account/actions';

import StatusStepper from './StatusStepper';

import { requestCancelOrder } from '../../modules/order/actions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rgba(252, 248, 244, 0.6)'
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
      backgroundColor: 'rgba(252, 248, 244, 0.6)',
      padding: 0
    }
  },
  title: {
    fontSize: '36px',
    marginTop: '30px',
    fontFamily: 'Canela Text Web',
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      fontSize: 40
    }
  },
  text: {
    fontSize: '20px',
    fontFamily: 'p22-underground, sans-serif',
    lineHeight: '1.2',
    [theme.breakpoints.down('xs')]: {
      fontSize: 18
    }
  },
  textFreight: {
    fontSize: 18,
    lineHeight: '1.5rem'
  },
  textTracking: {
    marginTop: '16px'
  },
  button: {
    margin: theme.spacing(3, 0, 4)
  },
  containingBox: {
    [theme.breakpoints.down('xs')]: {
      padding: 0
    }
  },
  link: {
    color: '#000'
  },
  cancelledText: {
    fontFamily: 'p22-underground, sans-serif',
    color: '#d0021b'
  },
  box: {
    maxWidth: '1200px',
    margin: '0 auto'
  }
}));

const getStatusStepper = statusStepper => {
  const processedDate = formatDateTime(statusStepper.processedDate, false);
  const shippedDate = statusStepper.shippedDate
    ? formatDateTime(statusStepper.shippedDate, false)
    : '';
  const deliveredDate = statusStepper.deliveredDate
    ? formatDateTime(statusStepper.deliveredDate, false)
    : '';
  const cancelledDate = formatDateTime(statusStepper.updatedAt, false);

  return {
    Processed: processedDate,
    Shipped: shippedDate,
    Delivered: deliveredDate,
    Cancelled: cancelledDate
  };
};

const TrackingInfo = ({ tracking }) => {
  const classes = useStyles();
  return tracking.map(tracking => (
    <>
      <Typography className={classes.text} pt={2}>
        {tracking && (
          <Link
            href={tracking.url}
            style={{ color: 'black' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tracking.number}
          </Link>
        )}
      </Typography>
    </>
  ));
};

const OrderCartSummary = ({ order, hideLPCoupon }) =>
  order ? <CartSummary order={order} hideLPCoupon={hideLPCoupon} /> : null;

const cancelOrder = (orderRef, orderNumber, dispatch) => {
  dispatch(requestCancelOrder(orderRef, orderNumber));
};

const OrderSummary = ({
  hideLPCoupon,
  account,
  billingAddress,
  shippingAddress,
  paymentData,
  classes,
  orderId,
  orderNumber,
  orderEmail,
  orderRef,
  createdAt,
  addressesWidth,
  xs,
  statusStepper,
  tracking,
  orderStatus,
  order
}) => {
  const dispatch = useDispatch();
  const [guestPasswordFormSubmitted, setGuestPasswordFormSubmitted] = useState(false);
  const onGuestOrderPasswordSubmit = (values, actions) => {
    dispatch(
      requestChangePassword(
        order.account.account_jwt,
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
    if (order.account.hasOwnProperty('temporarilyLogin')) {
      delete order.account.temporarilyLogin;
    }
    dispatch(receivedCreateAccountSuccess(order.account, order.account.account_jwt));
    dispatch(receivedLoginSuccess(order.account, order.account.account_jwt));
    setGuestPasswordFormSubmitted(true);
  };

  const paymentMethod = paymentData && paymentData.method ? paymentData.method : 'creditCard';
  const cardType =
    paymentMethod === 'creditCard' && paymentData && paymentData.cardType
      ? paymentData.cardType
      : '';
  const last4 =
    paymentMethod === 'creditCard' && paymentData && paymentData.last4 ? paymentData.last4 : '';
  const paymentEmail = 'paypal' && paymentData && paymentData.email ? paymentData.email : '';

  const { phone } = billingAddress;

  const shouldShowSetPasswordForm = !!(
    order.hasOwnProperty('account') &&
    order.account.hasOwnProperty('passwordSet') &&
    order.account.hasOwnProperty('isGuest') &&
    !order.account.passwordSet &&
    order.account.isGuest
  );

  return (
    <Box className={classes.paper}>
      <Box>
        <RouterLink
          to={{
            pathname: '/account/orders',
            state: hideLPCoupon
          }}
          className="account-history-return"
          style={{
            display:
              order.hasOwnProperty('account') ||
              (account.data && account.data.hasOwnProperty('temporarilyLogin'))
                ? 'none'
                : 'block'
          }}
        >
          <StyledArrowIcon>
            <LeftArrowIcon />
          </StyledArrowIcon>
          <span>Return to order history</span>
        </RouterLink>
        <Typography className={classes.title}>Order Details</Typography>
      </Box>
      {orderStatus === 'canceled' ? (
        <Typography className={classes.textFreight}>
          Your order number: <strong>{orderId}</strong>, placed on <strong>{createdAt}</strong>
          <br></br>
          Order status: <strong className={classes.cancelledText}>CANCELLED</strong>
        </Typography>
      ) : (
        <Typography className={classes.textFreight}>
          Your order number: <strong>{orderId}</strong>, placed on <strong>{createdAt}</strong>
        </Typography>
      )}
      <br />
      {orderStatus !== 'canceled' && orderStatus !== 'declined' && orderStatus !== 'created' && (
        <StatusStepper statusStepper={statusStepper} status={orderStatus} />
      )}

      {orderStatus === 'placed' ? (
        <CommonButton
          style={{
            margin: '25px 0',
            minWidth: '210px'
          }}
          onClick={() => {
            if (orderStatus === 'placed') {
              cancelOrder(orderRef, orderNumber, dispatch);
            }
          }}
        >
          Cancel Order
        </CommonButton>
      ) : (
        ''
      )}
      {shouldShowSetPasswordForm && (
        <GuestOrderSetPasswordForm
          title={
            !guestPasswordFormSubmitted
              ? 'Add a password for faster access next time'
              : 'Success! You can now login to track your order.'
          }
          submitLabel={!guestPasswordFormSubmitted ? 'Remember Me' : 'Check Order Status'}
          onSubmit={onGuestOrderPasswordSubmit}
          isSuccessful={guestPasswordFormSubmitted}
          handleOrderDetail={false}
          style={{ marginBottom: '50px', marginTop: '32px' }}
        />
      )}
      <Typography className={classes.textFreight} style={{ padding: '50px 0' }}>
        Have questions about your order? You can reach customer service at (800) 270-5771.
      </Typography>
      <Box display="flex" flexDirection={xs ? 'column' : 'row'} borderTop={1} borderBottom={1}>
        <Grid
          item
          xs={addressesWidth}
          style={{ display: paymentMethod !== 'paypal' ? 'block' : 'none' }}
        >
          <Box borderRight={xs ? 0 : 1} paddingBottom={3}>
            <StyledSmallCaps style={{ padding: '24px 0 16px' }}>
              Billing Information
            </StyledSmallCaps>
            <Address address={billingAddress} email={orderEmail} phone={phone || null} />
          </Box>
        </Grid>
        <Grid item xs={addressesWidth}>
          <Box
            paddingLeft={xs ? 0 : paymentMethod !== 'paypal' ? 3 : 0}
            borderTop={xs ? 1 : 0}
            paddingBottom={3}
          >
            <StyledSmallCaps style={{ padding: '24px 0 16px' }}>
              Shipping Information
            </StyledSmallCaps>
            <Address address={shippingAddress} />
            {tracking && (
              <>
                <Typography className={classes.text} pt={2}>
                  Tracking #:
                </Typography>
                <TrackingInfo className={classes.text} tracking={tracking} />
              </>
            )}
          </Box>
        </Grid>
      </Box>
      <Grid item xs={addressesWidth}>
        <StyledSmallCaps style={{ padding: '24px 0 16px' }}>Payment</StyledSmallCaps>
        <Typography className={classes.text}>
          {paymentMethod === 'creditCard' ? `${cardType} - ***${last4}` : ''}
          {paymentMethod === 'paypal' ? `PayPal: ${paymentEmail}` : ''}
        </Typography>
      </Grid>
    </Box>
  );
};

const OrderDetail = ({ hideLPCoupon }) => {
  const account = useSelector(state => state.account);
  const order = useSelector(state => state.order.order);

  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const mainWidth = xs ? 12 : 8;
  const cartWidth = xs ? 12 : 4;
  const addressesWidth = xs ? 12 : 6;

  if (!order) return null;
  const { tracking, statusStepper } = getShippingAndTracking(order);
  const status = getStatusStepper(statusStepper);
  order.status = statusStepper.status;

  return (
    <div style={{ backgroundColor: 'rgba(252, 248, 244, 0.5)' }}>
      <div className={classes.box}>
        <Box bgcolor="rgba(252, 248, 244, 0.5)">
          <Container>
            <CssBaseline />
            <Box py={10} className={classes.containingBox}>
              <Grid container spacing={xs ? 0 : 4}>
                <Grid item xs={mainWidth}>
                  <OrderSummary
                    account={account}
                    orderNumber={order.orderNumber}
                    orderId={order.orderNumber}
                    orderRef={order._id}
                    orderEmail={order.email}
                    createdAt={formatDateTime(order.createdAt, false)}
                    shippingAddress={order.shippingAddress}
                    billingAddress={order.billingAddress}
                    paymentData={order.paymentData}
                    orderStatus={order.status}
                    classes={classes}
                    addressesWidth={addressesWidth}
                    xs={xs}
                    tracking={tracking}
                    statusStepper={status}
                    order={order}
                  />
                </Grid>
                <Grid item xs={cartWidth}>
                  <OrderCartSummary order={order} />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </div>
    </div>
  );
};

export default OrderDetail;
