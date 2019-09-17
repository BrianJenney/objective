import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ProductCard from './ProductCard';
import VariantCard from './VariantCard';
import './gallery-style.scss';

const skinImg = require('../../../src/assets/images/skin-cat.png');
const skinIcon = require('../../../src/assets/images/skin-cat-icon.png');

const ProductSummary = ({ product, variantMap }) => {
  return (
    <React.Fragment>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <div className="opt1">
          {/* <ProductCard product={product} /> */}
          <Grid container className="gallery-content-blurb">
            <Grid item item xs={12} md={5} className="leftside">
              <h3>Skin & Beauty</h3>
              <img src={skinIcon} alt="" className="blurb-icon" />
              <Divider variant="fullWidth" />
              <p>{product.description}</p>
            </Grid>
            <Grid item item xs={12} md={7}>
              <img src={skinImg} alt="" className="blurb-img" />
            </Grid>
          </Grid>
        </div>
      </Grid>
      {product.variantSlugs.map(variantSlug => {
        const variant = variantMap.get(variantSlug);

        return (
          <Grid item xs={12} sm={3} md={3} lg={3} key={variant.sku}>
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
