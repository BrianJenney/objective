import React, { useContext } from 'react';

import GalleryContext from '../contexts/GalleryContext';
import { getProducts, getVariants, getPrices } from '../utils/product';

export const useGallery = () => {
  const { products, variants, prices} = useContext(GalleryContext);
  const pricesMap = getPrices(prices);
  const [variantSlugs, variantMap] = getVariants(products, variants, pricesMap);
  const [productSlugs, productMap] = getProducts(products, variants);
  return [productSlugs, productMap, variantSlugs, variantMap];
};

