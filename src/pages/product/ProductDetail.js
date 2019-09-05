import React, { useState, useContext, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import ProductContext from '../../contexts/ProductContext';
import { Box, Typography, Card, CardContent, CardActions, Button, Grid, Divider } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useQuantity, useWindowSize } from '../../hooks';

import Carousel from '../../components/ProductSlider/PDPSlider';
import './overrides.css'
import { addToCart } from '../../utils/cart';
import { getPrices, getVariantSkuBySlug, getVariantMap } from '../../utils/product';

// import ProductType from './ProductType';
// import ProductVariantType from './ProductVariantType';

const localStorageClient = require('store');

const useStyles = makeStyles(theme => ({
  maxWidth: {
    width: '100%',
    maxWidth: '464px',
    padding: '0 !important'
  },
  wrapperMaxWidth: {
    maxWidth: '86% !important'
  },
  resetButtonPadding: {
    padding: 0
  },
  cardRootOverrides: {
    padding: 0,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
  },
  box: {
    backgroundColor: 'transparent',
  },
  title: {
    margin: 0,
    lineHeight: '1em',
    paddingBottom: theme.spacing(2),
  },
  subtitle: {
    margin: 0,
    marginTop: theme.spacing(1),
  },
  gridModifications: {
    paddingTop: theme.spacing(8),
    backgroundColor: '#fdf8f2'
  },
  padding: {
    padding: '60px 81px',
  },
  variant: {
    paddingBottom: theme.spacing(5)
  },
  divider: {
    border: '.5px solid'
  },
  directionsHeader: {
    fontSize: '.9rem',
    padding: 0,
    lineHeight: '.7rem',
    marginBottom: theme.spacing(1),
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  flexStart: {
    alignSelf: 'flex-start',
  },
}));

const StyledButton = withStyles(theme => ({
  root: {
    backgroundColor: '#000000',
    borderRadius: 0,
    border: 0,
    color: 'white',
    width: '100%',
    maxWidth: '464px',
    height: '80px',
    padding: '0',
  },
  label: {
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
}))(Button);

const ProductVariant = ({ productVariant }) => {
  const classes = useStyles();
  return productVariant ? (<Typography className={classes.variant} variant="h5"><strong>${productVariant.effectivePrice}</strong> / {productVariant.variantInfo.size} {productVariant.variantInfo.prodType}</Typography>
  ) : null;
};

const ProductDetail = ({ variantSlug, history }) => {

  const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { product, variants, prices } = useContext(ProductContext);
  const windowSize = useWindowSize();
  const { enqueueSnackbar } = useSnackbar();
  const [ATCEnabled, setATCEnabled] = useState(true);
  // const [selectedProductVariant, setSelectedProductVariant] = useState(getVariantByVariantSlug(variants, pricesMap, variantSlug));
  const defaultSku = getVariantSkuBySlug(variants, variantSlug);
  const [selectedVariantSku, setSelectedVariantSku] = useState(null);
  const pricesMap = getPrices(prices);
  const variantMap = getVariantMap(variants, pricesMap);
  const updateQuantityToCart = (qty => {
    if (selectedVariantSku === null)
      return;
    addToCart(localStorageClient.get('cartId'), cart, variantMap.get(selectedVariantSku), qty, dispatch);
    enqueueSnackbar(`${qty} ${selectedVariantSku} added to cart`, {
      variant: 'success',
    });
  });
  const [quantity, setQuantity, Quantity] = useQuantity(updateQuantityToCart, 'QTY');
  const handleAddToCart = useCallback(() => {
    addToCart(localStorageClient.get('cartId'), cart, variantMap.get(selectedVariantSku), quantity, dispatch);
    enqueueSnackbar(`${quantity} ${selectedVariantSku} added to cart`, {
      variant: 'success',
    });
    setATCEnabled(false);
  }, [cart, selectedVariantSku, variantMap, quantity, enqueueSnackbar, dispatch]);

  const updateTerminalVariant = useCallback((terminalVariant) => {
    /*
    if (terminalVariant['Diet Type'] === null) {
      setATCEnabled(true);
      setQuantity(1);
      setSelectedProductVariant(null);
    } else {
      setSelectedProductVariant(getVariantByTerminalVariant(variants, pricesMap, terminalVariant));
    }
     */
    setSelectedVariantSku(terminalVariant['Product Type']);
    setQuantity(1);
    setATCEnabled(true);

  },[setSelectedVariantSku, setQuantity]);

  useEffect(() => {
    setSelectedVariantSku(defaultSku);
  }, [defaultSku]);

  if (product === null || variants.length === 0)
    return null;

  const isMobile = windowSize.width < 944;
  // console.log('ProductDetail', {selectedVariantSku, variantMap})

  return (
    <>
      <Grid container className={classes.gridModifications} xs={12} sm={12}>
        <Grid container justify="space-between" xs={10} sm={11} className={classes.wrapperMaxWidth}>
          <Grid item xs={12} sm={6}>
            <Carousel prodId={product._id} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card className={classes.box}>
              <CardContent className={classes.cardRootOverrides}>
                <Box>
                  <Typography className={classes.title} variant="h1">{product.name}</Typography>
                  <ProductVariant productVariant={variantMap.get(selectedVariantSku)} />
                </Box>
                <Divider variant="fullWidth" className={classes.divider} />
                <Box >
                  <Typography className={classes.subtitle} variant="h6">{product.subtitle}</Typography>
                </Box>
                <Divider variant="fullWidth" className={classes.divider} />
                <br />
                <Typography component="p" color="textSecondary" variant="body2">{product.description}</Typography>
                <br />
                <Typography className={classes.directionsHeader} variant="h6">DIRECTIONS</Typography>
                <Typography variant="body2">Take one soft gel daily with meal</Typography>
                <br/>
                {/*<ProductVariantType isMobile={isMobile} variantSlug={variantSlug} updateTerminalVariant={updateTerminalVariant}/>*/}
                {!ATCEnabled && <Quantity />}
              </CardContent>
              {ATCEnabled && <Grid container xs={12} justify="left-start" alignItems="center">
                <CardActions className={classes.maxWidth}>
                  <StyledButton className={classes.resetButtonPadding} fullWidth={isMobile} variant="contained" color="primary" onClick={handleAddToCart} disabled={selectedVariantSku === null}>
                    ADD TO CART
                  </StyledButton>
                </CardActions>
              </Grid>}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(ProductDetail);
