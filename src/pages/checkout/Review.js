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
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '../../components/common';
import {
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS_MAP
} from '../../constants/payment';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing(2)
  }
}));

const Review = ({ cart, onBack, onSubmit }) => {
  const classes = useStyles();
  const {
    items,
    shipping,
    shippingAddress,
    billingAddress,
    paymentDetails,
    total
  } = cart;

  if (
    !items ||
    !shipping ||
    !shippingAddress ||
    !billingAddress ||
    !paymentDetails
  ) {
    return null;
  }

  const shippingMethodLabel = `${shipping.displayName} - ${shipping.price} (Estimated Delivery: ${shipping.deliveryEstimate})`; // eslint-disable-line

  /* eslint-disable */
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {items.map(({ product_id, product_name, desc, unit_price }) => (
          <ListItem className={classes.listItem} key={product_id}>
            <ListItemText primary={product_name} secondary={desc} />
            <Typography variant="body2">{unit_price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping Method
          </Typography>
          <Typography gutterBottom>{shippingMethodLabel}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping Address
          </Typography>
          <Typography gutterBottom>
            {`${shippingAddress.firstName} ${shippingAddress.lastName}`}
          </Typography>
          <Typography gutterBottom>
            {`${shippingAddress.line1} ${
              shippingAddress.line2 ? shippingAddress.line2 : ''
            }`}
          </Typography>
          <Typography gutterBottom>
            {`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}, ${shippingAddress.countryCode}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Billing Address
          </Typography>
          <Typography gutterBottom>
            {`${billingAddress.firstName} ${billingAddress.lastName}`}
          </Typography>
          <Typography gutterBottom>
            {`${billingAddress.line1} ${
              billingAddress.line2 ? billingAddress.line2 : ''
            }`}
          </Typography>
          <Typography gutterBottom>
            {`${billingAddress.city}, ${billingAddress.state} ${billingAddress.postalCode}, ${billingAddress.countryCode}`}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {PAYMENT_METHOD_LABELS_MAP[paymentDetails.paymentMethod]}
              </Typography>
            </Grid>
            {paymentDetails.paymentMethod === PAYMENT_METHODS.CREDIT_CARD && (
              <>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    {paymentDetails.cardholderName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{paymentDetails.number}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    {paymentDetails.expirationDate}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{paymentDetails.cvv}</Typography>
                </Grid>
              </>
            )}
            {paymentDetails.paymentMethod === PAYMENT_METHODS.PAYPAL && (
              <div id="paypal-checkout-button" />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Box display="flex" alignItems="center">
        <Button type="button" onClick={onBack} children="Back" mr={2} />
        <Button type="button" onClick={onSubmit} children="Place order" />
      </Box>
    </Box>
  );
  /* eslint-enable */
};

Review.propTypes = {
  cart: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Review;
