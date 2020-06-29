import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LoadingSpinner from '../../components/LoadingSpinner';
import { requestPage } from '../../modules/static/actions';
import { buildPage } from '../../utils/sputils';
import NotFound from '../notfound/NotFound';

const StaticPage = ({ match }) => {
  const { slug } = match.params;
  const isLandingPage = match.path.startsWith('/landing');
  const isBlogPost = match.path.startsWith('/journal');
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [tracked, setTracked] = useState(false);
  const [pageError, setPageError] = useState(false);
  const page = useSelector(state => state.page);

  useEffect(() => {
    if (pageLoaded === false) dispatch(requestPage(slug));
  }, []);

  useEffect(() => {
    // check this when we have real content from content ms
    let analyticsStr;
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
    } else if (page.error) {
      analyticsStr = '404 Error';
      setPageError(true);
    }
    window.analytics.page(analyticsStr);
  }, [page]);

  let FinalPage;

  if (pageLoaded) {
    FinalPage = () => buildPage(page);
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
