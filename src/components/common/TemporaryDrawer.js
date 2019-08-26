import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Box, Fab } from '@material-ui/core';
import { useQuantity, useWindowSize } from '../../hooks';
import { makeStyles, withStyles } from '@material-ui/core/styles';


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
      backgroundColor: 'transparent',
    }
  },
}))(Fab)

const StyledDrawerWrapper = withStyles(theme => ({
  root: {
    padding: '36px 34px'
  },
}))(Box)

const TemporaryDrawer = ({ toggleContent, listContent, closer, side, ...rest }) => {
  const [state, setState] = React.useState({
    open: false
  });

  const windowSize = useWindowSize();
  const isMobile = windowSize.width < 415;
  const isNonMobile = windowSize.width > 415;

  //pseudo code
  /**
  if isMobile width=100% padding= 24px 0 
    else if isNonMobile width=415 padding= 24px
   */


  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ open });
  };

  const listPanelWidth = [SIDES.TOP, SIDES.BOTTOM].includes(side) ? 1 : isMobile ? '100%' : 415;
  const closePanel = (
    <Box
      onClick={toggleDrawer(false)}
      children={closer}
    />
  );
  const listPanel = (
    <StyledDrawerWrapper
      width={listPanelWidth}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
      children={listContent}
    />
  );

  return (
    <Box {...rest}>
      <StyledFab
        size="small"
        onClick={toggleDrawer(true)}
        children={toggleContent}
      />
      <Drawer
        anchor={side}
        open={state.open}
        onClose={toggleDrawer(false)}
      >
        {closePanel}
        {listPanel}
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
