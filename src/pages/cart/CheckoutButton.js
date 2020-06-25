import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { fonts } from '../../components/Theme/fonts';
import { StyledCheckoutButton } from './StyledComponents';
import { requestFetchCart } from '../../modules/cart/actions';
import PayPalButton from './PayPalButton';

const { $brandSans } = fonts;

class CheckoutButton extends Component {
  render() {
    const { onClick, children, hideLPCoupon } = this.props;

    return (
      <>
        {this.props.cart.items.length !== 0 ? (
          <>
            <Link
              to={{
                pathname: '/checkout',
                state: hideLPCoupon
              }}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontFamily: $brandSans,
                fontWeight: 'bold'
              }}
            >
              <Grid container>
                <Grid item xs={12} style={{ display: 'flex', padding: '10px 16px 20px' }}>
                  <StyledCheckoutButton
                    style={{ margin: '0 auto', height: '55px' }}
                    onClick={onClick}
                    children={children}
                    id="checkout-button"
                    color="primary"
                    variant="contained"
                    disabled={this.props.cart.items.length === 0}
                  >
                    Checkout
                  </StyledCheckoutButton>
                </Grid>
              </Grid>
            </Link>
            <Grid container>
              <Grid item xs={12} style={{ display: 'block', padding: '0px 16px 30px' }}>
                <PayPalButton
                  cart={this.props.cart}
                  buttonSelector="paypal-checkout-button-cart-drawer"
                  buttonWrapperStyle={{ width: '100%', maxWidth: '351px', margin: '0px auto' }}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <Link
            to={{
              pathname: '/checkout',
              state: hideLPCoupon
            }}
            style={{
              color: 'white',
              'text-decoration': 'none',
              'font-family': $brandSans,
              'font-weight': 'bold'
            }}
            onClick={e => e.preventDefault()}
          >
            <Grid container>
              <Grid item xs={12} style={{ display: 'flex', padding: '0 16px 30px' }}>
                <StyledCheckoutButton
                  style={{ margin: '0 auto' }}
                  onClick={onClick}
                  children={children}
                  id="checkout-button"
                  color="primary"
                  variant="contained"
                  disabled={this.props.cart.items.length === 0}
                >
                  Checkout
                </StyledCheckoutButton>
              </Grid>
            </Grid>
          </Link>
        )}
      </>
    );
  }
}

CheckoutButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = {
  requestFetchCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutButton);
