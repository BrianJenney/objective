import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, useMediaQuery, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { setCartNotification } from '../../modules/utils/actions';
import './CartNotification.scss';

const useStyles = makeStyles(() => ({
  box: {
    backgroundColor: '#c3f1cf',
    width: '100%',
    padding: '15px 30px',
    marginTop: '20px'
  },
  boxXS: {
    backgroundColor: '#c3f1cf',
    width: '100%',
    padding: '15px 15px',
    marginTop: '20px'
  },
  textCheckout: {
    fontSize: '16px',
    fontFamily: 'p22-underground',
    textAlign: 'center',
    letterSpacing: 'normal',
    textTransform: 'none',
    fontStretch: 'normal',
    lineHeight: '1.25',
    backgroundColor: '#c3f1cf',
    color: '#003833'
  },
  textCheckoutXS: {
    fontSize: '15px',
    fontFamily: 'p22-underground',
    textAlign: 'center',
    letterSpacing: 'normal',
    textTransform: 'none',
    fontStretch: 'normal',
    lineHeight: '1.25',
    backgroundColor: '#c3f1cf',
    color: '#003833'
  },
  text: {
    fontSize: '18px',
    fontFamily: 'p22-underground',
    textAlign: 'center',
    letterSpacing: 'normal',
    textTransform: 'none',
    fontStretch: 'normal',
    lineHeight: '1.5',
    paddingTop: '20px',
    backgroundColor: '#c3f1cf'
  },
  continue: {
    fontSize: '14px',
    fontFamily: 'p22-underground',
    fontWeight: 600,
    textAlign: 'center',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    paddingTop: '7px',
    paddingBottom: '15px',
    textDecorationLine: 'underline',
    cursor: 'pointer',
    backgroundColor: '#c3f1cf'
  },
  textXS: {
    fontSize: '16px',
    fontFamily: 'p22-underground',
    textAlign: 'center',
    letterSpacing: 'normal',
    textTransform: 'none',
    fontStretch: 'normal',
    lineHeight: '24px',
    paddingTop: '20px',
    backgroundColor: '#c3f1cf'
  },
  continueXS: {
    fontSize: '12px',
    fontFamily: 'p22-underground',
    fontWeight: 600,
    textAlign: 'center',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    paddingTop: '7px',
    paddingBottom: '15px',
    textDecorationLine: 'underline',
    cursor: 'pointer',
    backgroundColor: '#c3f1cf'
  }
}));

const PromoDiscountNotification = () => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const node = useRef();
  const discount = useSelector(state => state.cart.promo);
  const dispatch = useDispatch();
  let content = null;

  const handleClick = e => {
    if (node.current && node.current.contains(e.target)) {
      // inside click
      dispatch(setCartNotification(false));
    }
    // outside click
    dispatch(setCartNotification(false));
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('click', handleClick);
      document.addEventListener('touchstart', handleClick);
    };
  }, []);

  if (discount) {
    const discountText =
      discount.discount.type && discount.discount.type === 'PERCENT'
        ? `${discount.discount.percent_off}% `
        : `$${discount.discount.amount_off} `;

    content = (
      <>
        <Typography
          className={xs ? classes.textXS : classes.text}
          style={{ paddingBottom: '20px' }}
        >
          Your {discountText} off
          <br></br>promo code has
          <br></br>been applied to
          <br></br>your cart.
        </Typography>
      </>
    );
  }

  return content != null ? (
    <>
      <div ref={node}>
        <Paper className={xs ? 'triangleXS' : 'triangle'}>{content}</Paper>
      </div>
    </>
  ) : null;
};

const CheckoutMergeNotification = () => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <>
      <Grid className={xs ? classes.boxXS : classes.box}>
        <Typography className={xs ? classes.textCheckoutXS : classes.textCheckout}>
          We've added items from your
          <br></br>previous session to your cart.
        </Typography>
      </Grid>
    </>
  );
};

const ElsewhereMergeNotification = () => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const node = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    // add when mounted
    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('click', handleClick);
      document.addEventListener('touchstart', handleClick);
    };
  }, []);

  const handleClick = e => {
    if (node.current && node.current.contains(e.target)) {
      // inside click
      dispatch(setCartNotification(false));
    }
    // outside click
    dispatch(setCartNotification(false));
  };

  return (
    <>
      <div ref={node}>
        <Paper className={xs ? 'triangleXS' : 'triangle'}>
          <Typography className={xs ? classes.textXS : classes.text}>
            We've added items
            <br></br> from your previous
            <br></br> session to your cart.
          </Typography>
          <Typography className={xs ? classes.continueXS : classes.continue}>
            CONTINUE SHOPPING
          </Typography>
        </Paper>
      </div>
    </>
  );
};

const CartNotification = ({ isCheckoutPage }) => {
  const variant = useSelector(state => state.utils.notificationVariant);

  return variant === 'cartMerged' ? (
    isCheckoutPage ? (
      <CheckoutMergeNotification />
    ) : (
      <ElsewhereMergeNotification />
    )
  ) : (
    <PromoDiscountNotification />
  );
};

export default CartNotification;
