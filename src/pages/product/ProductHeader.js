import React, { Component } from 'react';

import { Header, Segment } from 'semantic-ui-react';

import ProductContext from '../../contexts/ProductContext';

class ProductHeader extends Component {
  static contextType = ProductContext;

  render() {
    if (!this.context.product) {
      return (<div></div>);
    }

    return (
      <Segment>
        <Header as='h3'>{this.context.product.name}</Header>
        <div>{this.context.product.description}</div>
      </Segment>
    );
  }
}

export default ProductHeader;