import React from 'react';
import { useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import CartDrawer from './CartDrawer';
import TemporaryCartDrawer from '../../components/common/TemporaryCartDrawer';
import ShoppingBag from '../../components/common/Icons/Shopping-Bag/ShoppingBag';
import { StyledCartCloseIcon, StyledEmptyCartCloseIcon } from './StyledComponents';


const ShoppingCart = () => {
  const cart = useSelector(state => state.cart);
  // const cartCount = cart.items.length;
  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <TemporaryCartDrawer
      toggleContent={
        <>
          <ShoppingBag />
          <span
            style={{
              'font-family': 'p22-underground, sans-serif',
              'font-size': '14px'
            }}
          >
            {cartCount}
          </span>
        </>
      }
      closer={
        cart.items.length !== 0 ?
          <StyledCartCloseIcon
            position="absolute"
            left={1}
            top={30}
            children={<CloseIcon />}
          /> :
          <StyledEmptyCartCloseIcon
            position="absolute"
            left={1}
            top={30}
            children={<CloseIcon />}
          />
      }
      listContent={<CartDrawer showCheckoutProceedLink />}
      side="right"
    />
  );
};

export default ShoppingCart;
