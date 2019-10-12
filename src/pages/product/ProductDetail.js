import React, { useState, useContext, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import ProductContext from '../../contexts/ProductContext';
import { useQuantity, useWindowSize } from '../../hooks';
import Carousel from '../../components/ProductSlider/PDPSlider';
import './overrides.css';
import { addToCart } from '../../modules/cart/functions';
import {
  getPrices,
  getVariantMap,
  getDefaultSkuByProduct
} from '../../utils/product';

import { ATC, OutOfStockPDP } from '../../components/atcOutOfStock';
import ConfirmEmail from './ProductOutOfStockEmailConfirmed';
import './PDP-style.css';
import LoadingSpinner from '../../components/LoadingSpinner';

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
    backgroundColor: '#fdfbf9'
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

let analyticsTracked = false;
const ProductVariant = ({ productVariant }) => {
  if (!analyticsTracked) {
    window.analytics.track("Product Viewed", {
      "cart_id": localStorage.cartId,
      "image_url": "https:"+productVariant.assets.imgs,
      "name": productVariant.name,
      "price": Number.parseFloat(productVariant.effectivePrice),
      "product_id": productVariant.product_id,
      "quantity": 1,
      "sku": productVariant.sku,
      "url": window.location.href,
      "variant": productVariant.id
    });
    analyticsTracked = true;
  }
  return productVariant ? (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      className="pdp-product-variant"
    >
      <div className="pdp-price">${productVariant.effectivePrice}</div>
      <div className="pdp-price-dash">&mdash;</div>
      <div className="pdp-price-description">
        {productVariant.variantInfo.size} {productVariant.variantInfo.prodType}
      </div>
    </Box>
  ) : null;
};

const ProductDetail = () => {
  const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { product, variants, prices, content } = useContext(ProductContext);
  // const { enqueueSnackbar } = useSnackbar();
  const [ATCEnabled, setATCEnabled] = useState(true);
  const [ATCAdded, setATCAdded] = useState(false);
  const [ATCAdding, setATCAdding] = useState(false);
  const [openOutOfStockDialog, setOpenOutOfStockDialog] = useState(false);
  const [openEmailConfirmation, setOpenEmailConfirmation] = useState(false);
  const windowSize = useWindowSize();

  const defaultSku = getDefaultSkuByProduct(product);
  const [selectedVariantSku, setSelectedVariantSku] = useState(null);
  const pricesMap = getPrices(prices);
  const variantMap = getVariantMap(product, variants, pricesMap);

  // const message = (<ATCSnackbarAction variant={variantMap.get(selectedVariantSku)} />);

  const updateQuantityToCart = useCallback(
    qty => {
      if (selectedVariantSku === null) return;

      addToCart(cart, variantMap.get(selectedVariantSku), qty);
      // enqueueSnackbar(message, { variant: 'success' });
    },
    [cart, selectedVariantSku, variantMap, dispatch]
  );
  const [quantity, setQuantity, Quantity] = useQuantity(
    updateQuantityToCart,
    'QTY'
  );

  const handleAddToCart = useCallback(() => {
    setATCAdded(true);
    setATCAdding(true);
    setTimeout(() => {
      addToCart(cart, variantMap.get(selectedVariantSku), quantity);
      // enqueueSnackbar(message, { variant: 'success' });
      // setATCEnabled(false);
      setATCAdding(false);
      setTimeout(() => {
        setATCAdded(false);
      }, 500);
    }, 500);
  }, [cart, selectedVariantSku, variantMap, quantity, dispatch]);

  const handleOpenOutOfStockDialog = useCallback(() => {
    setOpenOutOfStockDialog(true);
  }, [setOpenOutOfStockDialog]);

  const closeOutOfStockDialog = useCallback(() => {
    setOpenOutOfStockDialog(false);
  }, [setOpenOutOfStockDialog]);

  /*Out Of Stock email confirmation */
  const handleOpenEmailConfirmation = useCallback(() => {
    setOpenEmailConfirmation(true);
  }, [setOpenEmailConfirmation]);

  const closeEmailConfirmation = useCallback(() => {
    setOpenEmailConfirmation(false);
  }, [setOpenEmailConfirmation]);

  useEffect(() => {
    setSelectedVariantSku(defaultSku);
  }, [defaultSku]);

  if (
    product === null ||
    variants.length === 0 ||
    typeof content === 'undefined' ||
    content == null ||
    selectedVariantSku == null
  )
    return <LoadingSpinner loadingMessage="Loading product" />;

  // const isMobile = windowSize.width < 944;
  const isMobile = windowSize.width < 768;

  const variant = variantMap.get(selectedVariantSku);

  return (
    <>
      {isMobile ? (
        <>
          <Carousel images={content.productImages} />
          <Grid container className="mobile-grid-modifications" xs={12} sm={12}>
            <Grid container justify="space-between">
              <Grid item xs={12} sm={5}>
                <Card className={classes.box}>
                  <CardContent
                    className={classes.cardRootOverrides}
                    className="pdp-content"
                  >
                    <div className="mobile-padding">
                      <h1
                        className="pdp-header"
                        style={{ color: product.color }}
                      >
                        {content.productTitle}
                      </h1>
                      <ProductVariant
                        productVariant={variantMap.get(selectedVariantSku)}
                      />
                    </div>
                    <div className="pdp-subtitle">
                      {content.shortPurposeHeadline}
                    </div>
                    <div className="mobile-padding">
                      <Typography className="pdp-description">
                        {content.shortDescription}
                      </Typography>
                      <Typography className="pdp-direction">
                        DIRECTIONS
                      </Typography>
                      <Typography className="pdp-direction-description">
                        {content.shortDirections}
                      </Typography>
                    </div>
                    {/* <ProductVariantType
                  isMobile={isMobile}
                  variantSlug={variantSlug}
                  updateTerminalVariant={updateTerminalVariant}
                /> */}
                    {!ATCEnabled && <Quantity />}
                  </CardContent>
                  {/* ATC component */}
                  {ATCEnabled && variant.inventory.quantityInStock > 0 && (
                    <Grid className="mobile-padding-small">
                      <CardActions className={classes.maxWidth}>
                        <ATC
                          maxWidth={classes.maxWidth}
                          onClick={handleAddToCart}
                          variantSku={selectedVariantSku}
                          ATCAdded={ATCAdded}
                          ATCAdding={ATCAdding}
                        />
                      </CardActions>
                    </Grid>
                  )}
                  {/* Out of stock component */}
                  {variant.inventory.quantityInStock < 1 && (
                    <Grid>
                      <OutOfStockPDP
                        maxWidth={classes.maxWidth}
                        onClick={handleOpenOutOfStockDialog}
                        onExited={closeOutOfStockDialog}
                        product_img={product.assets.img_front}
                        product_name={product.name}
                        openOutOfStockDialog={openOutOfStockDialog}
                        handleOpenEmailConfirmation={
                          handleOpenEmailConfirmation
                        }
                      />

                      {openEmailConfirmation && (
                        <ConfirmEmail
                          onExited={closeEmailConfirmation}
                          product_img={variant.assets.imgs}
                          product_name={variant.name}
                        />
                      )}
                    </Grid>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <div className={classes.gridModifications}>
          <Container>
            <Grid container xs={12} sm={12}>
              <Grid container spacing={5} xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <Carousel images={content.productImages} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card className={classes.box}>
                    <CardContent
                      className={classes.cardRootOverrides}
                      className="pdp-content"
                    >
                      <h1
                        className="pdp-header"
                        style={{ color: product.color }}
                      >
                        {content.productTitle}
                      </h1>
                      <ProductVariant
                        productVariant={variantMap.get(selectedVariantSku)}
                      />
                      <div className="pdp-subtitle">
                        {content.shortPurposeHeadline}
                      </div>
                      <Typography className="pdp-description">
                        {content.shortDescription}
                      </Typography>
                      <Typography className="pdp-direction">
                        DIRECTIONS
                      </Typography>
                      <Typography className="pdp-direction-description">
                        {content.shortDirections}
                      </Typography>

                      {/* <ProductVariantType
                  isMobile={isMobile}
                  variantSlug={variantSlug}
                  updateTerminalVariant={updateTerminalVariant}
                /> */}
                      {!ATCEnabled && <Quantity />}
                    </CardContent>
                    {ATCEnabled && variant.inventory.quantityInStock > 0 && (
                      <Grid>
                        <CardActions className={classes.maxWidth}>
                          <ATC
                            maxWidth={classes.maxWidth}
                            onClick={handleAddToCart}
                            variantSku={selectedVariantSku}
                            ATCAdded={ATCAdded}
                            ATCAdding={ATCAdding}
                          />
                        </CardActions>
                      </Grid>
                    )}
                    {variant.inventory.quantityInStock < 1 && (
                      <Grid>
                        <OutOfStockPDP
                          maxWidth={classes.maxWidth}
                          onClick={handleOpenOutOfStockDialog}
                          onExited={closeOutOfStockDialog}
                          product_img={product.assets.img_front}
                          product_name={product.name}
                          product_category={product.category}
                          product_id={product._id}
                          product_sku={product.sku}
                          product_variant={product.defaultVariantSku}
                          product_url={`/products/${product.slug}`}
                          openOutOfStockDialog={openOutOfStockDialog}
                          handleOpenEmailConfirmation={
                            handleOpenEmailConfirmation
                          }
                        />

                        {openEmailConfirmation && (
                          <ConfirmEmail
                            onExited={closeEmailConfirmation}
                            product_img={variant.assets.imgs}
                            product_name={variant.name}
                            product_category={variant.category}
                            product_id={variant._id}
                            product_sku={variant.sku}
                            product_variant={variant.defaultVariantSku}
                            product_url={`/products/${variant.slug}`}
                          />
                        )}
                      </Grid>
                    )}
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
};

export default withRouter(ProductDetail);
