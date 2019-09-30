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
import { Button } from '../../components/common';
import './overrides.css';
import { addToCart } from '../../modules/cart/functions';
import {
  getPrices,
  getVariantSkuBySlug,
  getVariantMap
} from '../../utils/product';
import './PDP-style.css';
import { setCartDrawerOpened } from '../../modules/cart/actions';

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

const ProductVariant = ({ productVariant }) => {
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

const ProductDetail = ({ variantSlug }) => {
  const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { product, variants, prices, content } = useContext(ProductContext);
  // const { enqueueSnackbar } = useSnackbar();
  const [ATCEnabled, setATCEnabled] = useState(true);
  const [ATCAdded, setATCAdded ] = useState(false);
  const [ATCAdding, setATCAdding] = useState(false);
  const [open, setOpen] = useState(false);

  const windowSize = useWindowSize();
  // const [selectedProductVariant, setSelectedProductVariant] = useState(getVariantByVariantSlug(variants, pricesMap, variantSlug));
  const defaultSku = getVariantSkuBySlug(variants, variantSlug);
  const [selectedVariantSku, setSelectedVariantSku] = useState(null);
  const pricesMap = getPrices(prices);
  const variantMap = getVariantMap(variants, pricesMap);

  // const message = (<ATCSnackbarAction variant={variantMap.get(selectedVariantSku)} />);

  const updateQuantityToCart = useCallback(
    qty => {
      if (selectedVariantSku === null) return;
      addToCart(
        localStorageClient.get('cartId'),
        cart,
        variantMap.get(selectedVariantSku),
        qty
      );
      dispatch(setCartDrawerOpened(true));
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
    setTimeout(()=>{
      addToCart(
        localStorageClient.get('cartId'),
        cart,
        variantMap.get(selectedVariantSku),
        quantity
      );
      // enqueueSnackbar(message, { variant: 'success' });
      // setATCEnabled(false);
      setATCAdding(false);
      dispatch(setCartDrawerOpened(true));
    }, 500);
  }, [cart, selectedVariantSku, variantMap, quantity, dispatch]);


  useEffect(() => {
    setSelectedVariantSku(defaultSku);
  }, [defaultSku]);

  if (
    product === null ||
    variants.length === 0 ||
    typeof content === 'undefined' ||
    content == null
  )
    return null;

  // const isMobile = windowSize.width < 944;
  const isMobile = windowSize.width < 768;

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
                      <h1 className="pdp-header">{content.productTitle}</h1>
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
                  {ATCEnabled && (
                    <Grid className="mobile-padding-small">
                      <CardActions className={classes.maxWidth}>
                        <Button
                          fullWidth
                          onClick={handleAddToCart}
                          disabled={selectedVariantSku === null}
                        >
                          {!ATCAdded ? 'ADD TO CART' : (!ATCAdding ? 'PRODUCT ADDED' : 'ADDING...')}
                        </Button>
                      </CardActions>
                    </Grid>
                  )}

                  {/* Render this button when Product is out of stock hiding for now */}
                  {/* <Grid>
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
                  </Grid> */}
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
                      <h1 className="pdp-header">{content.productTitle}</h1>
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
                    {ATCEnabled && (
                      <Grid>
                        <CardActions className={classes.maxWidth}>
                          <Button
                            fullWidth
                            onClick={handleAddToCart}
                            disabled={selectedVariantSku === null}
                          >
                            {!ATCAdded ? 'ADD TO CART' : (!ATCAdding ? 'PRODUCT ADDED' : 'ADDING...')}
                          </Button>
                        </CardActions>
                      </Grid>
                    )}

                    {/* Render this button when Product is out of stock hiding for now */}
                    {/* <Grid>
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
                </Grid> */}
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
