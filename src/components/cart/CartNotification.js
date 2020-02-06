import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { setCartNotification } from '../../modules/utils/actions';
import './CartNotification.scss';

const useStyles = makeStyles(() => ({
  text: {
    fontSize: '18px',
    fontFamily: 'p22-underground',
    textAlign: 'center',
    letterSpacing: 'normal',
    textTransform: 'none',
    fontStretch: 'normal',
    lineHeight: '1.5',
    paddingTop: '35px',
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
    paddingTop: '22px',
    backgroundColor: '#c3f1cf'
  }
}));

const CartNotification = () => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const node = useRef();
  const notificationVariant = useSelector(state => state.utils.notificationVariant);
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

  if (discount && notificationVariant === 'applyPromoCode') {
    content = (
      <>
        {xs ? (
          <>
            <Typography className={classes.textXS}>
              Your 25% off
              <br></br>promo code has
              <br></br>been applied to
              <br></br>your cart.
            </Typography>
          </>
        ) : (
          <>
            <Typography className={classes.text}>
              Your
              {discount.discount.type && discount.discount.type === 'PERCENT'
                ? ` ${discount.discount.percent_off}% `
                : `$${discount.discount.amount_off} `}
              off
              <br></br>promo code has
              <br></br>been applied to
              <br></br>your cart.
            </Typography>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div ref={node}>
        <Paper className={xs ? 'triangleXS' : 'triangle'}>{content}</Paper>
      </div>
    </>
  );
};

export default CartNotification;
