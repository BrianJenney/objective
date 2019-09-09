import React from 'react';

import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';
import VariantCard from './VariantCard';
import './gallery-style.scss';

const ProductSummary = ({ product, variantMap }) => {
  return (
    <React.Fragment className="section">
      {/* <Grid item xs={12} sm={12} md={6} lg={6} pb={2} px={2}>
        <div className="opt1">
          <ProductCard product={product} />
        </div>
      </Grid> */}
      {product.variantSlugs.map(variantSlug => {
        const variant = variantMap.get(variantSlug);
        return (
          <Grid item xs={12} sm={3} md={3} lg={3} pb={2} px={2}>
            <div className="opt2">
              <VariantCard variant={variant} product={product} />
            </div>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default ProductSummary;
