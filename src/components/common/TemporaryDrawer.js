import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import { useWindowSize } from '../../hooks';
import CheckoutButton from '../../pages/cart/CheckoutButton';
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
    padding: '0'
  }
}))(Box);

const TemporaryDrawer = ({
  toggleContent,
  listContent,
  closer,
  cart,
  side,
  ...rest
}) => {
  const [drawer, setDrawer] = React.useState({
    open: false
  });

  const toggleDrawer = open => event => {
    if (
      event.type == 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawer({ open });
  };

  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 415;
  const isNonMobile = windowSize.width > 415;

  const listPanelWidth = [SIDES.TOP, SIDES.BOTTOM].includes(side)
    ? 1
    : isMobile
    ? '100%'
    : 415;
  const closePanel = <Box onClick={toggleDrawer(false)} children={closer} />;

  const listPanel = (
    <StyledDrawerWrapper width={listPanelWidth} children={listContent} />
  );

  const cartItem = useSelector(state => state.cart);

  return (
    <Box {...rest}>
      <StyledFab
        size="small"
        onClick={toggleDrawer(true)}
        children={toggleContent}
      />
      <Drawer
        anchor={side}
        open={drawer.open}
        onClose={toggleDrawer(false)}
        className="pizza"
      >
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

TemporaryDrawer.propTypes = {
  side: PropTypes.oneOf(Object.values(SIDES)).isRequired,
  toggleContent: PropTypes.node.isRequired,
  closer: PropTypes.node,
  listContent: PropTypes.node.isRequired
};

export default TemporaryDrawer;
