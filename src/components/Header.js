import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Grid, Box, Link } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Link as RouterLink } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import DropdownMenu from './common/DropdownMenu';
import TemporaryDrawer from './common/TemporaryDrawer';
import CartDrawer from '../pages/cart/CartDrawer';
import './Header-style.scss';

const StyledLink = withStyles(theme => ({
  root: {
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'normal',
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '16px',
  },
}))(Link)

const StyledBox = withStyles(theme => ({
  root: {
    fontFamily: 'p22-underground, Helvetica, sans',
    fontWeight: 'normal',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '12px',
    lineHeight: '44px'
  },
}))(Box)

const Header = () => {
  const renderBurgerIcon = () => {
    return (
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
  };

  const renderCartIcon = () => {
    return (
      <TemporaryDrawer
        toggleContent={
          <SvgIcon>
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </SvgIcon>
        }
        closer={
          <StyledBox
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
              <StyledBox fontSize={9}>Free Shipping On Orders Over $75</StyledBox>
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
              <StyledBox fontSize={12}>Free Shipping On Orders Over $75</StyledBox>
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
  );
};

export default Header;
