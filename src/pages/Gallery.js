import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { GalleryStore } from '../contexts/GalleryContext';
import Products from './gallery/Products';

const Gallery = () => {
  const catalog = useSelector(state => state.catalog);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  useEffect(() => {
    window.analytics.page('Gallery');
  }, []);

  return (
    <Box className="gallery-page">
      <Box className="hero-holder">
        {mobile ? (
          <img
            src="https://images.ctfassets.net/mj9bpefl6wof/4zFLkAsT5lwNyLSyR5MHHV/fe1cfc7935b35e255de925d891b30eef/gallery_hero_v2_mobile.jpg?w=450&fm=jpg&q=50"
            alt=""
            className="gallery-hero"
          />
        ) : (
          <img
            src="https://images.ctfassets.net/mj9bpefl6wof/20K0OKAD5LGKdPw2cWUnHY/81fa18378af259a1582ef9f052ca4767/gallery_hero_v2.png?w=2000&fm=png&q=50"
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

export default Gallery;
