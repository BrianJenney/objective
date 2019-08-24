import React, { useState, useContext, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import ProductContext from '../../contexts/ProductContext';
import { spacing } from '@material-ui/system';
import { Box, Typography, Card, CardContent, CardActions, Button, Grid, Divider, Select, MenuItem } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useQuantity, useWindowSize } from '../../hooks';
import { requestPatchCart } from '../../modules/cart/actions';
import Carousel from '../../components/ProductSlider/PDPSlider';
import './overrides.css'

const localStorageClient = require('store');

const calculateCartTotal = cartItems => cartItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);

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
  dropdown: {
    width: '100%',
    minWidth: '180px',
    maxWidth: '220px',
    paddingLeft: '0 !important',
    border: '1px solid',
    height: '52px',
    fontFamily: 'p22-underground, Helvetica, sans-serif',
  },
  overridePadding: {
    padding: '0 0 0 12px !important',
    width: '59%',
  },
  rightPadding: {
    paddingRight: '0 !important',
    maxWidth: '130px !important'
  },
  productType: {
    fontSize: '.9rem',
    padding: 0,
    lineHeight: '.7rem',
    marginTop: theme.spacing(1),
    minWidth: '110px !important',
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
}))(Button)

const ProductVariant = ({ productVariant }) => {
  const classes = useStyles();
  return productVariant ? (<Typography className={classes.variant} variant="h5"><strong>${productVariant.price.$numberDecimal}</strong> / {productVariant.attributes[0].size} {productVariant.attributes[0].type}</Typography>
  ) : null;
};

const ProductDetail = ({ history }) => {
  const capsuleMax = 60;

  const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [productType, setProductType] = useState(null);
  const { product, variants } = useContext(ProductContext);
  const windowSize = useWindowSize();
  const [quantity, setQuantity, Quantity] = useQuantity('QTY');
  const { enqueueSnackbar } = useSnackbar();
  const selectedProductVariant = productType ? variants[productType] : null;

  const ProductType = ({ isMobile, options }) => {
    const handleChange = useCallback((event) => {
      setProductType(event.target.value)
    }, []);
    return (
      <Grid container direction={isMobile ? "column" : "row "} spacing={3} className="someClass">
        <Grid item xs={12} sm={4} lg={3} alignItems="flex-start" className={classes.rightPadding}>
          <Typography className={classes.productType} variant="h6">PRODUCT TYPE</Typography>
        </Grid>
        <Grid item xs={12} sm={7} className={classes.overridePadding} justify={isMobile ? "flex-end" : "flex-start"}>
          <Select
            className={classes.dropdown}
            value={productType}
            onChange={handleChange}
          >
            {options.map(option => (
              <MenuItem className={classes.menuItem} key={option.key} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    );
  };

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
        product_img: product.assets.imgs,
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
    setQuantity(1);
    setProductType(null);
    // history.push('/cart');
  }, [product, selectedProductVariant, quantity, enqueueSnackbar]);

  if (!product) {
    return null;
  }

  const isMobile = windowSize.width < 944;
  const dropdownType = product.attributes[0].value;
  const productTypeOptions = variants.filter(variant => variant.attributes[0].name === dropdownType)
    .map((variant, index) => {
      const dropdownValue = variant.attributes[0].value;
      return {
        key: variant._id,
        label: `${dropdownValue}`,
        value: String(index)
      }
    });

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
                  <ProductVariant productVariant={selectedProductVariant} />
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
                <br />
                <ProductType isMobile={isMobile} options={productTypeOptions} />
                <br />
                <br />
                <Quantity />
              </CardContent>
              <br />

              <Grid container xs={12} justify="left-start" alignItems="center">
                <CardActions className={classes.maxWidth}>
                  <StyledButton className={classes.resetButtonPadding} fullWidth={isMobile} variant="contained" color="primary" onClick={handleAddToCart} disabled={productType == null}>
                    ADD TO CART
              </StyledButton>
                </CardActions>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );

};

export default withRouter(ProductDetail);
