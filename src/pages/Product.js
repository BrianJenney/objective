import React from 'react';

import { ProductStore } from '../contexts/ProductContext';

import ProductDetail from './product/ProductDetail';

const Product = ({ match }) => {
  const productId = match.params.id;

  return (
    <ProductStore productId={productId}>
      <ProductDetail />
    </ProductStore>
  );
};

export default Product;
