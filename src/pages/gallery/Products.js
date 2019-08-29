import React, { useContext } from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import GalleryContext from '../../contexts/GalleryContext';

import ProductSummary from './ProductSummary';
import { useGallery} from '../../hooks';

const Products = () => {
  // const { products } = useContext(GalleryContext);
  const [ productSlugs, productMap, variantSlugs, variantMap ] = useGallery();
  console.log('Products', productSlugs, productMap, variantSlugs, variantMap)
  return (
    <Container>
      <Grid container spacing={4}>
        {productSlugs.map(productSlug => <ProductSummary key={productSlug} product={productMap.get(productSlug)} variantMap={variantMap}/>)}
      </Grid>
    </Container>
  );

}

export default Products;
