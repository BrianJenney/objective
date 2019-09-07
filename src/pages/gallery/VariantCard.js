import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { CardActions, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useQuantity, useWindowSize } from '../../hooks';
import { useSnackbar } from 'notistack';
import { addToCart } from '../../utils/cart';
import ATCSnackbarAction from "../../components/common/ATCSnackbarAction";

const localStorageClient = require('store');

const PriceVariantInfo = ({ variant }) => {
  return variant ? (
    <Typography variant="body1">
      <strong>${variant.effectivePrice}</strong> / {variant.variantInfo.size}{' '}
      {variant.variantInfo.prodType}
    </Typography>
  ) : null;
};

const VariantCard = ({ variant, product }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const { enqueueSnackbar } = useSnackbar();
  const [ATCEnabled, setATCEnabled] = useState(true);
  const message = <ATCSnackbarAction variant={variant} />

  const updateQuantityToCart = useCallback(qty => {
      addToCart(localStorageClient.get('cartId'), cart, variant, qty, dispatch);
      enqueueSnackbar(message, { variant: 'success' });
    },
    [cart, variant, message, dispatch, enqueueSnackbar]
  );
  const [quantity, setQuantity, Quantity] = useQuantity(updateQuantityToCart, 'QTY');

  const handleAddToCart = useCallback(() => {
    addToCart(localStorageClient.get('cartId'), cart, variant, quantity, dispatch);
    enqueueSnackbar(message, {variant: 'success'});
    setATCEnabled(false);
  }, [cart, variant, message, quantity, enqueueSnackbar, dispatch]);

  return (
    <Card>
      <CardMedia
        style={{ height: 355, width: 200, margin: '10px 90px' }}
        image={variant.assets.imgs}
        title={variant.name}
      />
      <CardContent>
        <Typography variant="body1">
          <Link to={`/products/${product.slug}/${variant.slug}`}>
            {variant.name}
          </Link>
        </Typography>
        <PriceVariantInfo variant={variant} />
        {!ATCEnabled && <Quantity />}
      </CardContent>
      {ATCEnabled && (
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            ADD TO CART
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default VariantCard;
