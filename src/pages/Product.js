import React from 'react';
import TabSection from './product/TabSection';
import Instruction from './product/Instruction';
import Step from './product/Step';
import { ProductStore } from '../contexts/ProductContext';
import ProductDetail from './product/ProductDetail';
import ScrollToTop from '../components/common/ScrollToTop';

const Product = ({ match }) => {
  const { product_slug, variant_slug } = match.params;

  return (
    <ScrollToTop>
      <ProductStore productSlug={product_slug}>
        <ProductDetail variantSlug={variant_slug} />
        <TabSection />
        <Instruction />
        <Step />
      </ProductStore>
    </ScrollToTop>
  );
};

export default Product;
