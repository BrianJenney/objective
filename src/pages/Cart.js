import React from 'react';
import { connect } from 'react-redux';

import { requestFetchCart } from '../modules/cart/actions';

class Cart extends React.Component {
  componentDidMount() {
    this.props.requestFetchCart('5d1be9a5f4db196065c6d297');
  }

  render() {
    if (!this.props.cart) {
      return (<div>No Cart</div>);
    }

    console.log('Got cart:');
    console.log(this.props.cart);
    return (
      <div>Have a cart</div>
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