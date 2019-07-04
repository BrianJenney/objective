import React from 'react';
import { connect } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { requestFetchCart } from '../modules/cart/actions';

class Cart extends React.Component {
  componentWillMount() {
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