import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Tooltip, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { unSetCartMergeNotification } from '../../modules/cart/actions';
import './CartMergeNotification.scss';

const useStyles = makeStyles(theme => ({
  text: {
    fontSize: '18px',
    fontFamily: "p22-underground",
    textAlign: 'center',
    letterSpacing: 'normal',
    textTransform: 'none',
    fontStretch: 'normal',
    lineHeight: '1.5',
    paddingTop: '35px',
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
    textDecorationLine: 'underline',
    cursor: 'pointer',
    backgroundColor: '#c3f1cf',
  },
  textXS: {
    fontSize: '16px',
    fontFamily: "p22-underground",
    textAlign: 'center',
    letterSpacing: 'normal',
    textTransform: 'none',
    fontStretch: 'normal',
    lineHeight: '24px',
    paddingTop: '22px',
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
    textDecorationLine: 'underline',
    cursor: 'pointer',
    backgroundColor: '#c3f1cf',
  }
}));

const CheckoutNotification = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper>
        <Typography>CheckoutNotification</Typography>
      </Paper>
    </div >
  );
};

const ElsewhereNotification = () => {
  const classes = useStyles();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(unSetCartMergeNotification());
  };

  return (
    <Paper className={xs ? 'triangleXS' : 'triangle'}>
      <Typography className={xs ? classes.textXS : classes.text}>We've added items <br></br>from your previous <br></br>session to your cart.</Typography >
      <Typography className={xs ? classes.continueXS : classes.continue} onClick={handleClick}>CONTINUE SHOPPING</Typography >
    </Paper>
  );
};

const CartMergeNotification = ({ isCheckoutPage }) => {
  return (
    <>{isCheckoutPage ? <CheckoutNotification /> : <ElsewhereNotification />}</>
  );
};

export default CartMergeNotification;
