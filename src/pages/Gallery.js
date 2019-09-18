import React from 'react';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GalleryStore } from '../contexts/GalleryContext';
import Products from './gallery/Products';

const localStorageClient = require('store');
const productIds = localStorageClient.get('products');
const imageHeroDesktop = require('../../src/assets/images/galleryhero.png');
const imageHeroMobile = require('../../src/assets/images/galleryhero-mobile.png');
console.log("productIds",productIds)
const Gallery = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Box py={12} className="white-bg">
      <Box mb={12}>
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
