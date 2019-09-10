import React from 'react';
import { useSelector } from 'react-redux';
import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Box, Link } from '@material-ui/core';
import Badge from '@material-ui/core/Badge/Badge';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link as RouterLink } from 'react-router-dom';
import DropdownMenu from './common/DropdownMenu';
import ShoppingCart from '../pages/cart/ShoppingCart';

import './Header-style.scss';

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

const Header = () => {
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
          { key: 'second', to: '/', children: 'Journal' },
          { key: 'third', to: '/account', children: 'Account' },
          { key: 'third', to: '/account', children: 'Help' }
        ]}
      />
    </>
  );

  const theme = useTheme();
  const burger = useMediaQuery(theme.breakpoints.down('xs'));

  return (
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
                OBJ
              </Grid>
              <Grid item xs={1}>
                {!burger && (
                  <StyledLink component={RouterLink} to="/account">
                    Account
                  </StyledLink>
                )}
              </Grid>
              <Grid item xs={1}>
                <ShoppingCart />
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
                OBJECTIVE WELLNESS
              </Grid>
              <Grid item xs={1}>
                {!burger && (
                  <StyledLink component={RouterLink} to="/account">
                    Account
                  </StyledLink>
                )}
              </Grid>
              <Grid item xs={1}>
                <ShoppingCart />
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Header;
