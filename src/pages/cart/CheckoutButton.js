import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import { fonts } from '../../components/Theme/fonts';
import { StyledCheckoutButton } from './StyledComponents';
import { requestFetchCart } from '../../modules/cart/actions';

const { $brandSans } = fonts;

class CheckoutButton extends Component {
  render() {
    const { onClick, children } = this.props;

    return (
      <>
        {
          this.props.cart.items.length !== 0 ?
            <Link
              to="/checkout"
              style={{
                color: 'white',
                'textDecoration': 'none',
                'fontFamily': $brandSans,
                'fontWeight': 'bold'
              }}
            >
              <Grid container>
                <Grid item xs={12} style={{ display: 'flex', padding: '10px 16px 30px' }}>
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
            :
            <Link
              to="/checkout"
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
        }
      </>
    )
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutButton);
