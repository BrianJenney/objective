import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { requestFetchCart, requestPatchCart } from '../modules/cart/actions';

import store from '../store';

class Cart extends React.Component {

  removeFromCart(e) {
    let item = this.props.cart.items[e.currentTarget.value];
    let newitems = this.props.cart.items;
    newitems.splice(e.currentTarget.value, 1);

    let patches = {
      items: newitems,
      subtotal: this.props.cart.subtotal - (item.unit_price * item.quantity),
      total: this.props.cart.total - (item.unit_price * item.quantity)
    };

    store.dispatch(requestPatchCart(this.props.cart._id, patches));
  }

  render() {
    if (!this.props.cart) {
      return (<div>No Cart</div>);
    }

    console.log('Got cart:');
    console.log(this.props.cart);

    if (!this.props.cart.items) {
      return (<div></div>);
    }

    return (
      <Container>
        <Typography component="h1" variant="h4" align="center">Your Cart</Typography>
        <Grid container spacing={3}>
          {this.props.cart.items.length == 0 ? (
            <div>Your cart is empty</div>
          ) : (
            Object.values(this.props.cart.items).map((item, index) => (
              <>
                <Grid item xs={3}>{item.variant_name}</Grid>
                <Grid item xs={3}>{item.quantity}</Grid>
                <Grid item xs={3}>{item.unit_price}</Grid>
                <Grid item xs={3}>
                  <Button color="primary" onClick={(e) => this.removeFromCart(e)} value={index} variant="contained">Remove Item</Button>
                </Grid>
              </>
            ))
          )
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);