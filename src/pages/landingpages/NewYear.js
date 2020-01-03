import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { GalleryStore } from '../../contexts/GalleryContext';
import Products from '../gallery/Products';

const NewYear = ({ location }) => {
  const catalog = useSelector(state => state.catalog);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  useEffect(() => {
    window.analytics.page('NewYear');
  }, []);

  return (
    <Box className="gallery-page">
      <Box className="hero-holder">
        {mobile ? (
          <img
            src="https://cdn1.stopagingnow.com/objective/Gallery-Header-Mobile-450x566px.gif"
            alt=""
            className="gallery-hero"
          />
        ) : (
          <img
            src="https://cdn1.stopagingnow.com/objective/Gallery-Header-2000x636px.gif"
            alt=""
            className="gallery-hero"
          />
        )}
      </Box>
      <GalleryStore products={catalog.variants}>
        <Products></Products>
      </GalleryStore>
    </Box>
  );
};

export default NewYear;
