import React, { useCallback, useState, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
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
import segmentProductClickEvent from '../../utils/product/segmentProductClickEvent';

const PriceVariantInfo = ({ variant }) =>
  variant ? (
    <div>
      ${variant.effectivePrice}&nbsp;&mdash;{' '}
      <span className="prodType">
        {variant.variantInfo.size} {variant.variantInfo.prodType}
      </span>
    </div>
  ) : null;

const BlogVariantCard = ({ product, variant, key }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const ref = createRef();

  const [ATCEnabled] = useState(true);
  const [ATCAdded, setATCAdded] = useState(false);
  const [ATCAdding, setATCAdding] = useState(false);
  const [openOutOfStockDialog, setOpenOutOfStockDialog] = useState(false);
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
      // Give effect of item being added
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

  /* Out Of Stock email confirmation */
  const handleOpenEmailConfirmation = useCallback(() => {
    setOpenEmailConfirmation(true);
  }, [setOpenEmailConfirmation]);
  const closeEmailConfirmation = useCallback(() => {
    setOpenEmailConfirmation(false);
  }, [setOpenEmailConfirmation]);
  let styleMap = {};

  if (variant.productCategory === 'skin') {
    styleMap = {
      container: {
        border: '1px solid #87331f'
      },
      text: {
        color: '#87331f'
      }
    };
  } else if (variant.productCategory === 'energy') {
    styleMap = {
      container: {
        border: '1px solid #1f396d'
      },
      text: {
        color: '#1f396d'
      }
    };
  } else {
    styleMap = {
      container: {
        border: '1px solid #003833'
      },
      text: {
        color: '#003833'
      }
    };
  }

  return (
    <Grid item xs={6} md={3}>
      <Card className="variant-card" style={styleMap.container} ref={ref}>
        <NavLink
          to={`/products/${variant.slug}`}
          underline="none"
          onClick={() => {
            segmentProductClickEvent({
              image_url: `https:${variant.assets.thumbnail}`,
              quantity: 1,
              sku: variant.sku,
              price: Number.parseFloat(variant.effectivePrice),
              product_id: variant.id,
              variant: variant.name,
              name: variant.name,
              brand: cart.storeCode,
              cart_id: cart._id,
              site_location: 'journal'
            });
          }}
        >
          <CardMedia
            image={variant.assets.imgs}
            title={variant.name}
            className="gallery-card"
          />
        </NavLink>
        <CardContent className="card-content">
          <NavLink
            to={`/products/${variant.slug}`}
            underline="none"
            onClick={() => {
              segmentProductClickEvent({
                image_url: `https:${variant.assets.thumbnail}`,
                quantity: 1,
                sku: variant.sku,
                price: Number.parseFloat(variant.effectivePrice),
                product_id: variant.id,
                variant: variant.name,
                name: variant.name,
                brand: cart.storeCode,
                cart_id: cart._id,
                site_location: 'gallery'
              });
            }}
          >
            <div>
              <Typography className="card" style={styleMap.text}>
                <span>{variant.name}</span>
              </Typography>
            </div>

            <div className="variant-info">
              <PriceVariantInfo variant={variant} />
            </div>
          </NavLink>
        </CardContent>

        <div>
          {ATCEnabled && variant.inStock >= 200 && (
            <CardActions className="card-button">
              <ATC
                onClick={handleAddToCart}
                variantSku={variant.sku}
                ATCAdded={ATCAdded}
                ATCAdding={ATCAdding}
                btnStyle="atc-btn"
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
    </Grid>
  );
};

export default BlogVariantCard;
