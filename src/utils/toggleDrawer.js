import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Box, Link } from '@material-ui/core';
import Badge from '@material-ui/core/Badge/Badge';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link as RouterLink } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import TemporaryDrawer from '../components/common/TemporaryDrawer';
import CartDrawer from '../pages/cart/CartDrawer';
import ShoppingBag from '../components/common/Icons/Shopping-Bag';
import { fonts, sizes, lineHeight } from '../components/Theme/fonts';

const { $brandSans, $brandSerif } = fonts;

const StyledLink = withStyles(() => ({
  root: {
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'normal',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '16px'
  }
}))(Link);

const StyledBox = withStyles(() => ({
  root: {
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'normal',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '12px',
    lineHeight: '44px'
  }
}))(Box);

const StyledBadge = withStyles(theme => ({
  root: {
    fontSize: 20,
    fontFamily: $brandSans
  },
  badge: {
    top: '45%',
    right: -8,
    fontSize: 20,
    fontFamily: $brandSans
    // The border color match the background color.
    // border: `2px solid ${
    //   theme.palette.type === 'light'
    //     ? theme.palette.grey[200]
    //     : theme.palette.grey[900]
    // }`
  }
}))(Badge);

const renderCartIcon = () => {
  return (
    <TemporaryDrawer
      toggleContent={<div>View Cart</div>}
      closer={
        <Box position="absolute" right={10} top={10} children={<CloseIcon />} />
      }
      listContent={<CartDrawer />}
      side="right"
    ></TemporaryDrawer>
  );
};

const ViewCartItems = () => {
  return (
    <Grid container xs={12} className="headerContainer">
      <Grid item xs={1}>
        {renderCartIcon()}
      </Grid>
    </Grid>
  );
};

export default ViewCartItems;
