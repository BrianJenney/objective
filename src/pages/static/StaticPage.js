import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestPage } from '../../modules/static/actions';

import Box from '@material-ui/core/Box';

const StaticPage = ({ location }) => {
  //const [featuredMain, setFeaturedMain] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestPage('test-static'));
    console.log('this results');
  }, []);

  return (
    <>
      <Box py={8}>
        <h1>Contentful</h1>
      </Box>
    </>
  );
};

export default StaticPage;
