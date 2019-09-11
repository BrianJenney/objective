import React, { useState, useContext, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MailOutline from '@material-ui/icons/MailOutline';
import ProductContext from '../../contexts/ProductContext';
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
import ProductPopUp from './ProductPopUp';
import ATCSnackbarAction from '../../components/common/ATCSnackbarAction';

const localStorageClient = require('store');

const useStyles = makeStyles(theme => ({
  maxWidth: {
    maxWidth: '464px'
  },
  cardRootOverrides: {
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
  btnOOS: {
    border: '1.5px solid',
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.common.white
    }
  },
  icon: {
    marginRight: '10px'
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
  const { enqueueSnackbar } = useSnackbar();
  const [ATCEnabled, setATCEnabled] = useState(true);
  const [open, setOpen] = useState(false);

  const windowSize = useWindowSize();
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

  const handleEmailPopup = () => {
    setOpen(true);
  };

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

  // const isMobile = windowSize.width < 944;
  const isMobile = windowSize.width < 768;

  return (
    <>
      {isMobile ? (
        <>
          <Carousel prodId={product._id} />
          <Grid container className={classes.gridModifications} xs={12} sm={12}>
            <Grid container justify="space-between" xs={10} sm={11}>
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
                    <Typography className="pdp-direction">
                      DIRECTIONS
                    </Typography>
                    <Typography className="pdp-direction-description">
                      Take one soft gel daily with meal
                    </Typography>

                    {/* <ProductVariantType
                  isMobile={isMobile}
                  variantSlug={variantSlug}
                  updateTerminalVariant={updateTerminalVariant}
                /> */}
                    {!ATCEnabled && <Quantity />}
                  </CardContent>
                  {ATCEnabled && (
                    <Grid>
                      <CardActions className={classes.maxWidth}>
                        <Button
                          fullWidth
                          onClick={handleAddToCart}
                          disabled={selectedVariantSku === null}
                        >
                          ADD TO CART
                        </Button>
                      </CardActions>
                    </Grid>
                  )}

                  {/* Render this button when Product is out of stock */}
                  <Grid>
                    <CardActions className={classes.maxWidth}>
                      <Button
                        className={classes.btnOOS}
                        fullWidth
                        onClick={handleEmailPopup}
                      >
                        <MailOutline className={classes.icon} /> TELL ME WHEN
                        IT'S AVAILABLE
                      </Button>
                    </CardActions>
                    {open && (
                      <ProductPopUp
                        product_img={product.assets.img_front}
                        product_name={product.name}
                      />
                    )}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid container className={classes.gridModifications} xs={12} sm={12}>
          <Grid container justify="space-between" xs={10} sm={11}>
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

                  {/* <ProductVariantType
                  isMobile={isMobile}
                  variantSlug={variantSlug}
                  updateTerminalVariant={updateTerminalVariant}
                /> */}
                  {!ATCEnabled && <Quantity />}
                </CardContent>
                {ATCEnabled && (
                  <Grid>
                    <CardActions className={classes.maxWidth}>
                      <Button
                        fullWidth
                        onClick={handleAddToCart}
                        disabled={selectedVariantSku === null}
                      >
                        ADD TO CART
                      </Button>
                    </CardActions>
                  </Grid>
                )}

                {/* Render this button when Product is out of stock */}
                <Grid>
                  <CardActions className={classes.maxWidth}>
                    <Button
                      className={classes.btnOOS}
                      fullWidth
                      onClick={handleEmailPopup}
                    >
                      <MailOutline className={classes.icon} /> TELL ME WHEN IT'S
                      AVAILABLE
                    </Button>
                  </CardActions>
                  {open && (
                    <ProductPopUp
                      product_img={product.assets.img_front}
                      product_name={product.name}
                    />
                  )}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default withRouter(ProductDetail);
