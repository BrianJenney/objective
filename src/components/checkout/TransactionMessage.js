import React from 'react';
import Box from '@material-ui/core/Box';

const TransactionMessage = ({ orderError }) => (
  <Box>
    {orderError ? (
      <Box>
        <div>Oops! Something went wrong.</div>
        <div>
          Your credit card failed when we tried to process your payment.
          <br />
          Please review your information and submit again.
        </div>
      </Box>
    ) : (
        <>
          <div>Your order is processing...</div>
          <div>Please do not hit the back button while your order processes.</div>
        </>
      )}
  </Box>
);

export default TransactionMessage;
