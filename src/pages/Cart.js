import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import { requestFetchCart, requestPatchCart } from '../modules/cart/actions';

import store from '../store';

class Cart extends React.Component {

  applyCoupon(e) {
    console.log('Logic to apply coupon goes here');
  }

  calculateCartTotal(c) {
    let total = 0;
    for(var i = 0; i < c.length; i++) {
      total += (c[i].unit_price * c[i].quantity); 
    }
    return total;
  }

  removeFromCart(e) {
    let newitems = this.props.cart.items;
    newitems.splice(e.currentTarget.value, 1);

    let patches = {
      items: newitems,
      subtotal: this.calculateCartTotal(newitems),
      total: this.calculateCartTotal(newitems)
    };

    store.dispatch(requestPatchCart(this.props.cart._id, patches));
  }
  
  adjustQty(e, amt) {
    let newitems =  this.props.cart.items;
    newitems[e.currentTarget.value].quantity += amt;

    let patches = {
      items: newitems,
      subtotal: this.calculateCartTotal(newitems),
      total: this.calculateCartTotal(newitems)
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
        <Typography component="h1" variant="h5" align="center">Your Cart</Typography>
        <Grid container spacing={3}>
          {this.props.cart.items.length == 0 ? (
            <div>Your cart is empty</div>
          ) : (
            Object.values(this.props.cart.items).map((item, index) => (
              <>
                <Grid item xs={4}>
                  <a href={"product/" + item.product_id} style={{color:'#3f51b5'}}>
                    {item.variant_name}
                  </a>
                </Grid>
                <Grid item xs={2}>
                  <Button color="primary" onClick={(e) => this.adjustQty(e, -1)} style={{'font-size':'21pt'}} value={index}>
                    -
                  </Button>
                  {item.quantity}
                  <Button color="primary" onClick={(e) => this.adjustQty(e, 1)} style={{'font-size':'20pt'}} value={index}>
                    +
                  </Button>
                </Grid>
                <Grid item xs={2}>{item.unit_price}</Grid>
                <Grid item xs={2}>{item.quantity * item.unit_price}</Grid>
                <Grid item xs={2}>
                  <Button color="primary" onClick={(e) => this.removeFromCart(e)} value={index} variant="contained">Remove Item</Button>
                </Grid>
              </>
            ))
          )
          }
          <Grid item xs={12}>TOTAL:  {'$' + this.props.cart.total}</Grid>
          <Grid item xs={2}>
            <Button color="primary" href='checkout' variant="contained">Checkout</Button>
          </Grid>
          <Grid item xs={3}>
            <Button color="primary" href='gallery' variant="contained">Continue Shopping</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);