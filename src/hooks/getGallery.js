import React from 'react';

import { getProducts, getVariants, getPrices } from '../utils/product';

export const getGallery = (products, variants, prices) => {
  const pricesMap = getPrices(prices);
  const [variantSlugs, variantMap] = getVariants(products, variants, pricesMap);
  const [productSlugs, productMap] = getProducts(products, variants);
  return [productSlugs, productMap, variantSlugs, variantMap];
};

