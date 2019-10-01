import React from 'react';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { GalleryStore } from '../contexts/GalleryContext';
import Products from './gallery/Products';
import ScrollToTop from '../components/common/ScrollToTop';

const imageHeroMobile = require('../../src/assets/images/galleryhero-mobile.png');

const Gallery = () => {
  const productIds = Object.values(useSelector(state => state.products));
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Box className="gallery-page">
      <Box className="hero-holder">
        {mobile ? (
          <img src={imageHeroMobile} alt="" className="gallery-hero" />
        ) : (
          <img src="https://images.ctfassets.net/mj9bpefl6wof/8skJdD8N01hvEk0w0W1CU/2834f0f495a946099d662b46201648bb/gallery_hero.png?w=2000&q=80&fm=jpg" alt="" className="gallery-hero" />
        )}
      </Box>
      <GalleryStore productIds={productIds}>
        <Products></Products>
      </GalleryStore>
    </Box>
  );
};

export default Gallery;
