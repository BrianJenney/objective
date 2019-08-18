import React, { useState, useContext, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
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
import { withMessage } from '../../hoc';

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
  return product ? (<Typography  variant="body2"><strong>${product.price.$numberDecimal}</strong> / {available} {product.sku } CAPSULES</Typography>
  ) : null;
};

const ProductDetail = ({ message, history }) => {
  const available = 20;

  const classes = useStyles();
  const [openVariantSelectionDialog, setOpenVariantSelectionDialog] = useState(false);
  const [selectedProductVariant, setSelectedProductVariant] = useState(null);
  const { product } = useContext(ProductContext);
  const [ quantity, Quantity ] = useQuantity('QTY', 1, available);

  const saveSelectedProductVariant = useCallback((variant) => {
    setSelectedProductVariant(variant);
  },[setSelectedProductVariant]);

  const handleAddToCart = useCallback(() => {
    const { cart } = store.getState();
    console.log('cart', cart)
    const newItems = cart.items;
    let alreadyInCart = false;
    console.log('new Items', newItems)
    newItems.filter(item => item.variant_id == selectedProductVariant._id)
            .forEach(item => {
              alreadyInCart = true;
              item.quantity += quantity;
            });

    if (!alreadyInCart) {
      const newItem = {
        product_id: product._id,
        product_name: product.name,
        variant_name: selectedProductVariant.name,
        variant_id: selectedProductVariant._id,
        sku: selectedProductVariant.sku,
        quantity: quantity,
        unit_price: parseFloat(selectedProductVariant.price.$numberDecimal)
      };
      newItems.push(newItem);
    }
    console.log('cart', newItems)

    const patches = {
      items: newItems,
      subtotal: calculateCartTotal(newItems),
      total: calculateCartTotal(newItems)
    };

    store.dispatch(requestPatchCart(localStorageClient.get('cartId'), patches));
    message(`${quantity} ${selectedProductVariant.sku} added to cart`);
    history.push('/cart');
  }, [product, selectedProductVariant, quantity, message, history]);

  const showVariantSelectionDialog = useCallback(() => setOpenVariantSelectionDialog(true), [setOpenVariantSelectionDialog]);
  const closeVariantSelectionDialog = useCallback(() => setOpenVariantSelectionDialog(false), [setOpenVariantSelectionDialog]);

  if (!product) {
    return null;
  }

  const subtitle = 'COMPLETE PLAN PROTEIN + PROBIOTICS';

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
                <Link color="primary" variant="caption" onClick={showVariantSelectionDialog}>Select Product Variant</Link>
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
              <Button variant="outlined" color="primary" onClick={handleAddToCart} disabled={selectedProductVariant == null}>
                Add {quantity} item{quantity > 1 ? 's' : ''} To Cart
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
      {openVariantSelectionDialog &&
       <VariantSelectionDialog closeVariantSelectionDialog={closeVariantSelectionDialog} onExited={saveSelectedProductVariant} />}
    </Container>
  );

};

export default withRouter(withMessage(ProductDetail));
