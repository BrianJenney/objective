import React from 'react';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { GalleryStore } from '../contexts/GalleryContext';
import Products from './gallery/Products';
import ScrollToTop from '../components/common/ScrollToTop';

const imageHeroDesktop = require('../../src/assets/images/galleryhero.png');
const imageHeroMobile = require('../../src/assets/images/galleryhero-mobile.png');

const Gallery = () => {
  const productIds = Object.values(useSelector(state => state.products));
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    
      <Box pb={10}>
        <Box mb={10} className="hero-holder">
          {mobile ? (
            <img src={imageHeroMobile} alt="" className="gallery-hero" />
          ) : (
              <img src={imageHeroDesktop} alt="" className="gallery-hero" />
            )}
        </Box>
        <GalleryStore productIds={productIds}>
          <Products></Products>
        </GalleryStore>
      </Box>
    
  );
};

export default Gallery;
