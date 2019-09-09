import React from 'react';
import { Box } from '@material-ui/core';
import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { GalleryStore } from '../contexts/GalleryContext';
import Products from './gallery/Products';

const localStorageClient = require('store');
const productIds = localStorageClient.get('products');
const imageHeroDesktop = require('../../src/assets/images/galleryhero.png');
const imageHeroMobile = require('../../src/assets/images/galleryhero-mobile.png');

const Gallery = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <>
      {mobile ? (
        <img src={imageHeroMobile} className="gallery-hero" />
      ) : (
        <img src={imageHeroDesktop} className="gallery-hero" />
      )}

      <Box py={10}>
        <GalleryStore productIds={productIds}>
          <Products></Products>
        </GalleryStore>
      </Box>
    </>
  );
};

export default Gallery;
