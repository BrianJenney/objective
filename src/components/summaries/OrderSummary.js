import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const OrderSummary = ({ cart }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h5" align="center">
          Order Summary ({cart.items.length} items)
        </Typography>
      </Grid>
      {Object.values(cart.items).map((item, index) => (
        <Grid item xs={12} className="ListBox">
          <Grid item xs={4}>
            <img src="item.variant_img" />
          </Grid>
          <Grid item xs={4}>
            <a href={'product/' + item.product_id}>{item.variant_name}</a>
            <div>qty: {item.quantity}</div>
          </Grid>
          <Grid item xs={4}>
            <div>{item.unit_price * item.quantity}</div>
          </Grid>
        </Grid>
      ))}
      ;
    </Grid>
  );
};

OrderSummary.propTypes = {
  cart: PropTypes.object
};

export default OrderSummary;
