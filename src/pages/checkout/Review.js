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

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {Object.values(items).map(product => (
          <ListItem className={classes.listItem} key={product.product_id}>
            <ListItemText
              primary={product.product_name}
              secondary={product.desc}
            />
            <Typography variant="body2">{product.unit_price}</Typography>
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
          <Typography gutterBottom>{shipping}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping Address
          </Typography>
          <Typography gutterBottom>
            {`${shippingAddress.firstName} ${shippingAddress.lastName}`}
          </Typography>
          <Typography gutterBottom>
            {`${shippingAddress.address1} ${
              shippingAddress.address2 ? shippingAddress.address2 : ''
            }`}
          </Typography>
          <Typography gutterBottom>
            {`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}`}
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
            {`${billingAddress.address1} ${
              billingAddress.address2 ? billingAddress.address2 : ''
            }`}
          </Typography>
          <Typography gutterBottom>
            {`${billingAddress.city}, ${billingAddress.state} ${billingAddress.zip}`}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentDetails.cardName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentDetails.cardNumber}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentDetails.expDate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{paymentDetails.cvv}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box display="flex" alignItems="center">
        <Button type="button" onClick={onBack} children="Back" mr={2} />
        <Button type="button" onClick={onSubmit} children="Place order" />
      </Box>
    </Box>
  );
};

Review.propTypes = {
  cart: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Review;
