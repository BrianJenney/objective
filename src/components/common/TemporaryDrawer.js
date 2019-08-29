import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Box, Fab } from '@material-ui/core';
import { useWindowSize } from '../../hooks';
import { withStyles } from '@material-ui/core/styles';
import CheckoutButton from '../../pages/cart/CheckoutButton';

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

  return (
    <Box {...rest}>
      <StyledFab onClick={toggleDrawer(true)} children={toggleContent} />
      <Drawer anchor={side} open={drawer.open} onClose={toggleDrawer(false)}>
        {closePanel}
        {listPanel}
        <CheckoutButton onClick={toggleDrawer(false)} />
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
