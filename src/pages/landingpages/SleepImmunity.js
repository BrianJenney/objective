import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { GalleryStore } from '../../contexts/GalleryContext';
import Products from '../gallery/Products';

const SleepImmunity = ({ location }) => {
  const catalog = useSelector(state => state.catalog);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  useEffect(() => {
    window.analytics.page('SleepImmunity');
  }, []);

  return (
    <Box className="gallery-page">
      <Box className="hero-holder">
        {mobile ? (
          <img
            src="https://images.ctfassets.net/mj9bpefl6wof/aNIREwk0W5vgpnlOiMOuj/72ac1cf06280fadf0f984b68bbf7342c/Sleep_and_Immune_Bundle_Gallery_Hero_mobile.jpeg?w=450"
            alt=""
            className="gallery-hero"
          />
        ) : (
            <img
              src="https://images.ctfassets.net/mj9bpefl6wof/26iguhDwNRUqALzOH49inO/fdd98e688e149d99f450bb31ff94a69f/Sleep_and_Immune_Bundle_Gallery_Hero_desktop.jpeg?h=630"
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

export default SleepImmunity;
