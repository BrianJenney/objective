import React from 'react';
import { GalleryStore } from '../../contexts/GalleryContext';
import Slider from '../common/Slider';

const ProductSlider = () => {
  return (
    <GalleryStore productIds={['5ceea2eb0023ee3bcc730cc7', '5ceebf7ea686a03bccfa67bf', '5ceec48fa686a03bccfa67c4']}>
      <Slider />
    </GalleryStore>
  )
}

export default ProductSlider

