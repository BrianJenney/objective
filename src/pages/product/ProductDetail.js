import React, { useState, useContext, useCallback } from 'react';

import ProductContext from '../../contexts/ProductContext';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

import VariantSelectionDialog  from './VariantSelectionDialog'

import { useQuantity } from '../../hooks';
import store from '../../store';
import {requestPatchCart} from '../../modules/cart/actions';

const localStorageClient = require('store');

const calculateCartTotal = cartItems => cartItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);

const useStyles = makeStyles(theme => ({
  media: {
    width: 200,
    height: 355,
    margin: '20px 90px'
  },
  link: {
    margin: theme.spacing(1),
  },
}));

const ProductVariant = ({product, available }) => {
  return product ? (<Typography  variant="body2"><strong>${product.price.$numberDecimal}</strong> / {available} {product.sku } VEGGIE CAPSULES</Typography>
  ) : null;
};

const ProductDetail = () => {
  const available = 20;
  const classes = useStyles();
  const [openVariantSelectionDialog, setOpenVariantSelectionDialog] = useState(false);
  const [selectedProductVariant, setSelectedProductVariant] = useState(null);
  const { product } = useContext(ProductContext);
  const [ quantity, Quantity ] = useQuantity('QTY', 1, available);

  if (!product) {
    return null;
  }

  const subtitle = 'COMPLETE PLAN PROTEIN + PROBIOTICS';

  const saveSelectedProductVariant = (variant) => {
    setSelectedProductVariant(variant);
  };

  const handleAddToCart = values => {
    const { cart } = store.getState();
    const newItems = cart.items;
    let alreadyInCart = false;

    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].variant_id == selectedProductVariant._id) {
        alreadyInCart = true;
        newItems[i].quantity += quantity;
      }
    }

    if (!alreadyInCart) {
      const newItem = {
        product_id: product._id,
        variant_id: selectedProductVariant._id,
        product_name: product.name,
        variant_name: selectedProductVariant.name,
        quantity: quantity,
        unit_price: parseFloat(selectedProductVariant.price.$numberDecimal)
      };
      newItems.push(newItem);
    }

    const patches = {
      items: newItems,
      subtotal: calculateCartTotal(newItems),
      total: calculateCartTotal(newItems)
    };

    store.dispatch(requestPatchCart(localStorageClient.get('cartId'), patches));
  };

  const showVariantSelectionDialog = () => setOpenVariantSelectionDialog(true);
  const closeVariantSelectionDialog = () => setOpenVariantSelectionDialog(false);

  return (
    <Container>
      <Card >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={4} alignItems="center">
            <CardMedia
              className={classes.media}
              image={product.assets.imgs}
              title={product.name}
            />
          </Grid>
          <Grid item item xs={12} sm={8} md={8}>
            <CardContent>
              <Typography gutterBottom variant="h4" align="center">{product.name}</Typography>
              <Divider variant="fullWidth" />
              <Typography variant="h6" align="center">{subtitle}</Typography>
              <Divider variant="fullWidth" />
              <br/>
              <Typography component="p" color="textSecondary" variant="body1">{product.description}</Typography>
              <br/>
              <Typography>
                <Link className={classes.link} onClick={showVariantSelectionDialog}>
                  Select Product Variant
                </Link>
              </Typography>
              <ProductVariant product={selectedProductVariant} available={available}/>
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
      {openVariantSelectionDialog && <VariantSelectionDialog closeVariantSelectionDialog={closeVariantSelectionDialog} onExited={saveSelectedProductVariant} />}
    </Container>

  );

};

export default ProductDetail;
