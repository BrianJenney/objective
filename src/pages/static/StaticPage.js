import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../components/LoadingSpinner';
import { requestPage } from '../../modules/static/actions';
import { buildPage } from '../../utils/sputils';

const StaticPage = ({ match }) => {
  const { slug } = match.params;
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [tracked, setTracked] = useState(false);
  const page = useSelector(state => state.page);

  useEffect(() => {
    const [prefix] = window.location.hostname.split('-');
    if (pageLoaded === false) dispatch(requestPage(slug, prefix));
  }, []);

  useEffect(() => {
    // check this when we have real content from content ms
    if (page.template) {
      // check for components here.
      setPageLoaded(true);
      if (tracked === false && page.name) {
        setTracked(true);
        window.analytics.page(`LP: ${page.name}`);
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
  match: PropTypes.object.isRequired
};

export default withRouter(StaticPage);
