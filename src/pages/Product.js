import React from 'react';
import TabSection from './product/TabSection';
import Instruction from './product/Instruction';
import Step from './product/Step';
import { ProductStore } from '../contexts/ProductContext';
import ProductDetail from './product/ProductDetail';

const Product = ({ match }) => {
  const { id, variant_slug} = match.params;

  return (
    <ProductStore productId={id} >
      <ProductDetail variantSlug={variant_slug} />
      <TabSection />
      <Instruction />
      <Step />
    </ProductStore>
  );
};

export default Product;
