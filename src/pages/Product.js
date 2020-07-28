import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ProductOutline from './product/ProductOutline';
import ProductLearnMore from './product/ProductLearnMore';
import ProductDetail from './product/ProductDetail';
import ResearchSources from './product/ResearchSources';
import ScrollToTop from '../components/common/ScrollToTop';
import { ProductStore } from '../contexts/ProductContext';
import HeadTags from '../components/common/HeadTags';
import NotFound from './notfound/NotFound';

const Product = ({ match }) => {
  const { product_slug } = match.params;
  const { href: url } = window.location;
  const scrollToTabs = url[url.length - 1] === '#';
  const seoMap = useSelector(state => state.storefront.seoMap);
  const validProduct = seoMap[product_slug];
  let title;
  let description;
  let indexThisPage;
  if (validProduct) {
    ({ title, description, indexThisPage } = validProduct);
  }

  useEffect(() => {
    if (validProduct) {
      window.analytics.page('PDP');
    } else {
      window.analytics.page('404 Error');
    }
  }, []);

  const content = (
    <ProductStore productSlug={product_slug}>
      <ProductDetail />
      <ProductOutline scrollToTabs={scrollToTabs} />
      <ProductLearnMore />
      <ResearchSources />
    </ProductStore>
  );

  if (!validProduct) {
    return <NotFound />;
  }

  if (scrollToTabs) {
    return (
      <>
        <HeadTags title={title} description={description} indexThisPage={indexThisPage} />
        {content}
      </>
    );
  }

  return (
    <>
      <HeadTags title={title} description={description} indexThisPage={indexThisPage} />
      <ScrollToTop>{content}</ScrollToTop>
    </>
  );
};

Product.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(Product);
