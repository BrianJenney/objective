import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import VariantCard from './VariantCard';
import './gallery-style.scss';

const skinImg = require('../../../src/assets/images/skin-cat.png');
const skinIcon = require('../../../src/assets/images/skin-cat-icon.png');

/*
@description - Returns Product Summary based on category
@param {Object} category - Data about the category, such as title, description, & slug
@param {Array} products - A collection of products
@param {Map} variantMap - A Map of variants
@return JSX React.Fragment

*/
const CategorySummary = ({ category, products, variantMap }) => {
  return (
    <React.Fragment className="section">
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <div className="opt1">
          <Grid container className="gallery-content-blurb">
            <Grid item xs={12} md={5} className="leftside">
              <h3>{category.title}</h3>
              <img src={skinIcon} alt="" className="blurb-icon" />
              <Divider variant="fullWidth" />
              <p>
                {category.description}. Category slug: {category.slug}{' '}
              </p>
            </Grid>
            <Grid item xs={12} md={7}>
              <img src={skinImg} alt="" className="blurb-img" />
            </Grid>
          </Grid>
        </div>
      </Grid>

      {products.map(product => {
        if (product.variantSlugs.length > 0) {
          const variant = variantMap.get(product.variantSlugs[0]);
          return (
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <div className="opt2">
                <VariantCard variant={variant} product={product} />
              </div>
            </Grid>
          );
        }
      })}
    </React.Fragment>
  );
};

export default CategorySummary;
