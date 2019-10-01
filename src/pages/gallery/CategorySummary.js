import React from 'react';
import Grid from '@material-ui/core/Grid';
import VariantCard from './VariantCard';
import './gallery-style.scss';

const skinImg = require('../../../src/assets/images/skin.png');
const skinIcon = require('../../../src/assets/images/skin.png');
const healthIcon = require('../../../src/assets/images/general.png');
const healthImg = require('../../../src/assets/images/general.png');
const energyIcon = require('../../../src/assets/images/targeted.png');
const energyImg = require('../../../src/assets/images/targeted.png');

/*
@description - Returns Product Summary based on category
@param {Object} category - Data about the category, such as title, description, & slug
@param {Array} products - A collection of products
@return JSX React.Fragment
*/
const CategorySummary = ({ category, products, styleMap }) => {
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

  return (
    <>
      {products.map(product => {
        return (
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <div className="opt2" style={styleMap.container}>
              <VariantCard variant={product} styleMap={styleMap} />
            </div>
          </Grid>
        );
      })}
    </>
  );
};

export default CategorySummary;
