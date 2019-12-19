import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Typography, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { unSetCartMergeNotification } from '../../modules/cart/actions';

const useStyles = makeStyles(theme => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(2),
    width: '242px',
    height: '186px',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.5)',
    opacity: 1,
    transform: 'none',
    transition: 'opacity 251ms cubic- bezier(0.4, 0, 0.2, 1) 0ms, transform 167ms cubic- bezier(0.4, 0, 0.2, 1) 0ms',
    top: '123px',
    left: '77%',
    transformOrigin: '143px 0px',
    outline: '0',
    position: 'absolute',
    minHeight: '16px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    backgroundColor: '#c3f1cf',
  },

  text: {
    fontSize: 18,
    fontFamily: "p22-underground",
    textAlign: 'center',
    letterSpacing: 'normal',
    textTransform: 'none',
    fontStretch: 'normal',
    lineHeight: '1.5',
    paddingTop: '15px'
  },

  continue: {
    fontSize: 14,
    fontFamily: 'p22-underground',
    fontWeight: 600,
    textAlign: 'center',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    paddingTop: '5px',
    textDecorationLine: 'underline',
  }
}));

const CheckoutNotification = () => {
  const theme = useTheme();
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
  const classes = useStyles()
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(unSetCartMergeNotification());
  };

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.text}>We've added items <br></br>from your previous <br></br>session to your cart.</Typography >
      <Typography className={classes.continue} onClick={handleClick}> CONTINUE SHOPPING </Typography >
    </Paper>
  );
}

const CartMergeNotification = ({ isCheckoutPage }) => {
  return (
    <>{isCheckoutPage ? <CheckoutNotification /> : <ElsewhereNotification />}</>
  );
};

export default CartMergeNotification;
