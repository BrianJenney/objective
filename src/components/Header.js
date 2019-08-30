import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Box, Link } from '@material-ui/core';
import Badge from '@material-ui/core/Badge/Badge';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link as RouterLink } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import DropdownMenu from './common/DropdownMenu';
import TemporaryDrawer from './common/TemporaryDrawer';
import CartDrawer from '../pages/cart/CartDrawer';
import './Header-style.scss';
import ShoppingBag from './common/Icons/Shopping-Bag';
import { fonts, sizes, lineHeight } from './Theme/fonts';
import {
  DrawerStatusContext,
  useDrawerStatus
} from '../contexts/DrawerContext';

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
  }
}))(Badge);

const Header = () => {
  const cart = useSelector(state => state.cart);
  const isDrawerOpen = useDrawerStatus();
  const renderBurgerIcon = () => (
    <>
      <DropdownMenu
        toggleLabel={
          <SvgIcon>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </SvgIcon>
        }
        panelId="my-account"
        menuItems={[
          { key: 'first', to: '/gallery', children: 'Shop' },
          { key: 'second', to: '/', children: 'Science' },
          { key: 'third', to: '/account', children: 'Account' }
        ]}
      />
    </>
  );

  const renderCartIcon = () => {
    const cartCount = cart.items.length;
    return (
      <TemporaryDrawer
        toggleContent={
          <StyledBadge invisible={cartCount < 1} badgeContent={cartCount}>
            <ShoppingBag />
          </StyledBadge>
        }
        closer={
          <Box
            position="absolute"
            right={10}
            top={10}
            children={<CloseIcon />}
          />
        }
        listContent={<CartDrawer />}
        side="right"
      ></TemporaryDrawer>
    );
  };

  const theme = useTheme();
  const burger = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <DrawerStatusContext.Provider value={isDrawerOpen}>
      <Grid container xs={12} className="headerContainer">
        <Grid container xs={12} spacing={0}>
          {burger ? (
            <>
              <Grid container xs={10} className="top">
                <Grid item xs={1}>
                  {renderBurgerIcon()}
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={8} className="logo text-center">
                  Logo.
                </Grid>
                <Grid item xs={1}>
                  {!burger && (
                    <StyledLink component={RouterLink} to="/account">
                      Account
                    </StyledLink>
                  )}
                </Grid>
                <Grid item xs={1}>
                  {renderCartIcon()}
                </Grid>
              </Grid>
              <Grid container xs={12} className="headerBar">
                <Grid item xs={8} className="option text-right">
                  <StyledBox fontSize={9}>
                    Free Shipping On Orders Over $75
                  </StyledBox>
                </Grid>
                <Grid item xs={4} className="option text-left">
                  <StyledBox fontSize={9}>Free Returns</StyledBox>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid container xs={12} className="headerBar">
                <Grid item xs={6} className="option text-right">
                  <StyledBox fontSize={12}>
                    Free Shipping On Orders Over $75
                  </StyledBox>
                </Grid>
                <Grid item xs={6} className="option text-left">
                  <StyledBox fontSize={12}>Free Returns</StyledBox>
                </Grid>
              </Grid>
              <Grid container className="holder" xs={12}>
                <Grid item xs={1}>
                  <StyledLink component={RouterLink} to="/gallery">
                    Shop
                  </StyledLink>
                </Grid>
                <Grid item xs={1}>
                  <StyledLink component={RouterLink} to="/">
                    Science
                  </StyledLink>
                </Grid>
                <Grid item xs={8} className="logo text-center">
                  Logo.
                </Grid>
                <Grid item xs={1}>
                  {!burger && (
                    <StyledLink component={RouterLink} to="/account">
                      Account
                    </StyledLink>
                  )}
                </Grid>
                <Grid item xs={1}>
                  {renderCartIcon()}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </DrawerStatusContext.Provider>
  );
};

export default Header;
