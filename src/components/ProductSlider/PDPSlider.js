import React, { useContext, useState, useEffect } from 'react';
import ProductContext from '../../contexts/ProductContext';
import ImageGallery from 'react-image-gallery';
import './image-gallery-overrides.css';
import styles from './overrides.module.scss';

const Carousel = props => {
  const { product } = useContext(ProductContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log(product);

  useEffect(() => {
    const imageWrapper = document.getElementsByClassName(
      'image-gallery-slide-wrapper'
    );
    const largeImg = document.getElementsByClassName('image-gallery-image');
    const thumbImg = document.getElementsByClassName(
      'image-gallery-thumbnails-container'
    );

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

    console.log(largeImg);
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

  const transformProduct = (id, product) => {
    const { assets, _id } = product;
    const imgUrl = Object.values(assets);
    const imgArr = [...imgUrl];

    let carouselImages = [];

    imgArr.map(url => {
      carouselImages.push({ original: url, thumbnail: url });
      return carouselImages;
    });

    if (!_id) {
      return null;
    }

    return (
      <ImageGallery
        showNav={true}
        additionalClass={styles['set-gallery-width']}
        showFullscreenButton={false}
        showPlayButton={false}
        items={carouselImages}
        thumbnailPosition={'left'}
        showThumbnails={windowWidth < 769 ? false : true}
      />
    );
  };

  const renderProducts = id => transformProduct(id, product);

  return <>{renderProducts(product._id)}</>;
};

export default Carousel;
