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
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      backgroundColor: '#fffde7',
      padding: '15px'
    }
  },
  title: {
    fontSize: '55px',
    fontFamily: 'Canela Text',
    paddingBottom: theme.spacing(3),
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
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px'
    }
  },
  button: {
    margin: theme.spacing(3, 0, 4),
    width: '409px',
    height: '80px',
    [theme.breakpoints.down('xs')]: {
      width: '385px'
    }
  }
}));

const OrderConfirmation = ({ onSubmit }) => {
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

  const { cart, transactions } = order;
  const OrderCartSummary = () => {
    return <CartSummary cart={cart} />;
  };

  const OrderDetail = () => {
    const { cardType, last4 } = transactions[0].paymentMethod;
    const {
      shippingAddress,
      paymentDetails: { billingAddress }
    } = cart;
    const { email } = account.data;
    return (
      <Box className={classes.paper}>
        <Typography className={classes.title}>You&#39;re all set!</Typography>
        <Typography className={classes.text1} gutterBottom>
          Your order has been placed and a confirmation email has been sent to:{' '}
          {email}.
        </Typography>
        <Typography className={classes.text1}>
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

export default OrderConfirmation;
