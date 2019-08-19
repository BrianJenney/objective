import React, { useContext, useCallback } from 'react';
import ProductContext from '../../contexts/ProductContext';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ProductSlider from '../../components/common/Slider';

import { useQuantity } from '../../hooks';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '728px'
  }
}));

const ProductDetail = () => {
  const available = 20;
  const classes = useStyles();
  const { product } = useContext(ProductContext);
  const handleAddToCart = useCallback(() => {
    alert(`Add to cart ${product.name} at `)
  },[product]);
  const [ quantity, Quantity ] = useQuantity('QTY', 1, available);

  if (!product) {
    return null;
  }

  const subtitle = 'COMPLETE PLAN PROTEIN + PROBIOTICS';

  return (
    <Container>
      <Card >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <ProductSlider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Typography gutterBottom variant="h4" align="center">{product.name}</Typography>
              <Divider variant="fullWidth" />
              <Typography variant="h6" align="center">{subtitle}</Typography>
              <Divider variant="fullWidth" />
              <br/>
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
