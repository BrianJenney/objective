import React from 'react';
import TabSection from './product/TabSection';
import Instruction from './product/Instruction';
import { ProductStore } from '../contexts/ProductContext';
import ProductDetail from './product/ProductDetail';

const Product = ({ match }) => {
  const productId = match.params.id;

  return (
    <ProductStore productId={productId}>
      <ProductDetail />
      <TabSection />
      <Instruction />
    </ProductStore>
  );
};

export default Product;
