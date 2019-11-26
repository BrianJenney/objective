import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { HeadTags } from '../components/common';
import { GalleryStore } from '../contexts/GalleryContext';
import Products from './gallery/Products';

const Gallery = ({ location }) => {

  const siteMap = useSelector(state => state.storefront.siteMap);
  const catalog = useSelector(state => state.catalog);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  useEffect(()=>{
    window.analytics.page("Gallery");
  },[]);
  const { title, description } = siteMap[location.pathname.substring(1)];

  return (
    <>
      <HeadTags title={title} description={description} />
      <Box className="gallery-page">
        <Box className="hero-holder">
          {mobile ? (
            <img src="https://images.ctfassets.net/mj9bpefl6wof/5icEKy3jqsI29c7MWTSxM7/38c729b024742a29cb9bc8eb477f42a6/gallery_hero_mobile.png?w=450&fm=jpg&q=50" alt="" className="gallery-hero" />
          ) : (
            <img src="https://images.ctfassets.net/mj9bpefl6wof/8skJdD8N01hvEk0w0W1CU/2834f0f495a946099d662b46201648bb/gallery_hero.png?w=2000&q=50&fm=jpg" alt="" className="gallery-hero" />
          )}
        </Box>
        <GalleryStore products={catalog.variants}>
          <Products />
        </GalleryStore>
      </Box>
    </>
  );
};

export default withRouter(Gallery);
