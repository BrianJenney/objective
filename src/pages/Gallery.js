import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import HeadTags from '../components/common/HeadTags';
import { GalleryStore } from '../contexts/GalleryContext';
import Products from './gallery/Products';
import { ScrollToTop } from '../components/common';

const Gallery = ({ location }) => {
  const catalog = useSelector(state => state.catalog);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const seoMap = useSelector(state => state.storefront.seoMap);
  const { title, description, indexThisPage } = seoMap[location.pathname.substring(1)];

  useEffect(() => {
    window.analytics.page('Gallery');
  }, []);

  return (
    <>
      <HeadTags title={title} description={description} indexThisPage={indexThisPage} />
      <ScrollToTop>
        <Box className="gallery-page">
          <Box className="hero-holder">
            {mobile ? (
              <img
                src="https://images.ctfassets.net/mj9bpefl6wof/29ipFkUCQVaYvyIRwxoxk2/80ea601e030147f31e2963847b86a184/gallery_hero_mobile_v2.png?w=450&fm=jpg&q=85"
                alt=""
                className="gallery-hero"
              />
            ) : (
              <img
                src="https://images.ctfassets.net/mj9bpefl6wof/1x79YGcZCxW8ZOrs6oxUUh/7562a456af91c3d25eb57c7e7f4d4916/gallery_hero_v2.png?w=2000&q=85&fm=jpg"
                alt=""
                className="gallery-hero"
              />
            )}
          </Box>
          <GalleryStore products={catalog.variants}>
            <Products></Products>
          </GalleryStore>
        </Box>
      </ScrollToTop>
    </>
  );
};

export default Gallery;
