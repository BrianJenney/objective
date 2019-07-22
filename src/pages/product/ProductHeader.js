import React, { Component } from 'react';

import ProductContext from '../../contexts/ProductContext';

class ProductHeader extends Component {
  static contextType = ProductContext;

  render() {
    if (!this.context.product) {
      return (<div></div>);
    }

    return (
      <div>
        <h3>{this.context.product.name}</h3>
        <div>{this.context.product.description}</div>
      </div>
    );
  }
}

export default ProductHeader;