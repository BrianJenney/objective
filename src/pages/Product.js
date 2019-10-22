import React, { useEffect } from 'react';
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
  const { href: url } = window.location;
  const scrollToTabs = url[url.length - 1] === '#';

  useEffect(() => {
    window.analytics.page('PDP');
  }, []);

  const content = (
    <ProductStore productSlug={product_slug}>
      <ProductDetail />
      <TabSection scrollToTabs={scrollToTabs} />
      <Instruction />
      <ResearchSources />
    </ProductStore>
  );

  if (scrollToTabs) {
    return content;
  }

  return <ScrollToTop>{content}</ScrollToTop>;
};

Product.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(Product);
