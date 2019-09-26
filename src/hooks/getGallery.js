import React from 'react';

import { getProducts, getVariants, getPrices, getProductCategories} from '../utils/product';

export const getGallery = (products, variants, prices) => {
  console.log('getGallery prices arg ', prices);
  const pricesMap = getPrices(prices);
  console.log('getGallery getPrices result ', pricesMap);
  const [variantSlugs, variantMap] = getVariants(products, variants, pricesMap);
  const [productSlugs, productMap] = getProducts(products, variants);
  const productCategories = getProductCategories(products);
  return [productSlugs, productMap, variantSlugs, variantMap, productCategories];
};

