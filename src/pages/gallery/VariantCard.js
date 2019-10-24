import React, { useCallback, useState, createRef } from 'react';
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
import { Button, NavLink } from '../../components/common';
import '../../assets/styles/_variables.scss';
import { ATC, OutOfStock } from '../../components/atcOutOfStock';
import ConfirmEmail from '../product/ProductOutOfStockEmailConfirmed';
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

const VariantCard = ({ variant, styleMap }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const ref = createRef();
  // const windowSize = useWindowSize();
  // const { enqueueSnackbar } = useSnackbar();∆
  const [ATCEnabled] = useState(true);
  const [ATCAdded, setATCAdded] = useState(false);
  const [ATCAdding, setATCAdding] = useState(false);
  const [openOutOfStockDialog, setOpenOutOfStockDialog] = useState(false);
  // const message = <ATCSnackbarAction variant={variant} />;
  const [openEmailConfirmation, setOpenEmailConfirmation] = useState(false);

  const updateQuantityToCart = useCallback(
    qty => {
      addToCart(cart, variant, qty);
      // enqueueSnackbar(message, { variant: 'success' });
    },
    [cart, variant, dispatch]
  );
  const [quantity, Quantity] = useQuantity(updateQuantityToCart, 'QTY');

  const handleAddToCart = useCallback(() => {
    setATCAdded(true);
    setATCAdding(true);
    setTimeout(() => {
      //Give effect of item being added
      addToCart(cart, variant, quantity);

      setATCAdding(false);
      setTimeout(() => {
        setATCAdded(false);
      }, 500);
    }, 500);
    /*
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    */
  }, [cart, variant, quantity, dispatch]);

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

  return (
    <Card className="gallery-prod-card" ref={ref}>
      <NavLink to={`/products/${variant.slug}`} underline="none">
        <CardMedia
          style={{ height: 500, width: 324 }}
          image={variant.assets.imgs}
          title={variant.name}
          className="gallery-prod-img"
        />
      </NavLink>
      <CardContent className="pding">
        <NavLink to={`/products/${variant.slug}`} underline="none">
          <div className="prod-name-holder">
            <Typography>
              <span className="title" style={styleMap.text}>
                {variant.name}
              </span>
            </Typography>
          </div>
          <div className="variant-info">
            <PriceVariantInfo variant={variant} />
          </div>
        </NavLink>
      </CardContent>

      <div className="cta-area">
        {ATCEnabled && variant.inStock >= 200 && (
          <CardActions className="gallery-atc">
            <ATC
              onClick={handleAddToCart}
              variantSku={variant.sku}
              ATCAdded={ATCAdded}
              ATCAdding={ATCAdding}
              btnStyle="atc-button"
            />
          </CardActions>
        )}

        {variant.inStock < 200 && (
          <>
            <OutOfStock
              onClick={handleOpenOutOfStockDialog}
              onExited={closeOutOfStockDialog}
              product_img={variant.assets.imgs}
              product_name={variant.name}
              product_category={variant.category}
              product_id={variant._id}
              product_sku={variant.sku}
              product_variant={variant.defaultVariantSku}
              product_url={`/products/${variant.slug}`}
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
      </div>
    </Card>
  );
};

export default VariantCard;
