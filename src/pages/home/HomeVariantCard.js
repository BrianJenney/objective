import React, { useCallback, useState, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { ATC, OutOfStock } from '../../components/atcOutOfStock';
import { addToCart } from '../../modules/cart/functions';
import ConfirmEmail from '../product/ProductOutOfStockEmailConfirmed';
import { Button, NavLink } from '../../components/common';
import './home-style.scss';

export const HomeVariantCard = ({ variant }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [ATCAdded, setATCAdded] = useState(false);
  const [ATCAdding, setATCAdding] = useState(false);
  const [openOutOfStockDialog, setOpenOutOfStockDialog] = useState(false);
  const [openEmailConfirmation, setOpenEmailConfirmation] = useState(false);
  const ref = createRef();
  const { name, effectivePrice, slug, variantInfo, assets } = variant;
  const handleAddToCart = useCallback(() => {
    setATCAdded(true);
    setATCAdding(true);
    setTimeout(() => {
      //Give effect of item being added
      addToCart(cart, variant, 1);
      setATCAdding(false);
      setTimeout(() => {
        setATCAdded(false);
      }, 500);
    }, 500);
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [cart, variant, dispatch, ref]);

  const handleOpenOutOfStockDialog = useCallback(() => {
    setOpenOutOfStockDialog(true);
  }, [setOpenOutOfStockDialog]);

  const closeOutOfStockDialog = useCallback(() => {
    setOpenOutOfStockDialog(false);
  }, [setOpenOutOfStockDialog]);

  const handleOpenEmailConfirmation = useCallback(() => {
    setOpenEmailConfirmation(true);
  }, [setOpenEmailConfirmation]);
  const closeEmailConfirmation = useCallback(() => {
    setOpenEmailConfirmation(false);
  }, [setOpenEmailConfirmation]);

  return (
    <Grid item xs={12} md={4}>
      <Card className="tile" ref={ref}>
        <NavLink to={`/products/${slug}`}>
          <CardMedia
            style={{ height: 430, width: '100%' }}
            image={assets.imgs}
            className="tile-img"
          />
        </NavLink>
        <NavLink to={`/products/${slug}`} underline="none">
          <CardContent className="pding">
            <div className="prod-name-holder">
              <Typography>
                <Link to={`/products/${slug}`} className="title">
                  {name}
                </Link>
              </Typography>
            </div>
            <div className="variant-info">
              <div>
                <strong>${parseFloat(effectivePrice).toFixed(2)}</strong>{' '}
                &mdash; {`${variantInfo.size} ${variantInfo.prodType}`}
              </div>
            </div>
          </CardContent>
        </NavLink>
        <div className="cta-area">
          {variant.inStock >= 200 && (
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
              <CardActions>
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
                  style={{ padding: '26px 10px !important' }}
                />
              </CardActions>

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
