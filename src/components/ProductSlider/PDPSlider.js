import React, { useContext, useState, useEffect, useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ProductContext from '../../contexts/ProductContext';
import './image-gallery-overrides.scss';
import styles from './overrides.module.scss';

const PDPSlider = props => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { product } = useContext(ProductContext);
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const galleryRef = useRef(null);
  let { images } = props;

  if (!images) {
    images = [
      {
        fields: {
          file: {
            url: 'https://cdn1.stopagingnow.com/objective/658x658.png'
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
      sku: product.defaultVariantSku
    });
  };

  const renderImages = images => {
    let carouselImages = [];

    images.map(image => {
      let imageUrlOriginal = image.fields.file.url + '?w=687&w=687';
      let imageUrlOriginalSplit = imageUrlOriginal.split('//images.ctfassets.net/mj9bpefl6wof/');
      imageUrlOriginal = 'https://nutranext.imgix.net/' + imageUrlOriginalSplit[1];

      let imageUrlThumbnail = image.fields.file.url + '?w=120&h=120';
      let imageUrlThumbnailSplit = imageUrlThumbnail.split('//images.ctfassets.net/mj9bpefl6wof/');
      imageUrlThumbnail = 'https://nutranext.imgix.net/' + imageUrlThumbnailSplit[1] + '&auto=compress,format';

      {
        !xs
          ? carouselImages.push({
              original: imageUrlOriginal,
              thumbnail: imageUrlThumbnail
            })
          : carouselImages.push({
              original: imageUrlOriginal
            });
      }

      return carouselImages;
    });

    return (
      <div className="pdp-slider">
        <ImageGallery
          ref={galleryRef}
          showNav
          additionalClass={styles['set-gallery-width']}
          showFullscreenButton={false}
          showPlayButton={false}
          items={carouselImages}
          thumbnailPosition={xs ? 'bottom' : 'left'}
          showThumbnails={xs ? false : true}
          showBullets={xs ? true : false}
          onSlide={handleSegmentBrowsedEvent}
        />
      </div>
    );
  };

  return <>{renderImages(images)}</>;
};

export default PDPSlider;
