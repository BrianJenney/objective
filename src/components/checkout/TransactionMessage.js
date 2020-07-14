import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import '../../pages/checkout/checkout-styles.scss';

const TransactionMessage = ({ orderError, errorMessage }) => (
  <>
    {orderError ? (
      <Box className="transaction-message-container">
        <Typography className="title">Oops! Something went wrong.</Typography>
        <Typography className="error-subheader">
          Your credit card failed when we tried to process your payment.
          {typeof errorMessage === 'string'
            ? ` ${errorMessage}`
            : 'Please review your information and submit again.'}
        </Typography>
      </Box>
    ) : (
      <Box className="transaction-message-container" style={{ '.MuiIconButton-root': 'none' }}>
        <Typography className="title">Your order is processing...</Typography>
        <Typography className="processing-subheader">
          Please do not hit the back button while your order processes.
        </Typography>
      </Box>
    )}
  </>
);

export default TransactionMessage;
