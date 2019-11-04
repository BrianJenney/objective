import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const FeaturedProduct = ({ product, key }) => {
  const productImage = product.fields.productImages[0].fields.file.url;
  return (
    <Grid item xs={12}>
      <img
        style={{ width: 128, height: 128 }}
        src={productImage}
        alt={product.fields.productTitle}
      />
      <div className="flex">
        <Link
          to={`/products/${product.fields.Slug}`}
          key={`product-key-${key}`}
          children={product.fields.productTitle}
        ></Link>
      </div>
    </Grid>
  );
};

export default FeaturedProduct;
