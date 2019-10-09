import React from 'react';
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
  window.analytics.page("Gallery");
  return (
    <Box className="gallery-page">
      <Box className="hero-holder">
        {mobile ? (
          <img src="https://images.ctfassets.net/mj9bpefl6wof/5icEKy3jqsI29c7MWTSxM7/38c729b024742a29cb9bc8eb477f42a6/gallery_hero_mobile.png?w=450&fm=jpg&q=80" alt="" className="gallery-hero" />
        ) : (
          <img src="https://images.ctfassets.net/mj9bpefl6wof/8skJdD8N01hvEk0w0W1CU/2834f0f495a946099d662b46201648bb/gallery_hero.png?w=2000&q=80&fm=jpg" alt="" className="gallery-hero" />
        )}
      </Box>
      <GalleryStore products={catalog.variants}>
        <Products></Products>
      </GalleryStore>
    </Box>
  );
};

export default Gallery;
