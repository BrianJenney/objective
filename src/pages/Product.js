import React, { Component } from 'react';

import { ProductStore } from '../contexts/ProductContext';

import ProductHeader from './product/ProductHeader';
import VariantSelectionForm from './product/VariantSelectionForm';
import PDPCard from './product/PDPCard';

class Product extends Component {
  render() {
    return (
      <ProductStore productId={this.props.match.params.id}>
        <ProductHeader />
        <VariantSelectionForm />
        <PDPCard title='My title is awesome' cardType='imgcard1' body='this is body' />
        <PDPCard title='imgcard 2 title' cardType='imgcard2' body='img card 2 body' />
      </ProductStore>
    );
  }
}

export default Product;