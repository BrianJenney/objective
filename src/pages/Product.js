import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TabSection from './product/TabSection';
import Instruction from './product/Instruction';
import ProductDetail from './product/ProductDetail';
import ResearchSources from './product/ResearchSources';

import ScrollToTop from '../components/common/ScrollToTop';

import { ProductStore } from '../contexts/ProductContext';

const Product = ({ match }) => {
  const { product_slug } = match.params;

  return (
    <ScrollToTop>
      <ProductStore productSlug={product_slug}>
        <ProductDetail />
        <TabSection />
        <Instruction />
        <ResearchSources />
      </ProductStore>
    </ScrollToTop>
  );
};

Product.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(Product);
