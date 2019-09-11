import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CartDrawer from './CartDrawer';
import Badge from '@material-ui/core/Badge/Badge';

import TemporaryCartDrawer from '../../components/common/TemporaryCartDrawer';
import ShoppingBag from '../../components/common/Icons/Shopping-Bag/ShoppingBag';
import {
  StyledCartIcon
} from './StyledComponents';

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '30%',
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
  },
}))(Badge);

const ShoppingCart = () => {
  const cart = useSelector(state => state.cart);
  const cartCount = cart.items.length;
  return (
    <TemporaryCartDrawer
      toggleContent={
        <StyledBadge invisible={cartCount < 1} badgeContent={cartCount} color="secondary">
          <ShoppingBag />
        </StyledBadge>
      }
      closer={
        <StyledCartIcon children={<CloseIcon />} />
      }
      listContent={<CartDrawer />}
      side="right"
    />
  );
};

export default ShoppingCart;



