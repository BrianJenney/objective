import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { NavLink, Button } from '../components/common';

import { removeFromCart, adjustQty } from '../modules/cart/functions';
import { requestFetchCart } from '../modules/cart/actions';

class Cart extends Component {
  render() {
    if (!this.props.cart) {
      return <div>No Cart</div>;
    }

    if (!this.props.cart.items) {
      return <div></div>;
    }

    window.analytics.page("Cart");

    return (
      <Container>
        <Typography component="h1" variant="h5" align="center">
          Your Cart
        </Typography>
        <Grid container spacing={3}>
          {this.props.cart.items.length === 0 ? (
            <div>Your cart is empty</div>
          ) : (
              Object.values(this.props.cart.items).map((item, index) => (
                <>
                  <Grid item xs={4}>
                    <a
                      href={'product/' + item.product_id}
                      style={{ color: 'red' }}
                    >
                      {item.variant_value} {item.variant_name}
                    </a>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      color="primary"
                      onClick={e => adjustQty(this.props.cart, e.currentTarget.value, -1)}
                      style={{ 'font-size': '21pt' }}
                      value={index}
                    >
                      -
                  </Button>
                    {item.quantity}
                    <Button
                      color="primary"
                      onClick={e => adjustQty(this.props.cart, e.currentTarget.value, 1)}
                      style={{ 'font-size': '20pt' }}
                      value={index}
                    >
                      +
                  </Button>
                  </Grid>
                  <Grid item xs={2}>
                    {item.unit_price.toFixed(2)}
                  </Grid>
                  <Grid item xs={2}>
                    {(item.quantity * item.unit_price).toFixed(2)}
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      color="primary"
                      onClick={e => removeFromCart(this.props.cart, index)}
                      value={index}
                      variant="contained"
                    >
                      Remove Item
                  </Button>
                  </Grid>
                </>
              ))
            )}
          <Grid item xs={12}>
            TOTAL: {'$' + this.props.cart.total.toFixed(2)}
          </Grid>
          <Grid item xs={2}>
            <Button>
              <NavLink color="background" underline="none" to="/checkout">
                Checkout
              </NavLink>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button>
              <NavLink color="background" underline="none" to="/gallery">
                Continue shopping
              </NavLink>
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

const mapDispatchToProps = {
  requestFetchCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
