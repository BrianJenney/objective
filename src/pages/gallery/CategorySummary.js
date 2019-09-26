import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import VariantCard from './VariantCard';
import './gallery-style.scss';

const skinImg = require('../../../src/assets/images/skin-cat.png');
const skinIcon = require('../../../src/assets/images/skin-cat-icon.png');
const healthIcon = require('../../../src/assets/images/health-cat-icon.png');
const healthImg = require('../../../src/assets/images/health-cat.png');
const energyIcon = require('../../../src/assets/images/energy-cat-icon.png');
const energyImg = require('../../../src/assets/images/energy-cat.png');
/*
@description - Returns Product Summary based on category
@param {Object} category - Data about the category, such as title, description, & slug
@param {Array} products - A collection of products
@param {Map} variantMap - A Map of variants
@return JSX React.Fragment

*/
const CategorySummary = ({ category, products, variantMap, styleMap }) => {
    //Below condition will be based on product's category
    //Will need to be refactor later on to grab categories and their data directly out of a collection in Mongo
    //..for now we're hard coding the titles, and using the first product's description as the description
    let title, catIcon, catImg;
    if (category.slug === 'skin') {
      title = <h3 style={styleMap.text}>Skin & Beauty</h3>;
      catIcon = skinIcon;
      catImg = skinImg;
    }
    if (category.slug === 'core') {
      title = <h3 style={styleMap.text}>Core Health</h3>;
      catIcon = healthIcon;
      catImg = healthImg;
    }
    if (category.slug === 'energy') {
      title = <h3 style={styleMap.text}>Mood & Energy</h3>;
      catIcon = energyIcon;
      catImg = energyImg;
    }

    const __category = {title:title,description:products[0].description};
  return (
    <React.Fragment className="section">
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <div className="opt1" style={styleMap.container}>
          <Grid container className="gallery-content-blurb">
            <Grid item xs={12} md={5} className="leftside">
              <h3>{__category.title}</h3>
              <img src={skinIcon} alt="" className="blurb-icon" />
              <Divider variant="fullWidth" />
              <p>
                {__category.description}
              </p>
            </Grid>
            <Grid item xs={12} md={7}>
              <img src={skinImg} alt="" className="blurb-img" />
            </Grid>
          </Grid>
        </div>
      </Grid>

      {products.map(product => {
        return (product.variantSlugs.map(variantSlug => {
          const variant = variantMap.get(variantSlug);
          
          return (
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <div className="opt2" style={styleMap.container}>
                <VariantCard variant={variant} product={product} styleMap={styleMap} />
              </div>
            </Grid>
          );


        })
      )
     
      })}
    </React.Fragment>
  );
};

export default CategorySummary;
