import React, { useState, useContext, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import ProductContext from '../../contexts/ProductContext';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useQuantity, useWindowSize } from '../../hooks';
import { requestPatchCart } from '../../modules/cart/actions';
import Carousel from '../../components/ProductSlider/PDPSlider';
import './overrides.css'

const localStorageClient = require('store');

const calculateCartTotal = cartItems => cartItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);

const useStyles = makeStyles(theme => ({
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
    marginLeft: '18%',
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
    padding: '60px 81px',
    backgroundColor: '#fdf8f2'
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
    width: '220px',
    paddingLeft: '14px',
    border: '1px solid',
    height: '52px',
    fontFamily: 'p22-underground, Helvetica, sans-serif',
  },
  overridePadding: {
    padding: '0 !important'
  },
  productType: {
    fontSize: '.9rem',
    padding: 0,
    lineHeight: '.7rem',
    marginBottom: theme.spacing(1),
  },
  selfAlignment: {
      alignSelf: 'flex-end',
  },
}));

const StyledButton = withStyles(theme => ({
  root: {
    backgroundColor: '#000000',
    borderRadius: 0,
    border: 0,
    color: 'white',
    width: '100%',
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

const ProductVariant = ({ productVariant, max }) => {
    const classes = useStyles();
  return productVariant ? (<Typography className={classes.variant} variant="h5"><strong>${productVariant.price.$numberDecimal}</strong> / {max} Veggie Capsules</Typography>
  ) : null;
};

const ProductDetail = ({ history }) => {
  const capsuleMax = 60;

  const classes = useStyles();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [ productType, setProductType] = useState(null);
  const { product, variants } = useContext(ProductContext);
  const windowSize = useWindowSize();
  const [quantity, setQuantity, Quantity] = useQuantity('QTY');
  const { enqueueSnackbar } = useSnackbar();
  const selectedProductVariant = productType ? variants[productType] : null;

  const ProductType = ({isMobile, options}) => {
    const handleChange = useCallback((event) => {
      setProductType(event.target.value)
    },[]);
    return (
      <Grid container direction={isMobile ? "column" : "row "} spacing={3}>
        <Grid item className={classes.selfAlignment}>
          <Typography className={classes.productType} variant="h6">PRODUCT TYPE</Typography>
        </Grid>
        <Grid item className={classes.overridePadding}>
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

  const isMobile = windowSize.width < 600;
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
        <Grid container className={classes.gridModifications}>
          <Grid item xs={12} sm={6}>
            <Carousel prodId={product._id} />
          </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.box}>
            <CardContent className={classes.cardRootOverrides}>
              <Box>
                <Typography className={classes.title} variant="h1">{product.name}</Typography>
                <ProductVariant productVariant={selectedProductVariant} max={capsuleMax}/>
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
              <ProductType isMobile={isMobile} options={productTypeOptions}/>
              <br />
              <br />
              {!isMobile && <Quantity />}
            </CardContent>
                          <br />
            <CardActions>
              <StyledButton className={classes.resetButtonPadding} fullWidth={isMobile} variant="contained" color="primary" onClick={handleAddToCart} disabled={productType == null}>
                ADD TO CART
              </StyledButton>
            </CardActions>
            </Card>
          </Grid>
      </Grid>
    </>
  );

};

export default withRouter(ProductDetail);
