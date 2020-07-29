import React, { useState, useContext, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import ProductContext from '../../contexts/ProductContext';
import { useQuantity, useWindowSize } from '../../hooks';
import { Dialog, MenuLink } from '../../components/common';
import LogoShort from '../../components/common/Icons/LogoShort/LogoShort';
import PDPSlider from '../../components/ProductSlider/PDPSlider';
import './overrides.css';
import { addToCart } from '../../modules/cart/functions';
import { getPrices, getVariantMap, getDefaultSkuByProduct } from '../../utils/product';
import { ATC, OutOfStockPDP } from '../../components/atcOutOfStock';
import ConfirmEmail from './ProductOutOfStockEmailConfirmed';
import ProductAccordion from './ProductAccordion';
import './PDP-style.scss';
import LoadingSpinner from '../../components/LoadingSpinner';
import { StyledContainer } from '../../assets/styles/StyledComponents';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    backgroundColor: '#fcf9f6',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
      paddingBottom: '22px'
    }
  },
  maxWidth: {
    maxWidth: '464px',
    justifyContent: 'center'
  },
  cardRootOverrides: {
    display: 'flex',
    flexDirection: 'column'
  },
  box: {
    backgroundColor: 'transparent'
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
  useEffect(() => {
    if (productVariant) {
      window.analytics.track('Product Viewed', {
        cart_id: localStorage.cartId,
        image_url: `https:${productVariant.assets.imgs}`,
        name: productVariant.name,
        price: Number.parseFloat(productVariant.effectivePrice),
        product_id: productVariant.product_id,
        quantity: 1,
        sku: productVariant.sku,
        url: window.location.href,
        variant: productVariant.id
      });
    }
  }, []);

  return productVariant ? (
    <Box display="flex" flexDirection="row" alignItems="flex-start" className="pdp-product-variant">
      <div className="pdp-price-description">
        {productVariant.variantInfo.size} {productVariant.variantInfo.prodType}
      </div>
    </Box>
  ) : null;
};

const ProductDetail = () => {
  const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const windowSize = useWindowSize();
  const contentRef = useRef();
  const atcRef = useRef();
  const dispatch = useDispatch();
  const [ATCEnabled] = useState(true);
  const [ATCAdded, setATCAdded] = useState(false);
  const [ATCAdding, setATCAdding] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [promiseModalOpen, setPromiseModalOpen] = useState(false);
  const [selectedVariantSku, setSelectedVariantSku] = useState(null);
  const [openOutOfStockDialog, setOpenOutOfStockDialog] = useState(false);
  const [openEmailConfirmation, setOpenEmailConfirmation] = useState(false);
  const { product, variants, prices, content } = useContext(ProductContext);
  const defaultSku = getDefaultSkuByProduct(product);
  const pricesMap = getPrices(prices);
  const variantMap = getVariantMap(product, variants, pricesMap);
  const variant = variantMap.get(selectedVariantSku);

  const updateQuantityToCart = useCallback(
    qty => {
      if (selectedVariantSku === null) return;

      addToCart(cart, variantMap.get(selectedVariantSku), qty);
      // enqueueSnackbar(message, { variant: 'success' });
    },
    [cart, selectedVariantSku, variantMap, dispatch]
  );

  const [quantity, Quantity] = useQuantity(
    // eslint-disable-line
    updateQuantityToCart,
    'QTY'
  );

  const handleAddToCart = useCallback(() => {
    setATCAdded(true);
    setATCAdding(true);
    setTimeout(() => {
      addToCart(cart, variantMap.get(selectedVariantSku), quantity);
      // enqueueSnackbar(message, { variant: 'success' });
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

  const openPromiseModal = () => setPromiseModalOpen(true);
  const closePromiseModal = () => setPromiseModalOpen(false);

  /* Out Of Stock email confirmation */
  const handleOpenEmailConfirmation = useCallback(() => {
    setOpenEmailConfirmation(true);
  }, [setOpenEmailConfirmation]);

  const closeEmailConfirmation = useCallback(() => {
    setOpenEmailConfirmation(false);
  }, [setOpenEmailConfirmation]);

  const handleWindowScroll = evt => {
    const OFFSET = 80;
    const scrollingElement = evt.target.scrollingElement || evt.target.document.scrollingElement;
    const { scrollTop } = scrollingElement;

    if (atcRef.current && contentRef.current) {
      if (
        scrollTop >
        OFFSET + contentRef.current.offsetTop + contentRef.current.offsetHeight - windowSize.height
      ) {
        atcRef.current.style.position = 'static';
        atcRef.current.style.boxShadow = 'none';
      } else {
        atcRef.current.style.position = 'fixed';
        atcRef.current.style.boxShadow = '0 0 8px 8px #ccc';
      }
    }
  };

  // Google Optimize
  const optimize = async () => {
    await window.dataLayer.push({ event: 'optimize.activate' });
  };
  useEffect(() => {
    if (window.dataLayer) {
      optimize();
    }
  }, [seconds]);

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  useEffect(() => {
    setSelectedVariantSku(defaultSku);
  }, [defaultSku]);

  useEffect(() => {
    // track seconds for products to load
    const interval = setInterval(() => {
      setSeconds(seconds + 0.5);
    }, 500);

    if (seconds === 7) {
      clearInterval(interval);
    }

    if (seconds === 7) {
      if (
        product === null ||
        variants.length === 0 ||
        typeof content === 'undefined' ||
        content == null ||
        selectedVariantSku == null
      ) {
        clearInterval(interval);
        alert('Something wrong just happened, please refresh your browser.'); // eslint-disable-line
      }
    }

    return () => clearInterval(interval);
  }, [seconds]);

  if (!product || !variants.length || !content || !selectedVariantSku) {
    return <LoadingSpinner loadingMessage="Loading product" page="pdp" />;
  }

  const {
    productImages,
    productTitle,
    shortPurposeHeadline,
    shortDescription,
    productBenefits = [],
    productColor
  } = content;

  return (
    <Box className={classes.root}>
      <StyledContainer>
        <Grid container xs={12} sm={12}>
          <Grid item xs={12} sm={8}>
            <PDPSlider images={productImages} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className={classes.box}>
              <CardContent className={classes.cardRootOverrides}>
                <Box className="pdp-content" ref={contentRef}>
                  <Typography variant="h1" className={`pdp-header ${productColor}`}>
                    {productTitle}
                  </Typography>
                  <ProductVariant productVariant={variantMap.get(selectedVariantSku)} />
                  <Box className="pdp-subtitle">{shortPurposeHeadline}</Box>
                  <Box className="pdp-description">{shortDescription}</Box>
                  <Box className="pdp-benefits">
                    {productBenefits.map((benefit, index) => (
                      <Box className="benefit" key={index.toString()}>
                        <Box className="icon">
                          <img src={benefit.fields.icon.fields.file.url} alt="" />
                        </Box>
                        <Box className="text">
                          <Box className={productColor}>{benefit.fields.benefitText}</Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Box className="pdp-accordion">
                    <ProductAccordion content={content} />
                  </Box>
                  {!ATCEnabled && <Quantity />}
                </Box>
              </CardContent>
              {ATCEnabled && variant && variant.inventory.quantityInStock >= 50 && (
                <CardActions className={classes.maxWidth}>
                  <Box className="pdp-atc-container" width={1}>
                    <Box className="atc-btn" ref={atcRef}>
                      <ATC
                        price={variantMap.get(selectedVariantSku).effectivePrice}
                        maxWidth={classes.maxWidth}
                        onClick={handleAddToCart}
                        variantSku={selectedVariantSku}
                        ATCAdded={ATCAdded}
                        ATCAdding={ATCAdding}
                        product_img={variant.assets.imgs}
                        product_name={variant.name}
                        product_color={product.color}
                      />
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <Box width={320}>
                        <Typography className="atc-note">
                          Our <MenuLink onClick={openPromiseModal}>Objective Promise</MenuLink>{' '}
                          ensures you’re making a risk-free purchase
                        </Typography>
                      </Box>
                    </Box>
                    <Dialog onClose={closePromiseModal} open={promiseModalOpen}>
                      <Box p={5}>
                        <Box className="promise-content">
                          <Box className="diamond">
                            <LogoShort />
                          </Box>
                          <Typography variant="h4" gutterBottom className="uppercase promise-title">
                            THE OBJECTIVE PROMISE
                          </Typography>
                          <Typography className="promise-description">
                            Behind every Objective supplement are studies, endless hours of research
                            and a team with over 50 years of combined experience formulating dietary
                            supplements. And the one thing we know for sure? Everybody&#39;s
                            different. Every body is different. It&#39;s possible that what works
                            wonders for your best friend might not do a thing for you. So let us
                            know and we&#39;ll refund your money. It&#39;s that simple.
                          </Typography>
                        </Box>
                      </Box>
                    </Dialog>
                  </Box>
                </CardActions>
              )}
              {variant && variant.inventory.quantityInStock < 50 && (
                <>
                  <OutOfStockPDP
                    maxWidth={classes.maxWidth}
                    onClick={handleOpenOutOfStockDialog}
                    onExited={closeOutOfStockDialog}
                    product_img={variant.assets.imgs}
                    product_name={variant.name}
                    product_color={product.color}
                    product_category={product.category}
                    product_id={product._id}
                    product_sku={product.sku}
                    product_variant={product.defaultVariantSku}
                    product_url={`/products/${product.slug}`}
                    openOutOfStockDialog={openOutOfStockDialog}
                    handleOpenEmailConfirmation={handleOpenEmailConfirmation}
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
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </StyledContainer>
    </Box>
  );
};

ProductVariant.propTypes = {
  productVariant: PropTypes.object.isRequired
};

export default withRouter(ProductDetail);
