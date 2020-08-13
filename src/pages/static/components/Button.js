import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { addCoupon, addToCart } from '../../../modules/cart/functions';
import { setLpProdAdded, setLpCouponAdded } from '../../../modules/utils/actions';

import './template-styles.css';

const useStyles = makeStyles(theme => ({
  root: props => ({
    border: 0,
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
      width: props.mobileStyle.width,
      height: props.mobileStyle.height
    }
  })
}));

const SPButton = ({ history, data, template, type, align }) => {
  const classes = useStyles(data);
  const products = useSelector(state => state.catalog.variants);
  const cart = useSelector(state => state.cart);
  const prodAdded = useSelector(state => state.utils.lpProdAdded);
  const couponAdded = useSelector(state => state.utils.lpCouponAdded);
  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    if (cart && products) {
      handleAddToCart();
      handleAddCoupon();
    }
  }, [cart, products, dispatch]);

  const handleAddToCart = useCallback(() => {
    setTimeout(() => {
      if (data.skuAndQty.length === 1) {
        const [sku, qty] = data.skuAndQty[0].split(';');
        addToCart(
          cart,
          products.find(p => p.sku === sku),
          parseInt(qty, 10)
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
    if (prodAdded && couponAdded && cartCount > 0) {
      history.push(data.URL, 'landingPage');
    }
  }, [cartCount]);

  return (
    <div className={`${template}-${type}-${align}`}>
      <button className={`${classes.root} ${template}-${type}`} type="button" onClick={handleClick}>
        {data.value}
      </button>
    </div>
  );
};

SPButton.propTypes = {
  history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  template: PropTypes.string.isRequired,
  type: PropTypes.object.isRequired,
  align: PropTypes.string.isRequired
};

export default withRouter(SPButton);
