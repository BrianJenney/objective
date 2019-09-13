import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const skinImg = require('../../../src/assets/images/skin-cat.png');
const skinIcon = require('../../../src/assets/images/skin-cat-icon.png');

const ProductCard = ({ product }) => {
  return (
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
  );
};

export default ProductCard;
