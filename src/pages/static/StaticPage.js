import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoadingSpinner from '../../components/LoadingSpinner';
import { requestPage } from '../../modules/static/actions';
import { buildPage } from '../../utils/sputils';

const StaticPage = ({ match }) => {
  const { slug } = match.params;
  const isBlogPost = match.path.startsWith('/journal');
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [tracked, setTracked] = useState(false);
  const page = useSelector(state => state.page);

  useEffect(() => {
    const { hostname } = window.location;
    const prefix =
      hostname === 'preview.localhost' || hostname.split('-')[0] === 'preview' ? 'preview' : '';
    if (pageLoaded === false) dispatch(requestPage(slug, prefix));
  }, []);

  useEffect(() => {
    // check this when we have real content from content ms
    if (page.template) {
      setPageLoaded(true);
      if (tracked === false && page.name) {
        setTracked(true);
        const analyticsStr = isBlogPost ? 'Journal Post' : `LP: ${page.name}`;
        window.analytics.page(analyticsStr);
      }
    }
  }, [page]);

  let FinalPage = null;

  if (pageLoaded) {
    FinalPage = () => buildPage(page);
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
