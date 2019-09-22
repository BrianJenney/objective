import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { useQuantity, useWindowSize } from '../../hooks';
import { addToCart } from '../../modules/cart/functions';
import { Button } from '../../components/common';
import '../../assets/styles/_variables.scss';
import { setCartDrawerOpened } from '../../modules/cart/actions';
const localStorageClient = require('store');

const PriceVariantInfo = ({ variant }) => {
  return variant ? (
    <div>
      <strong>${variant.effectivePrice}</strong> / {variant.variantInfo.size}{' '}
      {variant.variantInfo.prodType}
    </div>
  ) : null;
};

const VariantCard = ({ variant, product }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  // const windowSize = useWindowSize();
  // const { enqueueSnackbar } = useSnackbar();
  const [ATCEnabled, setATCEnabled] = useState(true);
  // const message = <ATCSnackbarAction variant={variant} />;

  const updateQuantityToCart = useCallback(
    qty => {
      addToCart(localStorageClient.get('cartId'), cart, variant, qty);
      dispatch(setCartDrawerOpened(true));
      // enqueueSnackbar(message, { variant: 'success' });
    },
    [cart, variant, dispatch]
  );

  const [quantity, setQuantity, Quantity] = useQuantity(
    updateQuantityToCart,
    'QTY'
  );

  const handleAddToCart = useCallback(() => {
    addToCart(localStorageClient.get('cartId'), cart, variant, quantity);
    // enqueueSnackbar(message, { variant: 'success' });
    setATCEnabled(false);
    dispatch(setCartDrawerOpened(true));
  }, [cart, variant, quantity, dispatch]);

  return (
    <Card className="gallery-prod-card">
      <CardMedia
        style={{ height: 500, width: 324 }}
        image={variant.assets.imgs}
        title={variant.name}
        className="gallery-prod-img"
      />
      <CardContent className="pding">
        <div className="prod-name-holder">
          <Typography>
            <Link
              to={`/products/${product.slug}/${variant.slug}`}
              className="title"
            >
              {variant.name}
            </Link>
          </Typography>
        </div>
        <div className="variant-info">
          <PriceVariantInfo variant={variant} />
        </div>
      </CardContent>
      <div className="cta-area">
        <CardActions className="gallery-atc">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            fullWidth={true}
            className="atc-button"
          >
            ADD TO CART
          </Button>
        </CardActions>
        {/* Display Quantity Selector after clicking on Add To Cart button - disable for now */}
        {/* {ATCEnabled ? (
          <CardActions className="gallery-atc">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              fullWidth={true}
              className="atc-button"
            >
              ADD TO CART
            </Button>
          </CardActions>
        ) : null
        // <Quantity className="gallery-atc" />
        } */}
      </div>
    </Card>
  );
};

export default VariantCard;
