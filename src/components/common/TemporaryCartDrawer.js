import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Drawer, Box, Fab } from '@material-ui/core';
import { useWindowSize } from '../../hooks';
import { withStyles } from '@material-ui/core/styles';
import CheckoutButton from '../../pages/cart/CheckoutButton';

import { setCartDrawerOpened} from '../../modules/cart/actions';

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
    padding: '36px 34px'
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

  const toggleDrawer = open => event => {
    if (
      event.type == 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    dispatch(setCartDrawerOpened(open));
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

  return (
    <Box {...rest}>
      {toggleContent &&
      <StyledFab
        size="small"
        onClick={toggleDrawer(true)}
        children={toggleContent}
      />
      }
      <Drawer anchor={side} open={drawerOpened} onClose={toggleDrawer(false)}>
        {closePanel}
        {listPanel}
        <CheckoutButton onClick={toggleDrawer(false)} />
      </Drawer>
    </Box>
  );
};

TemporaryCartDrawer.propTypes = {
  side: PropTypes.oneOf(Object.values(SIDES)).isRequired,
  toggleContent: PropTypes.node.isRequired,
  closer: PropTypes.node,
  listContent: PropTypes.node.isRequired,
};

export default TemporaryCartDrawer;
