import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCoupon, addToCart } from '../../../modules/cart/functions';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

import './template-styles.scss';

const useStyles = makeStyles(theme => ({
  root: props => ({
    backgroundColor: props.desktopStyle.backgroundColor,
    '&:hover': {
      backgroundColor: props.desktopStyle.backgroundColor
    },
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
  const products = useSelector(state => state.catalog.variants);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    if (cart && products) {
      handleAddToCart();
    }
  }, [cart, products, dispatch]);

  const handleAddToCart = useCallback(() => {
    setTimeout(() => {
      if (data.skuAndQty.length > 0) {
        data.skuAndQty.map(key => {
          let arr = key.split(';');
          addToCart(
            cart,
            products.find(p => p.sku === arr[0]),
            arr[1]
          );
        });
      }
      setProdAdded(true);
    }, 500);
  }, [cart, dispatch]);

  console.log(`${type}-${align}`);
  return (
    <>
      {template ? (
        <div className={template}>
          <Grid className={type}>
            <Grid className={`${type}-${align}`}>
              <Button className={`${classes.root}`} onClick={handleClick}>
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
