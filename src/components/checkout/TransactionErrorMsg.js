import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';

const TransactionErrorMsg = () => (
  <Box>
    <div>Oops! Something went wrong.</div>
    <div>
      Your credit card failed when we tried to process your payment.
      <br />
      Please review your information and submit again.
    </div>
  </Box>
);

export default TransactionErrorMsg;
