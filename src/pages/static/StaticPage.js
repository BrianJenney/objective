import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../components/LoadingSpinner';
import NotFound from '../notfound/NotFound';
import { requestPage } from '../../modules/static/actions';
import { buildPage } from '../../utils/sputils';

const StaticPage = ({ match }) => {
  const { slug } = match.params;
  const isLandingPage = match.path.startsWith('/landing');
  const isBlogPost = match.path.startsWith('/journal');
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [tracked, setTracked] = useState(false);
  const page = useSelector(state => state.page);

  useEffect(() => {
    const { hostname } = window.location;
    const prefix =
      hostname === 'preview.localhost' || hostname.split('-')[0] === 'preview' ? 'preview' : '';
    if (pageLoaded === false) dispatch(requestPage(slug, prefix));
  }, []);

  let analyticsStr;
  useEffect(() => {
    // check this when we have real content from content ms
    if (page.template && !tracked) {
      // Check templates against routes:
      if (isLandingPage && page.template === 'LP-Template-1') {
        analyticsStr = `LP: ${page.name}`;
        setPageLoaded(true);
      } else if (isBlogPost && page.template === 'Blog-Post') {
        analyticsStr = 'Journal Post';
        setPageLoaded(true);
      } else {
        analyticsStr = '404 Error';
        setPageError(true);
      }
      setTracked(true);
      window.analytics.page(analyticsStr);
    } else if (page.error) {
      analyticsStr = '404 Error';
      setPageError(true);
    }
  }, [page]);

  let FinalPage;

  if (pageLoaded) {
    FinalPage = () => buildPage(page, slug);
  }

  if (pageError) {
    FinalPage = () => NotFound();
  }

  if (FinalPage) {
    return <FinalPage />;
  }

  return <LoadingSpinner loadingMessage="...loading" page="lp" />;
};

StaticPage.propTypes = {
  match: {
    path: PropTypes.string,
    params: {
      slug: PropTypes.string
    }
  }
};

export default withRouter(StaticPage);
