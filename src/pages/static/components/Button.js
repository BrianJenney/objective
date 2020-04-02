import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCoupon, addToCart } from '../../../modules/cart/functions';
import { setLpProdAdded, setLpCouponAdded } from '../../../modules/utils/actions';
import { makeStyles } from '@material-ui/core/styles';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.desktopStyle.bgColor,
    '&:hover': {
      backgroundColor: props.desktopStyle.bgColor
    },
    color: props.desktopStyle.fontColor,
    fontWeight: props.desktopStyle.fontWeight,
    fontSize: props.desktopStyle.fontSize,
    lineHeight: props.desktopStyle.lineHeight,
    fontFamily: props.desktopStyle.fontFamily,
    textTransform: props.desktopStyle.textTransform,
    width: props.desktopStyle.width,
    height: props.desktopStyle.height,
    [theme.breakpoints.down('sm')]: {
      width: props.mobileStyle.width
    }
  })
}));

const SPButton = ({ data, template, type, align }) => {
  const classes = useStyles(data);
  const products = useSelector(state => state.catalog.variants);
  const cart = useSelector(state => state.cart);
  const prodAdded = useSelector(state => state.utils.lpProdAdded);
  const couponAdded = useSelector(state => state.utils.lpCouponAdded);
  const dispatch = useDispatch();

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
        dispatch(setLpProdAdded(true));
      }
    }, 500);
  }, [cart, dispatch]);

  const handleAddCoupon = useCallback(() => {
    setTimeout(() => {
      addCoupon(cart._id, data.coupon);
      dispatch(setLpCouponAdded(true));
    }, 500);
  }, [cart, products, dispatch]);

  useEffect(() => {
    if (data.coupon && prodAdded && couponAdded === false) {
      handleAddCoupon();
    }
  }, [prodAdded, dispatch]);

  useEffect(() => {
    const [sku, qty] = data.skuAndQty[0].split(';');

    if (prodAdded && !data.coupon) {
      window.location.href = data.URL;
    }

    if (prodAdded && couponAdded) {
      window.location.href = data.URL;
    }
  }, [prodAdded, couponAdded]);

  return (
    <div className={`${template}-${type}-${align}`}>
      <button className={`${classes.root} ${template}-${type}`} onClick={handleClick}>
        {data.value}
      </button>
    </div>
  );
};

export default SPButton;
