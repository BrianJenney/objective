import React from 'react';

import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import {AdapterLink, Address} from '../../components/common';
import { CartSummary } from '../../components/summaries';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import {StyledArrowIcon, StyledSmallCaps} from '../../pages/cart/StyledComponents';
import { formatDateTime } from '../../utils/misc';
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import LeftArrowIcon from '@material-ui/icons/ChevronLeft';
import StatusStepper from './StatusStepper';

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

const getStatusStepperDate = (order) => {
  const processedDate = formatDateTime(order.createdAt, false);
  const shippedDate = '';
  const deliveredDate = '';
  return {
    Processed: processedDate,
    Shipped: shippedDate,
    Delivered: deliveredDate,
  };
};

const TrackingInfo = ({ trackingId}, classes) => {
  return (
    <Typography className={classes.text}>Tracking #: <Link to={`${trackingId}`}>{trackingId}</Link></Typography>
  );
};

const OrderCartSummary = ({ cart }) => {
  return cart ? <CartSummary cart={cart} /> : null;
};

const OrderSummary = ({
  account,
  cart,
  transactions,
  classes,
  orderId,
  createdAt,
  addressesWidth,
  xs,
  statusStepperDate
}) => {
  const { cardType, last4 } = transactions[0].paymentMethod;
  const {
    shippingAddress,
    paymentDetails: { billingAddress },
  } = cart;
  const { email, phoneBook } = account.data;
  return (
    <Box className={classes.paper}>
      <Box>
        <Button color="primary" component={AdapterLink} to="/account/orders">
          <StyledArrowIcon>
            <LeftArrowIcon />
          </StyledArrowIcon>
          <StyledSmallCaps component="span">
            {'Return to order history'}
          </StyledSmallCaps>
        </Button>

        <Typography className={classes.title}>Order Details</Typography>
      </Box>

      <Typography className={classes.text}>
        Your order number: <strong>{orderId}</strong>, placed on <strong>{createdAt}</strong>
      </Typography>
      <br />
      <StatusStepper statusStepperDate={statusStepperDate}/>
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
            <Address address={billingAddress} email={email} phone={phoneBook ? phoneBook.defaultNum : '1234567890'}/>
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
            <TrackingInfo classes={classes} trackingId="123456789012345"/>
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
  const { cart, transactions } = order;
  const statusStepperDate = getStatusStepperDate(order);

  return (
    <Box bgcolor="rgba(252, 248, 244, 0.5)">
      <Container>
        <CssBaseline />
        <Box py={10}>
          <Grid container spacing={xs ? 0 : 4}>
            <Grid item xs={mainWidth}>
              <OrderSummary
                account={account}
                orderId={order._id}
                createdAt={formatDateTime(order.createdAt, false)}
                cart={cart}
                transactions={transactions}
                classes={classes}
                addressesWidth={addressesWidth}
                xs={xs}
                statusStepperDate={statusStepperDate}
              />
            </Grid>
            <Grid item xs={cartWidth}>
              <OrderCartSummary cart={cart} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default OrderDetail;
