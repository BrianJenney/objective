import React, { useState, useContext, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import ProductContext from '../../contexts/ProductContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useQuantity, useWindowSize } from '../../hooks';
import Carousel from '../../components/ProductSlider/PDPSlider';
import { Button } from '../../components/common';
import './overrides.css';
import { addToCart } from '../../utils/cart';
import {
  getPrices,
  getVariantSkuBySlug,
  getVariantMap
} from '../../utils/product';
import './PDP-style.css';

// import ProductType from './ProductType';
import ProductVariantType from './ProductVariantType';
import ATCSnackbarAction from '../../components/common/ATCSnackbarAction';
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
  cardRootOverrides: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  box: {
    backgroundColor: 'transparent'
  },
  gridModifications: {
    paddingTop: theme.spacing(8),
    backgroundColor: '#fdf8f2'
  },
  button: {
    maxWidth: '464px',
    height: '80px',
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'bold'
  }
}));

const ProductVariant = ({ productVariant }) => {
  return productVariant ? (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      className="pdp-product-variant"
    >
      <div className="pdp-price">${productVariant.effectivePrice}</div>
      <div className="pdp-price-slash">/</div>
      <div className="pdp-price-description">
        {productVariant.variantInfo.size} {productVariant.variantInfo.prodType}
      </div>
    </Box>
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

  const message = (
    <ATCSnackbarAction variant={variantMap.get(selectedVariantSku)} />
  );

  const updateQuantityToCart = useCallback(
    qty => {
      if (selectedVariantSku === null) return;
      addToCart(
        localStorageClient.get('cartId'),
        cart,
        variantMap.get(selectedVariantSku),
        qty,
        dispatch
      );
      enqueueSnackbar(message, { variant: 'success' });
    },
    [cart, selectedVariantSku, variantMap, message, enqueueSnackbar, dispatch]
  );
  const [quantity, setQuantity, Quantity] = useQuantity(
    updateQuantityToCart,
    'QTY'
  );

  const handleAddToCart = useCallback(() => {
    addToCart(
      localStorageClient.get('cartId'),
      cart,
      variantMap.get(selectedVariantSku),
      quantity,
      dispatch
    );
    enqueueSnackbar(message, { variant: 'success' });
    setATCEnabled(false);
  }, [
    cart,
    selectedVariantSku,
    variantMap,
    message,
    quantity,
    enqueueSnackbar,
    dispatch
  ]);

  const updateTerminalVariant = useCallback(
    terminalVariant => {
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
    },
    [setSelectedVariantSku, setQuantity]
  );

  useEffect(() => {
    setSelectedVariantSku(defaultSku);
  }, [defaultSku]);

  if (product === null || variants.length === 0) return null;

  const isMobile = windowSize.width < 944;

  return (
    <>
      <Grid container className={classes.gridModifications} xs={12} sm={12}>
        <Grid
          container
          justify="space-between"
          xs={10}
          sm={11}
          className={classes.wrapperMaxWidth}
        >
          <Grid item xs={12} sm={6}>
            <Carousel prodId={product._id} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card className={classes.box}>
              <CardContent
                className={classes.cardRootOverrides}
                className="pdp-content"
              >
                <Box>
                  <Typography className="pdp-header" variant="h1">
                    {product.name}
                  </Typography>
                </Box>
                <Typography className="pdp-subtitle">
                  {product.subtitle}
                </Typography>
                <br />
                <ProductVariant
                  productVariant={variantMap.get(selectedVariantSku)}
                />
                <Typography className="pdp-description">
                  {product.description}
                </Typography>
                <br />
                <Typography className="pdp-direction">DIRECTIONS</Typography>
                <Typography className="pdp-direction-description">
                  Take one soft gel daily with meal
                </Typography>

                <ProductVariantType
                  isMobile={isMobile}
                  variantSlug={variantSlug}
                  updateTerminalVariant={updateTerminalVariant}
                />
                {!ATCEnabled && <Quantity />}
              </CardContent>
              {ATCEnabled && (
                <Grid>
                  <CardActions className={classes.maxWidth}>
                    <Button
                      className={classes.button}
                      fullWidth
                      onClick={handleAddToCart}
                      disabled={selectedVariantSku === null}
                    >
                      ADD TO CART
                    </Button>
                  </CardActions>
                </Grid>
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(ProductDetail);
