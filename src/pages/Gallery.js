import React, { Component } from 'react';

import { GalleryStore } from '../contexts/GalleryContext';

import ProductCard from './gallery/ProductCard';

class Gallery extends Component {
  render() {
    return (
      <GalleryStore>
        <ProductCard></ProductCard>
      </GalleryStore>
    );
  }
}

export default Gallery;