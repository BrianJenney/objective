import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import Box from '@material-ui/core/Box';
import { requestPage } from '../../modules/static/actions';
import { buildPage } from '../../utils/sputils';

const StaticPage = ({ match }) => {
  const { slug } = match.params;
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [tracked, setTracked] = useState(false);
  const page = useSelector(state => state.page);

  useEffect(() => {
    if (pageLoaded === false) dispatch(requestPage(slug));
  }, []);

  useEffect(() => {
    // check this when we have real content from content ms
    if (page.hasOwnProperty('template')) {
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

export default withRouter(StaticPage);
