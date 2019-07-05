import React, { Component } from 'react';

import { ProductStore } from '../contexts/ProductContext';

import ProductHeader from './product/ProductHeader';
import VariantSelectionForm from './product/VariantSelectionForm';

class Product extends Component {
  render() {
    return (
      <ProductStore productId={this.props.match.params.id}>
        <ProductHeader />
        <VariantSelectionForm />
      </ProductStore>
    );
  }
}

export default Product;