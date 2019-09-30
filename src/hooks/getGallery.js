import React from 'react';

import { getProducts, getVariants, getPrices, getProductCategories} from '../utils/product';

export const getGallery = (products, variants, prices) => {
  const pricesMap = getPrices(prices);
  const [variantSlugs, variantMap] = getVariants(products, variants, pricesMap);
  const [productSlugs, productMap] = getProducts(products, variants);
  const productCategories = getProductCategories(products);
  return [productSlugs, productMap, variantSlugs, variantMap, productCategories];
};

