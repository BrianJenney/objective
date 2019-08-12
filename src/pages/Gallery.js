import React from 'react';

import { GalleryStore } from '../contexts/GalleryContext';
import Products from './gallery/Products';

const productIds = ['5ceea2eb0023ee3bcc730cc7', '5ceebf7ea686a03bccfa67bf', '5ceec48fa686a03bccfa67c4'];

const Gallery = () => {
  return (
    <GalleryStore productIds={productIds}>
      <Products></Products>
    </GalleryStore>
  );
};

export default Gallery;
