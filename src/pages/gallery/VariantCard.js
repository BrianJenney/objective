import React, { useCallback, useState,createRef } from 'react';
import { Link } from 'react-router-dom';
// import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { useQuantity } from '../../hooks';
import { addToCart } from '../../modules/cart/functions';
import { Button } from '../../components/common';
import '../../assets/styles/_variables.scss';
const localStorageClient = require('store');

const PriceVariantInfo = ({ variant }) => {
  return variant ? (
    <div>
      <strong>${variant.effectivePrice}</strong>&nbsp;&mdash;{' '}
      <span>
        {variant.variantInfo.size} {variant.variantInfo.prodType}
      </span>
    </div>
  ) : null;
};

const VariantCard = ({ variant, product, styleMap }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const ref = createRef();
  // const windowSize = useWindowSize();
  // const { enqueueSnackbar } = useSnackbar();
  const [ATCEnabled, setATCEnabled] = useState(true);
  const [ATCAdded, setATCAdded] = useState(false);
  const [ATCAdding, setATCAdding] = useState(false);
  // const message = <ATCSnackbarAction variant={variant} />;

  const updateQuantityToCart = useCallback(
    qty => {
      addToCart(cart, variant, qty);
      // enqueueSnackbar(message, { variant: 'success' });
    },
    [cart, variant, dispatch]
  );
  const [quantity, setQuantity, Quantity] = useQuantity(
    updateQuantityToCart,
    'QTY'
  );

  const handleAddToCart = useCallback(() => {
    setATCAdded(true);
    setATCAdding(true);
    setTimeout(() => {
      //Give effect of item being added

      addToCart(cart, variant, quantity);

      setATCAdding(false);
    }, 500);
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [cart, variant, quantity, dispatch]);

  return (
    <Card className="gallery-prod-card" ref={ref}>
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
              style={styleMap.text}
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
        {ATCEnabled ? (
          <CardActions className="gallery-atc">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              fullWidth={true}
              className="atc-button"
            >
              {!ATCAdded
                ? 'ADD TO CART'
                : !ATCAdding
                ? 'PRODUCT ADDED'
                : 'ADDING...'}
            </Button>
          </CardActions>
        ) : (
          <Quantity className="gallery-atc" />
        )}
      </div>
    </Card>
  );
};

export default VariantCard;
