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
  hideLPCoupon,
  ...rest
}) => {
  const drawerOpened = useSelector(state => state.cart.cartDrawerOpened);
  const dispatch = useDispatch();

  const toggleDrawer = open => event => {
    if (event.type == 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    dispatch(setCartDrawerOpened(open));
  };

  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 415;

  const listPanelWidth = [SIDES.TOP, SIDES.BOTTOM].includes(side) ? 1 : isMobile ? 335 : 415;
  const closePanel = <Box onClick={toggleDrawer(false)} children={closer} />;

  const listPanel = <StyledDrawerWrapper width={listPanelWidth} children={listContent} />;

  const cartItem = useSelector(state => state.cart);

  return (
    <Box {...rest}>
      {toggleContent && (
        <StyledFab size="small" onClick={toggleDrawer(true)} children={toggleContent} />
      )}
      <Drawer anchor={side} open={drawerOpened} onClose={toggleDrawer(false)}>
        {closePanel}
        {listPanel}
        {cartItem.items.length !== 0 ? (
          <CheckoutButton onClick={toggleDrawer(false)} hideLPCoupon={hideLPCoupon} />
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
  listContent: PropTypes.node.isRequired,
  hideLPCoupon: PropTypes.node
};

export default TemporaryCartDrawer;
