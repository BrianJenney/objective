import React, { useEffect, useCallback, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../modules/cart/functions';
import { setLpProdAdded } from '../../modules/utils/actions';
import { Button } from '../../components/common';

const LPButton = ({ history, data }) => {
  const products = useSelector(state => state.catalog.variants);
  const cart = useSelector(state => state.cart);
  const prodAdded = useSelector(state => state.utils.lpProdAdded);
  const ref = createRef();
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    if (cart && products) {
      handleAddToCart();
    }
    // ref.current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start'
    // });
  }, [cart, products, dispatch, ref]);

  const handleAddToCart = useCallback(() => {
    setTimeout(() => {
      if (data.skuAndQty.length === 1) {
        const [sku, qty] = data.skuAndQty[0].split(';');
        addToCart(
          cart,
          products.find(p => p.sku === sku),
          parseInt(qty)
        );
        dispatch(setLpProdAdded(true));
      }
    }, 500);
  }, [cart, dispatch]);

  return (
    <div>
      <Button onClick={handleClick}>{data.value}</Button>
    </div>
  );
};

export default withRouter(LPButton);
