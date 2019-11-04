import React, { useContext, useState, useEffect } from 'react';

import ProductContext from '../../contexts/ProductContext';
import ImageGallery from 'react-image-gallery';

import './image-gallery-overrides.css';
import styles from './overrides.module.scss';

const Carousel = props => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let { images } = props;
  const productContext = useContext(ProductContext);
  const {product} = productContext; 

  if (!images) {
    images = [
      {
        'fields': {
          'file': {
            'url': 'https://cdn1.stopagingnow.com/objective/658x658.png'
          }
        }
      }
    ];
  }

  useEffect(() => {
    const imageWrapper = document.getElementsByClassName('image-gallery-slide-wrapper');
    const largeImg = document.getElementsByClassName('image-gallery-image');
    const thumbImg = document.getElementsByClassName('image-gallery-thumbnails-container');

    if (imageWrapper.length < 1) {
      return undefined;
    }

    for (let imgParent of largeImg) {
      imgParent.classList.add(styles['reset-display']);
      const prodImg = imgParent.getElementsByTagName('img');

      for (let pic of prodImg) {
        pic.classList.add(styles['reset-image-size']);
      }
    }

    for (let thumb of thumbImg) {
      const thumbImg = thumb.getElementsByTagName('img');

      for (let item of thumbImg) {
        item.classList.add(styles['reset-thumb-height']);
      }
    }

    if (windowWidth < 769) {
      imageWrapper[0].classList.add(styles['newWidth']);
    } else if (windowWidth > 769) {
      imageWrapper[0].classList.remove(styles['newWidth']);
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth < 769) {
        imageWrapper[0].classList.add(styles['newWidth']);
      } else {
        return;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  /*
  *
  * @description - Tracks Segment Product Images Browsed Event
  * @param {Int} currentIndex - The index of the image being browsed
  * @return void
  * 
  */
  const handleSegmentBrowsedEvent = currentIndex => {
    const image = images[currentIndex];
    window.analytics.track('Product Images Browsed', {
      image_url: `https:${image.fields.file.url}`,
      index: currentIndex + 1,
      product_id: product._id,
      product_name: product.name,
      sku: product.sku
    });
  };

  const renderImages = images => {
    let carouselImages = [];

    images.map(image => {
      carouselImages.push({ original: image.fields.file.url + '?w=687&w=687&q=90', thumbnail: image.fields.file.url + '?w=120&h=120&q=80' });
      return carouselImages;
    });

    return (
      <ImageGallery
        showNav={true}
        additionalClass={styles['set-gallery-width']}
        showFullscreenButton={false}
        showPlayButton={false}
        items={carouselImages}
        thumbnailPosition={'left'}
        showThumbnails={windowWidth < 769 ? false : true}
        onSlide={handleSegmentBrowsedEvent}
      />
    );
  };

  return <>{renderImages(images)}</>;
};

export default Carousel;
