import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function withCart(ComposedComponent) {
  const ComponentWithCart = props => <ComposedComponent {...props} />;
  const mapStateToProps = state => ({ cart: state.cart });

  ComponentWithCart.propTypes = {
    cart: PropTypes.object.isRequired
  };

  return connect(
    mapStateToProps,
    null
  )(ComponentWithCart);
}
