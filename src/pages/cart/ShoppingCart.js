import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge/Badge';
import CartDrawer from './CartDrawer';
import TemporaryCartDrawer from '../../components/common/TemporaryCartDrawer';
import ShoppingBag from '../../components/common/Icons/Shopping-Bag/ShoppingBag';
import { StyledCartCloseIcon } from './StyledComponents';

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '30%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
      }`
  }
}))(Badge);

const ShoppingCart = () => {
  const cart = useSelector(state => state.cart);
  // const cartCount = cart.items.length;
  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <TemporaryCartDrawer
      toggleContent={
        <StyledBadge
          invisible={cartCount < 1}
          badgeContent={cartCount}
          color="secondary"
        >
          <ShoppingBag />
        </StyledBadge>
      }
      closer={
        <StyledCartCloseIcon
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
