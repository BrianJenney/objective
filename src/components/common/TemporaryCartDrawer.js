import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import { useWindowSize } from '../../hooks';
import CheckoutButton from '../../pages/cart/CheckoutButton';
import { setCartDrawerOpened } from '../../modules/cart/actions';
import ContShoppingButton from '../../pages/cart/ContShoppingButton';

export const SIDES = {
  TOP: 'top',
  LEFT: 'left',
  BOTTOM: 'bottom',
  RIGHT: 'right'
};

const StyledFab = withStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}))(Fab);

const StyledDrawerWrapper = withStyles(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: '36px 35px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0'
    }
  }
}))(Box);

const TemporaryCartDrawer = ({
  toggleContent,
  listContent,
  closer,
  cart,
  side,
  ...rest
}) => {
  const drawerOpened = useSelector(state => state.cart.cartDrawerOpened);
  const dispatch = useDispatch();
  const nCart = useSelector(state => state.cart);
  nCart.items.map(item => {item.discount_price = Number.parseFloat(item.discount_price).toFixed(2); item.unit_price = Number.parseFloat(item.unit_price).toFixed(2); return item});
  const toggleDrawer = open => event => {
    if (
      event.type == 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    dispatch(setCartDrawerOpened(open));

    if(open){
      if(!drawerOpened){
      window.analytics.track("Cart Viewed", {
        "cart_id": nCart._id,
        "num_products": nCart.items.reduce((acc, item) => acc + item.quantity, 0),
        "products": nCart.items
      });
    }
    }else{
      
      window.analytics.track("Cart Dismissed", {
        "cart_id": nCart._id,
        "num_products": nCart.items.reduce((acc, item) => acc + item.quantity, 0),
        "products": nCart.items
      });
    }
  };

  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 415;
  const isNonMobile = windowSize.width > 415;

  const listPanelWidth = [SIDES.TOP, SIDES.BOTTOM].includes(side)
    ? 1
    : isMobile
    ? 335
    : 415;
  const closePanel = <Box onClick={toggleDrawer(false)} children={closer} />;

  const listPanel = (
    <StyledDrawerWrapper width={listPanelWidth} children={listContent} />
  );

  const cartItem = useSelector(state => state.cart);

  return (
    <Box {...rest}>
      {toggleContent && (
        <StyledFab
          size="small"
          onClick={toggleDrawer(true)}
          children={toggleContent}
        />
      )}
      <Drawer anchor={side} open={drawerOpened} onClose={toggleDrawer(false)}>
        {closePanel}
        {listPanel}
        {cartItem.items.length !== 0 ? (
          <CheckoutButton onClick={toggleDrawer(false)} />
        ) : (
          <ContShoppingButton onClick={toggleDrawer(false)} />
        )}
      </Drawer>
    </Box>
  );
};

TemporaryCartDrawer.propTypes = {
  side: PropTypes.oneOf(Object.values(SIDES)).isRequired,
  toggleContent: PropTypes.node.isRequired,
  closer: PropTypes.node,
  listContent: PropTypes.node.isRequired
};

export default TemporaryCartDrawer;
