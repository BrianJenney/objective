import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef
} from 'react';
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
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import ProductContext from '../../contexts/ProductContext';
import { useQuantity, useWindowSize } from '../../hooks';
import { Panel } from '../../components/common';
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
import {
  ShippingRestrictionMobile,
  ShippingRestriction
} from './ShippingRestrictions';
import ShippingRestrictionsDialog from './ShippingRestrictionsDialog';
import './PDP-style.scss';
import LoadingSpinner from '../../components/LoadingSpinner';

const plusIcon = require('../../assets/images/plus_symbol.svg');
const closeIcon = require('../../assets/images/close_symbol.svg');

const useStyles = makeStyles(theme => ({
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
  gridModifications: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
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

const contentfulOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      let params = '?w=555&fm=jpg&q=50';

      if (window.screen.width < 768) {
        params = '?w=450&fm=jpg&q=50';
      }

      return (
        <img
          src={node.data.target.fields.file.url + params}
          alt={node.data.target.fields.title}
        />
      );
    }
  }
};

let analyticsTracked = false;
const ProductVariant = ({ productVariant }) => {
  if (!analyticsTracked) {
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
    analyticsTracked = true;
  }
  return productVariant ? (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      className="pdp-product-variant"
    >
      <div className="pdp-price-description">
        {productVariant.variantInfo.size} {productVariant.variantInfo.prodType}
      </div>
    </Box>
  ) : null;
};

const ProductAccordion = ({ content }) => {
  const accordionItems = [
    {
      title: 'Clinical Results',
      className: 'clinical-results',
      content: documentToReactComponents(
        content.clinicalResults,
        contentfulOptions
      )
    },
    {
      title: 'Ingredients',
      className: 'ingredients',
      content: documentToReactComponents(content.ingredients, contentfulOptions)
    },
    {
      title: 'Directions',
      className: 'directions',
      content: (
        <>
          <div className="summary">{content.directions.summary}</div>
          <div className="details">
            <div className="entry">
              <div className="icon">
                <img src={content.directions.details[0].icon} alt="" />
              </div>
              <div className="text">{content.directions.details[0].label}</div>
            </div>
            <div className="entry">
              <div className="icon">
                <img src={content.directions.details[1].icon} alt="" />
              </div>
              <div className="text">{content.directions.details[1].label}</div>
            </div>
          </div>
        </>
      )
    },
    {
      title: 'Frequently Asked Questions',
      className: 'faqs',
      content: documentToReactComponents(
        content.frequentlyAskedQuestions,
        contentfulOptions
      )
    },
    {
      title: 'Supplement Facts',
      className: 'supplement-facts',
      content: (
        <>
          <div className="ingredients">
            {content.supplementFactsIngredientsParagraph ? (
              <div className="ingredients-pg">
                {content.supplementFactsIngredientsParagraph}
              </div>
            ) : (
              <table cellPadding="0" cellSpacing="0">
                <thead>
                  <tr>
                    <th>Each serving contains</th>
                    <th width="87px">Amount</th>
                    <th width="90px">% Daily Value</th>
                  </tr>
                </thead>
                <tbody>
                  {content.supplementFactsIngredients.map(
                    (ingredient, index) => (
                      <tr key={`tr_${index.toString()}`}>
                        <td>{ingredient.ingredient}</td>
                        <td>{ingredient.amount}</td>
                        <td>{ingredient.dailyValue}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div className="notes">
            {documentToReactComponents(
              content.supplementFactsNotes,
              contentfulOptions
            )}
          </div>
          <div className="other-ingredients">
            {documentToReactComponents(
              content.supplementFactsOtherIngredients1,
              contentfulOptions
            )}
          </div>
          <div className="important">
            {documentToReactComponents(
              content.supplementFactsImportant1,
              contentfulOptions
            )}
          </div>
        </>
      )
    }
  ];

  return (
    <>
      {accordionItems.map((accordionItem, index) => (
        <Panel
          key={`accordion_item_${index.toString()}`}
          title={
            <div className="expansion-panel-title">
              <div className="title-text">{accordionItem.title}</div>
              <div className="plus-icon">
                <img src={plusIcon} alt="" />
              </div>
              <div className="close-icon">
                <img src={closeIcon} alt="" />
              </div>
            </div>
          }
          collapsible
          hideExpandIcon
        >
          <div className={accordionItem.className}>{accordionItem.content}</div>
        </Panel>
      ))}
    </>
  );
};

const ProductDetail = () => {
  const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const atcRef = useRef();
  const dispatch = useDispatch();
  const { product, variants, prices, content } = useContext(ProductContext);
  // const { enqueueSnackbar } = useSnackbar();
  const [ATCEnabled, setATCEnabled] = useState(true);
  const [ATCAdded, setATCAdded] = useState(false);
  const [ATCAdding, setATCAdding] = useState(false);
  const [openOutOfStockDialog, setOpenOutOfStockDialog] = useState(false);
  const [openEmailConfirmation, setOpenEmailConfirmation] = useState(false);
  const [openShippingRestrictions, setOpenShippingRestrictions] = useState(
    false
  );
  const windowSize = useWindowSize();
  const defaultSku = getDefaultSkuByProduct(product);
  const [selectedVariantSku, setSelectedVariantSku] = useState(null);
  const pricesMap = getPrices(prices);
  const variantMap = getVariantMap(product, variants, pricesMap);
  const [seconds, setSeconds] = useState(0);
  const [prodLoaded, setProdLoaded] = useState(false);
  // const message = (<ATCSnackbarAction variant={variantMap.get(selectedVariantSku)} />);
  const handleWindowScroll = evt => {
    const { scrollTop } = evt.target.scrollingElement;
    if (atcRef.current) {
      if (scrollTop > 530) {
        atcRef.current.style.position = 'static';
      } else {
        atcRef.current.style.position = 'fixed';
      }
    }
  };
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

  /* Out Of Stock email confirmation */
  const handleOpenEmailConfirmation = useCallback(() => {
    setOpenEmailConfirmation(true);
  }, [setOpenEmailConfirmation]);

  const closeEmailConfirmation = useCallback(() => {
    setOpenEmailConfirmation(false);
  }, [setOpenEmailConfirmation]);

  /* Shipping Restrictions */
  const handleShippingRestrictions = useCallback(
    e => {
      e.preventDefault();
      setOpenShippingRestrictions(true);
    },
    [setOpenShippingRestrictions]
  );

  const closeShippingRestrictions = useCallback(() => {
    setOpenShippingRestrictions(false);
  }, [setOpenShippingRestrictions]);

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
        alert(
          'Something wrong just happened, please refresh your browser and try again'
        );
      }
    }

    return () => clearInterval(interval);
  }, [seconds]);

  if (
    product === null ||
    variants.length === 0 ||
    typeof content === 'undefined' ||
    content == null ||
    selectedVariantSku == null
  )
    return <LoadingSpinner loadingMessage="Loading product" page="pdp" />;

  // const isMobile = windowSize.width < 944;
  const isMobile = windowSize.width < 768;

  const variant = variantMap.get(selectedVariantSku);

  const restrictedStates = variant.restrictions
    ? variant.restrictions[variant.restrictions.definitions].label
    : [];

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
                  {ATCEnabled && variant.inventory.quantityInStock >= 200 && (
                    <Grid className="mobile-padding-small">
                      <CardActions className={classes.maxWidth}>
                        <ATC
                          price={
                            variantMap.get(selectedVariantSku).effectivePrice
                          }
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
                  {variant.inventory.quantityInStock < 200 && (
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
                  {variant.restrictions && (
                    <ShippingRestrictionMobile
                      onClick={handleShippingRestrictions}
                    />
                  )}
                  {openShippingRestrictions && (
                    <ShippingRestrictionsDialog
                      product_name={variant.name}
                      restrictedStates={restrictedStates}
                      onExited={closeShippingRestrictions}
                    />
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
              <Grid container xs={12} sm={12}>
                <Grid item xs={12} sm={8}>
                  <Carousel images={content.productImages} />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                      <div className="pdp-description">
                        {content.shortDescription}
                      </div>
                      <div className="pdp-benefits">
                        {content.productBenefits.map((benefit, index) => (
                          <div className="benefit" key={index.toString()}>
                            <div className="icon">
                              <img
                                src={benefit.fields.icon.fields.file.url}
                                alt=""
                              />
                            </div>
                            <div className="text">
                              <span>{benefit.fields.benefitText}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pdp-accordion">
                        <ProductAccordion content={content} />
                      </div>
                      {!ATCEnabled && <Quantity />}
                    </CardContent>
                    {ATCEnabled && variant.inventory.quantityInStock >= 200 && (
                      <CardActions className={classes.maxWidth}>
                        <div className="pdp-atc-container" ref={atcRef}>
                          <ATC
                            price={
                              variantMap.get(selectedVariantSku).effectivePrice
                            }
                            maxWidth={classes.maxWidth}
                            onClick={handleAddToCart}
                            variantSku={selectedVariantSku}
                            ATCAdded={ATCAdded}
                            ATCAdding={ATCAdding}
                          />
                          {variant.restrictions && (
                            <ShippingRestriction
                              onClick={handleShippingRestrictions}
                            />
                          )}
                        </div>
                      </CardActions>
                    )}
                    {variant.inventory.quantityInStock < 200 && (
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
                    {openShippingRestrictions && (
                      <ShippingRestrictionsDialog
                        product_name={variant.name}
                        restrictedStates={restrictedStates}
                        onExited={closeShippingRestrictions}
                      />
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
