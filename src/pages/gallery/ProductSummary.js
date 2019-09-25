import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ProductCard from './ProductCard';
import VariantCard from './VariantCard';
import './gallery-style.scss';

const skinImg = require('../../../src/assets/images/skin-cat.png');
const skinIcon = require('../../../src/assets/images/skin-cat-icon.png');
const healthIcon = require('../../../src/assets/images/health-cat-icon.png');
const healthImg = require('../../../src/assets/images/health-cat.png');
const energyIcon = require('../../../src/assets/images/energy-cat-icon.png');
const energyImg = require('../../../src/assets/images/energy-cat.png');

const ProductSummary = ({ product, ind, styleMap, variantMap }) => {
  //Below condition will be based on product's category
  const productSlug = product.slug;
  let title, catIcon, catImg;
  if (productSlug === 'TMNO') {
    title = <h3 style={styleMap.text}>Skin & Beauty</h3>;
    catIcon = skinIcon;
    catImg = skinImg;
  }
  if (productSlug === 'TIMN') {
    title = <h3 style={styleMap.text}>Core Health</h3>;
    catIcon = healthIcon;
    catImg = healthImg;
  }
  if (productSlug === 'TSGF') {
    title = <h3 style={styleMap.text}>Mood & Energy</h3>;
    catIcon = energyIcon;
    catImg = energyImg;
  }

  return (
    <React.Fragment>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <div className="opt1" style={styleMap.container}>
          {/* <ProductCard product={product} /> */}
          <Grid container className="gallery-content-blurb">
            <Grid item item xs={12} md={5} className="leftside">
              {title}
              <img src={catIcon} alt="" className="blurb-icon" />
              <Divider
                style={{ backgroundColor: styleMap.text.color }}
                variant="fullWidth"
              />
              <p>{product.description}</p>
            </Grid>
            <Grid item item xs={12} md={7}>
              <img src={catImg} alt="" className="blurb-img" />
            </Grid>
          </Grid>
        </div>
      </Grid>
      {product.variantSlugs.map(variantSlug => {
        const variant = variantMap.get(variantSlug);

        return (
          <Grid item xs={12} sm={3} md={3} lg={3} key={variant.sku}>
            <div className="opt2" style={styleMap.container}>
              <VariantCard
                variant={variant}
                product={product}
                styleMap={styleMap}
              />
            </div>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default ProductSummary;
