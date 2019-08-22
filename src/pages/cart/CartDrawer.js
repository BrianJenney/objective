import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { AlertPanel } from '../../components/common';
import { Link } from 'react-router-dom';
import { calculateCartTotal } from './CartFunctions';

import { requestFetchCart, requestPatchCart } from '../../modules/cart/actions';

import store from '../../store';

class Cart extends React.Component {
  applyCoupon(e) {
    console.log('Logic to apply coupon goes here');
  }

  removeFromCart(e) {

    const newItems = [...this.props.cart.items];
    newItems.splice(e.currentTarget.value, 1);

    const patches = {
      items: newItems,
      subtotal: calculateCartTotal(newItems),
      total: calculateCartTotal(newItems)
    };

    store.dispatch(requestPatchCart(this.props.cart._id, patches));
  }

  adjustQty(e, amt) {
    const newItems = [...this.props.cart.items];
    newItems[e.currentTarget.value].quantity += amt;

    const patches = {
      items: newItems,
      subtotal: calculateCartTotal(newItems),
      total: calculateCartTotal(newItems)
    };

    store.dispatch(requestPatchCart(this.props.cart._id, patches));
  }

  render() {
    if (!this.props.cart) {
      return <AlertPanel type="info" text="No Cart" />;
    }

    if (!this.props.cart.items) {
      return null;
    }

    return (
      <Container>
        <Typography component="h1" variant="h5" align="center">
          Your Cart{' '}
          <span style={{ 'font-size': '10pt' }}>
            {' '}
            ({this.props.cart.items.length} Items)
          </span>
        </Typography>
        <Grid container>
          {this.props.cart.items.length === 0 ? (
            <div>Your cart is empty</div>
          ) : (
              Object.values(this.props.cart.items).map((item, index) => (
                <>
                  <Card>
                    <CardMedia
                      style={{ height: 100, width: 100 }}
                      image={item.product_img}
                      title={item.product_name}
                    />
                    <Link to={`product/${item.product_id}`}>
                      <Typography
                        variant="caption"
                        align="right"
                        display="inline"
                      >
                        {item.variant_value} {item.variant_name}
                      </Typography>
                    </Link>
                    <CardActions>
                      <Button
                        color="primary"
                        onClick={e => this.adjustQty(e, -1)}
                        style={{ 'font-size': '21pt' }}
                        value={index}
                      >
                        -
                      </Button>
                      {item.quantity}
                      <Button
                        color="primary"
                        onClick={e => this.adjustQty(e, 1)}
                        style={{ 'font-size': '20pt' }}
                        value={index}
                      >
                        +
                      </Button>
                    </CardActions>
                    <CardContent>
                      <Typography
                        color="primary"
                        onClick={e => this.removeFromCart(e)}
                        value={index}
                        variant="contained"
                      >
                        <Link>Remove</Link>
                      </Typography><br />
                      Item Price: {item.unit_price.toFixed(2)}
                      <br />
                      Item Subtotal {(item.quantity * item.unit_price).toFixed(2)}
                    </CardContent>
                  </Card>
                </>
              ))
            )
          }
          <Grid item xs={12}>
            TOTAL: {`$${this.props.cart.total.toFixed(2)}`}
            <Button color="primary" variant="contained">
              <Link to="/checkout">Checkout</Link>
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = {
  requestFetchCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
