import React from 'react';

import { GalleryStore } from '../contexts/GalleryContext';
import Products from './gallery/Products';

const localStorageClient = require('store');
const productIds = localStorageClient.get('products');

const Gallery = () => {
  return (
    <GalleryStore productIds={productIds}>
      <Products></Products>
    </GalleryStore>
  );
};

export default Gallery;
