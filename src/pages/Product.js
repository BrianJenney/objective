import React, { Component } from 'react';

import { ProductStore } from '../contexts/ProductContext';

import ProductHeader from './product/ProductHeader';
import VariantSelectionForm from './product/VariantSelectionForm';
import TabSection from './product/TabSection';

class Product extends Component {
  render() {
    return (
      <ProductStore productId={this.props.match.params.id}>
        <ProductHeader />
        <VariantSelectionForm />
        <TabSection />
      </ProductStore>
    );
  }
}

export default Product;