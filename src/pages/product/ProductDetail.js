import React, { useState, useContext, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import ProductContext from '../../contexts/ProductContext';
import Box from '@material-ui/core/Box';
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
import Link from '@material-ui/core/Link';

import VariantSelectionDialog  from './VariantSelectionDialog'

import { useQuantity } from '../../hooks';

import store from '../../store';
import {requestPatchCart} from '../../modules/cart/actions';

const localStorageClient = require('store');

const calculateCartTotal = cartItems => cartItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '728px'
  },
  box: {
    backgroundColor: 'grey'
  },
  title: {
    margin: 0,
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(7),
  },
  subtitle: {
    margin: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

const ProductVariant = ({productVariant, available }) => {
  return productVariant ? (<Typography variant="body2"><strong>{productVariant.attributes[0].value} ${productVariant.price.$numberDecimal}</strong> / {available} {productVariant.sku } CAPSULES</Typography>
  ) : null;
};

const ProductDetail = ({ history }) => {
  const available = 20;

  const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [ openVariantSelectionDialog, setOpenVariantSelectionDialog ] = useState(false);
  const [ selectedProductVariant, setSelectedProductVariant ] = useState(null);
  const { product } = useContext(ProductContext);
  const [ quantity, Quantity ] = useQuantity('QTY', 1, available);
  const { enqueueSnackbar } = useSnackbar();

  const saveSelectedProductVariant = useCallback((variant) => {
    setSelectedProductVariant(variant);
  },[setSelectedProductVariant]);

  const handleAddToCart = useCallback(() => {
    const newItems = cart.items;
    let alreadyInCart = false;
    newItems.filter(item => item.variant_id === selectedProductVariant._id)
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
        variant_type: selectedProductVariant.attributes[0].name,
        variant_value: selectedProductVariant.attributes[0].value,
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
    dispatch(requestPatchCart(localStorageClient.get('cartId'), patches));
    enqueueSnackbar(`${quantity} ${selectedProductVariant.sku} added to cart`, {
      variant: 'success',
    });
    history.push('/cart');
  }, [product, selectedProductVariant, quantity, history, enqueueSnackbar]);

  const showVariantSelectionDialog = useCallback(() => setOpenVariantSelectionDialog(true), []);
  const closeVariantSelectionDialog = useCallback(() => setOpenVariantSelectionDialog(false), []);

  if (!product) {
    return null;
  }

  const dropdownType = product.attributes[0].name;

  return (
    <Container>
      <Card >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <ProductSlider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Divider variant="fullWidth" />
              <Box className={classes.box}>
                <Typography className={classes.title} variant="h3" align="center">{product.name}</Typography>
              </Box>
              <Divider variant="fullWidth" />
              <Box className={classes.box} >
                <Typography className={classes.subtitle} variant="h6" align="center">{product.subtitle}</Typography>
              </Box>
              <Divider variant="fullWidth" />
              <br/>
              <Typography component="p" color="textSecondary" variant="body1">{product.description}</Typography>
              <br/>
              <Typography>
                <Link color="primary" variant="caption" onClick={showVariantSelectionDialog}>Select {dropdownType}</Link>
              </Typography>
              <ProductVariant productVariant={selectedProductVariant} available={available}/>
              <br/>
              <Divider variant="fullWidth" />
              <br/>
              <Quantity />
              <br/>
              <Divider variant="fullWidth" />
            </CardContent>
            <CardActions>
              <Button fullWidth variant="contained" color="primary" onClick={handleAddToCart} disabled={selectedProductVariant == null}>
                Buy {quantity} item{quantity > 1 ? 's' : ''}
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
      {openVariantSelectionDialog &&
       <VariantSelectionDialog dropdownType={dropdownType} closeVariantSelectionDialog={closeVariantSelectionDialog} onExited={saveSelectedProductVariant} />}
    </Container>
  );

};

export default withRouter(ProductDetail);
