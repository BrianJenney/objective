import React, { useContext, useCallback } from 'react';

import ProductContext from '../../contexts/ProductContext';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import { useQuantity } from '../../hooks';

const useStyles = makeStyles(theme => ({
  media: {
    width: 200,
    height: 355,
    margin: '20px 90px'
  }
}));

const ProductDetail = () => {
  const available = 20;
  const classes = useStyles();
  const { product } = useContext(ProductContext);
  const handleAddToCart = useCallback(() => {
    alert(`Add to cart ${product.name} at `)
  },[product]);
  const [quantity, Quantity] = useQuantity('QTY', 1, available);
  if (!product) {
    return null;
  }
  const subtitle = 'COMPLETE PLAN PROTEIN + PROBIOTICS';

  return (
    <Container>
      <Card >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={4}>
            <CardMedia
              className={classes.media}
              image={product.assets.imgs}
              title={product.name}
            />
          </Grid>
          <Grid item item xs={12} sm={4} md={8}>
            <CardContent>
              <Typography gutterBottom variant="h4" align="center">{product.name}</Typography>
              <Divider variant="fullWidth" />
              <Typography variant="h6" align="center">{subtitle}</Typography>
              <Divider variant="fullWidth" />
              <br />
              <Typography component="p" color="textSecondary" variant="body1">{product.description}</Typography>
              <br/>
              <Typography  variant="body2"><strong>${product.price.$numberDecimal}</strong> / {available} VEGGIE CAPSULES</Typography>
              <br/>
              <Divider variant="fullWidth" />
              <br/>
              <Quantity />
              <br/>
              <Divider variant="fullWidth" />
            </CardContent>
            <CardActions>
              <Button variant="outlined" color="primary" onClick={handleAddToCart}>
                Add {quantity} item{quantity > 1 ? 's' : ''} To Cart
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );

};

export default ProductDetail;

