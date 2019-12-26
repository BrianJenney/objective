import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TabSection from './product/TabSection';
import Instruction from './product/Instruction';
import ProductDetail from './product/ProductDetail';
import ResearchSources from './product/ResearchSources';
import ScrollToTop from '../components/common/ScrollToTop';
import { ProductStore } from '../contexts/ProductContext';
import { HeadTags } from '../components/common';

const Product = ({ match }) => {
  const { product_slug } = match.params;
  const { href: url } = window.location;
  const scrollToTabs = url[url.length - 1] === '#';
  const seoMap = useSelector(state => state.storefront.seoMap);
  const pdpMap = seoMap['product_slugs'];
  const { title, description } = pdpMap[product_slug];

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
    return (
      <>
        <HeadTags title={title} description={description} />
        {content}
      </>
    );
  }

  return (
    <>
      <HeadTags title={title} description={description} />
      <ScrollToTop>{content}</ScrollToTop>
    </>
  );
};

Product.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(Product);
