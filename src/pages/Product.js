import React from 'react';
import TabSection from './product/TabSection';
import { ProductStore } from '../contexts/ProductContext';

import ProductDetail from './product/ProductDetail';

const Product = ({ match }) => {
  const productId = match.params.id;

  return (
    <ProductStore productId={productId}>
      <ProductDetail />
      <TabSection />
    </ProductStore>
  );
};

export default Product;
