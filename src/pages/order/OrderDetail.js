import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import LeftArrowIcon from '@material-ui/icons/ChevronLeft';

import {
  Address,
  Button as CommonButton
} from '../../components/common';
import { CartSummary } from '../../components/summaries';
import { StyledArrowIcon, StyledSmallCaps } from '../cart/StyledComponents';
import { formatDateTime } from '../../utils/misc';

import StatusStepper from './StatusStepper';

import {
  requestRefundTransaction
} from '../../modules/order/actions';

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
    fontWeight: 'bold',
    marginTop: '30px',
    fontFamily: 'Canela Text Web',
    fontWeight: 'normal',
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
  }
}));

const getStatusStepperDate = order => {
  const processedDate = formatDateTime(order.createdAt, false);
  const shippedDate = '';
  const deliveredDate = '';
  return {
    Processed: processedDate,
    Shipped: shippedDate,
    Delivered: deliveredDate
  };
};

const TrackingInfo = ({ trackingId }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.text} pt={2}>
      Tracking #: <Link to={`${trackingId}`}>{trackingId}</Link>
    </Typography>
  );
};

const OrderCartSummary = ({ order }) => {
  return order ? <CartSummary order={order} /> : null;
};

const refundTransaction = (
  accountJwt,
  orderId,
  transaction,
  dispatch,
  orderRef
) => {
  const refundedTransaction = {
    braintreeId: transaction.braintreeId,
    amount: transaction.amount,
    orderId: orderId,
    orderReference: orderRef
  };

  dispatch(requestRefundTransaction(accountJwt, refundedTransaction));
};

const OrderSummary = ({
  account,
  billingAddress,
  shippingAddress,
  paymentData,
  transactions,
  classes,
  orderId,
  orderRef,
  createdAt,
  addressesWidth,
  xs,
  statusStepperDate,
  orderStatus
}) => {
  const { cardType, last4 } = paymentData;
  const { email, phoneBook, account_jwt } = account.data;
  const dispatch = useDispatch();

  let orderRefunded = false;

  transactions.map(transaction => {
    console.log(transaction.status);
    if (transaction.transactionStatus === 'voided') {
      orderRefunded = true;
    }
  });

  return (
    <Box className={classes.paper}>
      <Box>
        <Link to="/account/orders" className="account-history-return">
          <StyledArrowIcon>
            <LeftArrowIcon />
          </StyledArrowIcon>
          <span>{'Return to order history'}</span>
        </Link>
        <Typography className={classes.title}>Order Details</Typography>
      </Box>
      <Typography className={classes.textFreight}>
        Your order number: <strong>{orderId}</strong>, placed on{' '}
        <strong>{createdAt}</strong>
      </Typography>
      <br />
      <StatusStepper statusStepperDate={statusStepperDate} />
      {orderStatus !== 'shipped' ? (
        <CommonButton
          style={{
            padding: '23px 23px',
            marginBottom: '25px',
            minWidth: '210px'
          }}
          onClick={() => {
            if (!orderRefunded) {
              refundTransaction(
                account_jwt,
                orderId,
                transactions[0],
                dispatch,
                orderRef
              );
            }
          }}
        >
          {orderRefunded ? 'Order Refunded' : 'Cancel Order'}
        </CommonButton>
      ) : (
        ''
      )}
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
            <Address
              address={billingAddress}
              email={email}
              phone={phoneBook ? phoneBook.defaultNum : '1234567890'}
            />
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
            <Address address={shippingAddress} />
            <TrackingInfo
              className={classes.text}
              trackingId="123456789012345"
            />
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
  const statusStepperDate = getStatusStepperDate(order);
  const orderId =
    order.orderId.substring(0, 3) +
    '-' +
    order.orderId.substring(3, 6) +
    '-' +
    order.orderId.substring(6, 10) +
    '-' +
    order.orderId.substring(10, 16) +
    '-' +
    order.orderId.substring(16);

  return (
    <Box bgcolor="rgba(252, 248, 244, 0.5)">
      <Container>
        <CssBaseline />
        <Box py={10} className={classes.containingBox}>
          <Grid container spacing={xs ? 0 : 4}>
            <Grid item xs={mainWidth}>
              <OrderSummary
                account={account}
                orderId={orderId}
                orderRef={order._id}
                createdAt={formatDateTime(order.createdAt, false)}
                shippingAddress={order.shippingAddress}
                billingAddress={order.billingAddress}
                paymentData={order.paymentData}
                transactions={order.transactions}
                orderStatus={order.status}
                classes={classes}
                addressesWidth={addressesWidth}
                xs={xs}
                statusStepperDate={statusStepperDate}
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
