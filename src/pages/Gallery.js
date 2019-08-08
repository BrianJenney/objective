import React, { Component } from 'react';

import { GalleryStore } from '../contexts/GalleryContext';

import ProductCard from './gallery/ProductCard';
import Slider from '../components/Slider/';

class Gallery extends Component {
  render() {
    return (
      <GalleryStore productIds={['5ceea2eb0023ee3bcc730cc7', '5ceebf7ea686a03bccfa67bf', '5ceec48fa686a03bccfa67c4']}>
        <ProductCard></ProductCard>
        <Slider />
      </GalleryStore>
    );
  }
}

export default Gallery;
