import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import ProductCard from './ProductCard';
import VariantCard from './VariantCard';

const ProductSummary = ({ product, variantMap }) => {
  return (
    <>
      <Grid item xs={12} sm={4} md={4}>
        <ProductCard product={product} />
      </Grid>
      {product.variantSlugs.map(variantSlug => {
        const variant = variantMap.get(variantSlug);
        return (
          <Grid item xs={12} sm={4} md={4}>
            <VariantCard variant={variant} />
          </Grid>
        );
      })}
    </>

  );
};

export default ProductSummary;
