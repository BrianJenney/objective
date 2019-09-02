import React, { useContext } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import GalleryContext from '../../contexts/GalleryContext';

import ProductSummary from './ProductSummary';
import { getGallery } from '../../hooks';

const Products = () => {
  const { products, variants, prices } = useContext(GalleryContext);
  if (!products)
    return null;
  const [ productSlugs, productMap, variantSlugs, variantMap ] = getGallery(products, variants, prices);
  return (
    <Container>
      <Grid container spacing={4}>
        {productSlugs.map(productSlug => <ProductSummary key={productSlug} product={productMap.get(productSlug)} variantMap={variantMap}/>)}
      </Grid>
    </Container>
  );

}

export default Products;
