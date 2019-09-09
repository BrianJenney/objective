import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { fonts } from '../../components/Theme/fonts';
import { StyledCheckoutButton } from './StyledComponents';
import { requestFetchCart } from '../../modules/cart/actions';

const { $brandSans } = fonts;

class CheckoutButton extends Component {
  render() {
    const { onClick, children } = this.props;
    console.log('from CheckoutButton ====>', this.props, '<====');
    return (
      <Grid container xs={12}>
        <Grid item xs={12} style={{ display: 'flex', paddingBottom: '30px' }}>
          <StyledCheckoutButton
            style={{ margin: '0 auto' }}
            onClick={onClick}
            children={children}
            id="checkout-button"
            color="primary"
            variant="contained"
            disabled={this.props.cart.items.length === 0}
          >
            <Link
              to="/checkout"
              style={{
                color: 'white',
                'text-decoration': 'none',
                'font-family': $brandSans,
                'font-weight': 'bold'
              }}
            >
              Checkout
            </Link>
          </StyledCheckoutButton>
        </Grid>
      </Grid>
    );
  }
}

CheckoutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired
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
