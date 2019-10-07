import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { useTheme, withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  box: {
    border: 'red solid 2px'
  },
});

const TransactionErrorMsg = () => {
  const classes = styles();
  const theme = useTheme();
  return (
    <Box className={classes.box}>
      <div>Oops! Something went wrong.</div>
      <div>
        Your credit card failed when we tried to process your payment.
      <br />
        Please review your information and submit again.
    </div>
    </Box>
  )
};

export default TransactionErrorMsg;
