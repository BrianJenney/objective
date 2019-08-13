import React from 'react';

import { ProductStore } from '../contexts/ProductContext';

import ProductDetail from './product/ProductDetail';
import WHHM from './product/WHHM'

const Product = ({ match }) => {
  const productId = match.params.id;

  return (
    <ProductStore productId={productId}>
      <ProductDetail />
      <WHHM />
    </ProductStore>
  );
};

export default Product;
