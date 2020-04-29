import React from 'react';
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
import { CartSummary } from '../../components/summaries';
import { StyledArrowIcon, StyledSmallCaps } from '../cart/StyledComponents';
import { formatDateTime, getShippingAndTracking } from '../../utils/misc';

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
    fontSize: '55px',
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
    fontSize: 18
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
  }
}));

const getStatusStepper = statusStepper => {
  // const { deliveredStatus } = statusStepper;
  const processedDate = formatDateTime(statusStepper.processedDate, false);
  const shippedDate = statusStepper.shippedDate ? formatDateTime(statusStepper.shippedDate, false) : '';
  const deliveredDate = statusStepper.deliveredDate ? formatDateTime(statusStepper.deliveredDate, false) : '';
  const cancelledDate = formatDateTime(statusStepper.updatedAt, false);

  return {
    Processed: processedDate,
    Shipped: shippedDate,
    Delivered: deliveredDate,
    Cancelled: cancelledDate
    // deliveredStatus
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
            style={{ color: 'black', textDecoration: 'underline' }}
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

const OrderCartSummary = ({ order }) => (order ? <CartSummary order={order} /> : null);

const cancelOrder = (orderId, orderNumber, dispatch) => {
  dispatch(requestCancelOrder(orderId, orderNumber));
};

const OrderSummary = ({
  account,
  billingAddress,
  shippingAddress,
  paymentData,
  classes,
  orderId,
  orderNumber,
  createdAt,
  addressesWidth,
  xs,
  statusStepper,
  tracking,
  orderStatus
}) => {
  const { cardType, last4 } = paymentData;
  const { email } = account.data;
  const { phone } = billingAddress;
  const dispatch = useDispatch();

  return (
    <Box className={classes.paper}>
      <Box>
        <RouterLink to="/account/orders" className="account-history-return">
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
      {orderStatus !== 'declined' && orderStatus !== 'created' && (
        <StatusStepper statusStepper={statusStepper} status={orderStatus} />
      )}

      {orderStatus === 'canceled' ? (
        <Typography className={classes.textFreight} style={{ padding: '60px 0' }}>
          Have questions about your order? You can reach customer service at (800) 270-5771.
        </Typography>
      ) : null}

      {orderStatus === 'placed' ? (
        <CommonButton
          style={{
            padding: '23px 23px',
            marginBottom: '25px',
            minWidth: '210px'
          }}
          onClick={() => {
            if (orderStatus === 'placed') {
              cancelOrder(orderId, orderNumber, dispatch);
            }
          }}
        >
          Cancel Order
        </CommonButton>
      ) : (
          ''
        )}
      <Box display="flex" flexDirection={xs ? 'column' : 'row'} borderTop={1} borderBottom={1}>
        <Grid item xs={addressesWidth}>
          <Box borderRight={xs ? 0 : 1} paddingBottom={3}>
            <StyledSmallCaps style={{ padding: '24px 0 16px' }}>Billing Information</StyledSmallCaps>
            <Address address={billingAddress} email={email} phone={phone || null} />
          </Box>
        </Grid>
        <Grid item xs={addressesWidth}>
          <Box paddingLeft={xs ? 0 : 3} borderTop={xs ? 1 : 0} paddingBottom={3}>
            <StyledSmallCaps style={{ padding: '24px 0 16px' }}>Shipping Information</StyledSmallCaps>
            <Address address={shippingAddress} />
            {tracking && (
              <Box className={classes.textTracking}>
                <Typography className={classes.text}>Tracking #:</Typography>
                <TrackingInfo className={classes.text} tracking={tracking} />
              </Box>
            )}
          </Box>
        </Grid>
      </Box>
      <Grid item xs={addressesWidth}>
        <StyledSmallCaps style={{ padding: '24px 0 16px' }}>Payment</StyledSmallCaps>
        <Typography className={classes.text}>
          {cardType} - ***{last4}
        </Typography>
      </Grid>
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

  if (!order) return null;
  const { tracking, statusStepper } = getShippingAndTracking(order);
  const status = getStatusStepper(statusStepper);
  order.status = statusStepper.status;

  return (
    <Box bgcolor="rgba(252, 248, 244, 0.5)">
      <Container>
        <CssBaseline />
        <Box py={10} className={classes.containingBox}>
          <Grid container spacing={xs ? 0 : 4}>
            <Grid item xs={mainWidth}>
              <OrderSummary
                account={account}
                orderNumber={order.orderNumber}
                orderId={order._id}
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
              />
            </Grid>
            <Grid item xs={cartWidth}>
              <OrderCartSummary order={order} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default OrderDetail;
