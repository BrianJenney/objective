import React from 'react';

import TabSection from './product/TabSection';
import Instruction from './product/Instruction';
import ProductDetail from './product/ProductDetail';
import ResearchSources from './product/ResearchSources';

import ScrollToTop from '../components/common/ScrollToTop';

import { ProductStore } from '../contexts/ProductContext';

const Product = ({ match }) => {
  const { product_slug, variant_slug } = match.params;

  return (
    <ScrollToTop>
      <ProductStore productSlug={product_slug}>
        <ProductDetail variantSlug={variant_slug} />
        <TabSection />
        <Instruction />
        <ResearchSources />
      </ProductStore>
    </ScrollToTop>
  );
};

export default Product;
