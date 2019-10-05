import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Address } from '../components/common';
import { CartSummary } from '../components/summaries';

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
    fontFamily: 'Canela Text',
    paddingBottom: '0',
    marginBottom: '22px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '40px'
    }
  },
  text1: {
    fontSize: '18px',
    fontFamily: 'freight-text-pro'
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
      maxWidth: 351,
      height: '80px',
      marginTop: '15px',
      fontSize: '16px',
      fontWeight: 900,
      fontfontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.88,
      letterSpacing: 1.33
    }
  }
}));

const OrderConfirmation = ({ history }) => {
  const account = useSelector(state => state.account);
  const order = useSelector(state => state.order.order);
  const theme = useTheme();
  const classes = useStyles();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const mainWidth = xs ? 12 : 8;
  const cartWidth = xs ? 12 : 4;
  const addressesWidth = xs ? 12 : 6;
  console.log('OrderConfirmation', { order, account });


  if (!order) {
    return null;
  }

  let orderItemsTransformed = [];
  order.items.map(item => {
   orderItemsTransformed.push({
    image_url: item.variant_img,
    quantity: item.quantity,
    sku: item.sku,
    price: item.unit_price,
    product_id: item.variant_id,
    name: item.variant_name,

   });
  });

  window.analytics.track("Order Completed", {
    "email": order.email,
    "billing_address1": order.billingAddress.line1,
    "billing_address2": order.billingAddress.line2,
    "billing_city": order.billingAddress.city,
    "billing_country": "US",
    "billing_first_name": order.billingAddress.firstName,
    "billing_last_name": order.billingAddress.lastName,
    //"billing_phone": "<<type: string, required: false>>",
    "billing_state": order.billingAddress.state,
    "billing_zip": order.billingAddress.postalCode,
    "coupon": order.promo,
    "currency": "USD",
    "discount": order.discount,
    "est_ship_date": order.shippingMethod.deliveryEstimate,
    "item_count": order.items.length,
    "order_date": order.createdAt,
    "order_id": order._id,
    "order_link": "<<type: string, required: false>>",
   // "payment_method": "<<type: string, required: false>>",
    //"payment_method_detail": "<<type: string, required: false>>",
    "products": orderItemsTransformed,
    "revenue": order.total,
    "shipping": "<<type: number, required: false>>",
    "shipping_address1": order.shippingAddress.line1,
    "shipping_address2": order.shippingAddress.line2,
    "shipping_city": order.shippingAddress.city,
    "shipping_country": order.shippingAddress.countryCode,
    "shipping_first_name": order.shippingAddress.firstName,
    "shipping_last_name": order.shippingAddress.lastName,
    "shipping_method": order.shippingMethod.displayName,
    //"shipping_phone": "<<type: string, required: false>>",
    "shipping_state": order.shippingAddress.state,
    "shipping_zip": order.shippingAddress.postalCode,
    "tax": order.tax,
    "total": order.total
    });

  const OrderCartSummary = () => {
    return <CartSummary order={order} />;
  };

  const OrderDetail = () => {
    const { cardType, last4 } = order.paymentData;
    const { shippingAddress, billingAddress } = order;
    const { email } = account.data;
    const handleOrderDetail = useCallback(
      e => {
        e.preventDefault();
        history.replace(`/orders/${order._id}`);
      },
      [history, order._id]
    );
    return (
      <Box className={classes.paper}>
        <Typography className={classes.title}>You&#39;re all set!</Typography>
        <Typography className={classes.text1} gutterBottom>
          Your order has been placed and a confirmation email has been sent to:{' '}
          {email}.
        </Typography>
        <Typography className={classes.text1}>
          Your order number:{' '}
          <strong>
            {order.orderId.substring(0, 3) +
              '-' +
              order.orderId.substring(3, 6) +
              '-' +
              order.orderId.substring(6, 10) +
              '-' +
              order.orderId.substring(10, 16) +
              '-' +
              order.orderId.substring(16)}
          </strong>
        </Typography>
        { xs ? 

        (<Grid container style={{overflow: 'hidden'}}>
          <Grid item style={{overflow: 'hidden'}}>

        <Button
          type="button"
          onClick={handleOrderDetail}
          children="Check Order Status"
          className={classes.button}
        />
          </Grid>

        </Grid>)
         : (<Button
          type="button"
          onClick={handleOrderDetail}
          children="Check Order Status"
          className={classes.button}
        />)}
        <Box
          display="flex"
          flexDirection={xs ? 'column' : 'row'}
          borderTop="1px solid #979797"
          borderBottom="1px solid #979797"
        >
          <Grid item xs={addressesWidth}>
            <Box
              borderRight={xs ? 0 : '1px solid #979797'}
              paddingBottom={xs ? '25px' : '35px'}
            >
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
              paddingLeft={xs ? 0 : 3}
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
          <Typography
            className={classes.text2}
            style={{ padding: '24px 0 16px' }}
          >
            Payment
          </Typography>
          <Typography className={classes.subText}>
            {cardType} - ***{last4}
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
  onSubmit: PropTypes.func.isRequired
};

export default withRouter(OrderConfirmation);
