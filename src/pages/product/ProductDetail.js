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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { useQuantity, useWindowSize } from '../../hooks';

import { requestPatchCart } from '../../modules/cart/actions';
import Carousel from '../../components/ProductSlider/PDPSlider';

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

const ProductVariant = ({ productVariant, max }) => {
  return productVariant ? (<Typography variant="body1"><strong>${productVariant.price.$numberDecimal}</strong> / {max} Veggie Capsules</Typography>
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
        <Grid item >
          <Typography variant="body1">PRODUCT TYPE</Typography>
        </Grid>
        <Grid item>
          <Select
            value={productType}
            onChange={handleChange}
          >
            {options.map(option => (
              <MenuItem key={option.key} value={option.value}>{option.label}</MenuItem>
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
    <Container>
      <Card >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Carousel prodId={product._id} />
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
              <ProductVariant productVariant={selectedProductVariant} max={capsuleMax}/>
              <br />
              <Typography component="p" color="textSecondary" variant="body1">{product.description}</Typography>
              <br />
              <Typography variant="body1">DIRECTIONS</Typography>
              <Typography variant="body2">Take one soft gel daily with meal</Typography>
              <br/>
              <ProductType isMobile={isMobile} options={productTypeOptions}/>
              <br />
              {!isMobile && <Quantity />}
            </CardContent>
            <CardActions>
              <Button fullWidth={isMobile} variant="contained" color="primary" onClick={handleAddToCart} disabled={productType == null}>
                ADD TO CART
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );

};

export default withRouter(ProductDetail);
