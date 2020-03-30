import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { NavLink } from '../../../components/common';
import { addCoupon, addToCart } from '../../../modules/cart/functions';

import './template-styles.scss';

const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.desktopStyle.bgColor,
    display: props.desktopStyle.display,
    float: props.desktopStyle.float,
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    lineHeight: props.desktopStyle.lineHeight,
    fontFamily: props.desktopStyle.fontFamily,
    textTransform: props.desktopStyle.textTransform,
    width: props.desktopStyle.width,
    height: props.desktopStyle.height,
    letterSpacing: 1.33,
    [theme.breakpoints.down('sm')]: {
      display: props.mobileStyle.display,
      width: props.mobileStyle.width
    }
  })
}));

const SPButton = ({ data, template, type, align }) => {
  const classes = useStyles(data);
  const [prodAdded, setProdAdded] = useState(false);
  const [couponAdded, setCouponAdded] = useState(false);
  const products = useSelector(state => state.catalog.variants);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  console.log('testing-button', data, type, align);
  const handleClick = useCallback(() => {
    if (cart && products) {
      handleAddToCart();
    }
  }, [cart, products, dispatch]);

  const handleAddToCart = useCallback(() => {
    setTimeout(() => {
      if (data.skuAndQty.length === 1) {
        const [sku, qty] = data.skuAndQty[0].split(';');
        addToCart(
          cart,
          products.find(p => p.sku === sku),
          qty
        );
      }
      setProdAdded(true);
    }, 500);
  }, [cart, dispatch]);

  const handleAddCoupon = useCallback(() => {
    setTimeout(() => {
      addCoupon(cart._id, data.coupon);
      setCouponAdded(true);
    }, 500);
  }, [cart, products, dispatch]);

  useEffect(() => {
    if (data.coupon && cart.items.length > 0 && couponAdded === false) {
      handleAddCoupon();
    }
  }, [cart]);

  useEffect(() => {
    if (data.coupon && prodAdded && couponAdded && data.url) {
      window.location.href = data.url;
    }

    if (!data.coupon && prodAdded && data.url) {
      window.location.href = data.url;
    }
  }, [prodAdded, couponAdded]);

  return (
    <>
      {template ? (
        <div className={template}>
          <Grid className={type}>
            <Grid className={`${type}-${align}`}>
              <Button className={classes.root} onClick={handleClick}>
                {data.value}
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : (
          <div>
            <Button className={classes.root} onClick={handleClick}>
              {data.value}
            </Button>
          </div>
        )}
    </>
  );
};

export default SPButton;
