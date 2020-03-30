import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestPage } from '../../modules/static/actions';
import { buildPage } from '../../utils/sputils';

import Box from '@material-ui/core/Box';

const StaticPage = ({ match }) => {
  const { slug } = match.params;
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [tracked, setTracked] = useState(false);
  const page = useSelector(state => state.page);

  console.log('this page ', page);
  useEffect(() => {
    dispatch(requestPage(slug));
  }, []);

  useEffect(() => {
    // check this when we have real content from content ms
    if (page.hasOwnProperty('template')) {
      // check for components here.
      setPageLoaded(true);
      if (tracked === false) {
        setTracked(true);
        window.analytics.page(`LP: ${page.name}`);
      }
    }
  }, [page]);

  // if (pageLoaded) {
  //   buildPage(page);
  // } else {
  //   return null;
  // }
  let FinalPage = null;
  if (pageLoaded) {
    FinalPage = () => {
      return buildPage(page);
    };
  }

  if (FinalPage) {
    return <FinalPage />;
  } else {
    return null;
  }
};

export default withRouter(StaticPage);
