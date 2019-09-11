import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid
} from '@material-ui/core';
import {
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS_MAP
} from '../../constants/payment';

const CheckoutReviewSummary = ({ summary }) => {
  const {
    items,
    shippingMethod,
    shippingAddress,
    billingAddress,
    paymentDetails,
    total
  } = summary;

  if (
    !items ||
    !shippingMethod ||
    !shippingAddress ||
    !billingAddress ||
    !paymentDetails ||
    !total
  ) {
    return null;
  }

  const shippingMethodLabel = `${shippingMethod.displayName} - ${shippingMethod.price} (Estimated Delivery: ${shippingMethod.deliveryEstimate})`; // eslint-disable-line

  /* eslint-disable */
  return (
    <Box>
      <Box
        component={Typography}
        variant="h5"
        children="Order Summary"
        gutterBottom
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <List>
            {items.map(({ product_id, product_name, desc, unit_price }) => (
              <ListItem key={product_id}>
                <ListItemText primary={product_name} secondary={desc} />
                <Typography variant="body2" children={unit_price} />
              </ListItem>
            ))}
            <ListItem>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" children={total} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Shipping Method
          </Typography>
          <Typography variant="body2" gutterBottom>
            {shippingMethodLabel}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`${shippingAddress.firstName} ${shippingAddress.lastName}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`${shippingAddress.line1} ${
              shippingAddress.line2 ? shippingAddress.line2 : ''
            }`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}, ${shippingAddress.countryCode}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Billing Address
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`${billingAddress.firstName} ${billingAddress.lastName}`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`${billingAddress.line1} ${
              billingAddress.line2 ? billingAddress.line2 : ''
            }`}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {`${billingAddress.city}, ${billingAddress.state} ${billingAddress.postalCode}, ${billingAddress.countryCode}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Payment details
          </Typography>
          <Typography variant="body2" gutterBottom>
            {PAYMENT_METHOD_LABELS_MAP[PAYMENT_METHODS.CREDIT_CARD]}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {paymentDetails.name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            *****{paymentDetails.last4}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Exp. {paymentDetails.expirationDate}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
  /* eslint-enable */
};

CheckoutReviewSummary.propTypes = {
  summary: PropTypes.object.isRequired
};

export default CheckoutReviewSummary;
