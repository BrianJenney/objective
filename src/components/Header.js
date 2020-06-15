import React, { useState, useCallback, useEffect } from 'react';
import { Link as RouterLink, withRouter, matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { withStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Container, Grid, Box, Link, SvgIcon } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { withCurrentUser } from '../hoc';
import { DropdownMenu, NavLink } from './common';
import ShoppingCart from '../pages/cart/ShoppingCart';
import LoggedInUser from './LoggedInUser';
import LoginDropdown from './LoginDropdown';
import CartNotification from './cart/CartNotification';
import { addCoupon, removeCoupon } from '../modules/cart/functions';
import { requestPromoBanner } from '../modules/static/actions';
import { setCartNotification } from '../modules/utils/actions';
import { OBJECTIVE_PROMOBANNER } from '../constants/contentfulEntries';

import Logo from './common/Icons/Logo/Logo';
import './Header-style.scss';
import CheckoutHeader from './CheckoutHeader';
import segmentSiteLocation from '../utils/segmentSiteLocation';
import { paramsToObject, isAcqDiscount } from '../utils/misc';
const jwt = require('jsonwebtoken');

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
    lineHeight: '44px'
  }
}))(Box);

let segmentIdentified = false;
const segmentIdentify = user => {
  if (!segmentIdentified) {
    if (user.firstName && !user.isGuest) {
      window.analytics.identify(jwt.decode(user.account_jwt).account_id, {
        first_name: `${user.firstName}`,
        last_name: `${user.lastName}`,
        email: user.email
      });

      segmentIdentified = true;
    }
  }
};

const Header = ({ currentUser, location }) => {
  const theme = useTheme();
  const burger = useMediaQuery(theme.breakpoints.down('xs'));
  const isCheckoutPage =
    matchPath(location.pathname, { path: '/checkout' }) ||
    matchPath(location.pathname, { path: '/checkout2' });
  const isOrderPage = matchPath(location.pathname, { path: '/order' });
  const isLandingNoHeader = matchPath(location.pathname, { path: '/landing' });
  const { firstName } = currentUser.data;
  const accountJWT = currentUser.data.account_jwt;
  const [promoVisible, setPromoVisible] = useState(true);
  const [acqDiscount, setAcqDiscount] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const cartNotification = useSelector(state => state.utils.cartNotification);
  const promoBanner = useSelector(state => state.promoBanner.fields);
  let isLandingWithHeader = false;
  if (window.location.pathname === '/landing/sleepandimmunity') {
    isLandingWithHeader = true;
  }

  useEffect(() => {
    dispatch(requestPromoBanner(OBJECTIVE_PROMOBANNER));
    if (
      isAcqDiscount(paramsToObject(new URLSearchParams(window.location.search))) &&
      acqDiscount === false &&
      cart._id
    ) {
      setAcqDiscount(true);
      removeCoupon(cart._id);
      addCoupon(cart._id, 'SAVE25');
      dispatch(setCartNotification(true, 'applyPromoCode'));
    }
  }, [acqDiscount, cart._id, dispatch]);

  segmentIdentify(currentUser.data);

  let accountMenuItemConf = {};
  if (accountJWT && !currentUser.data.isGuest && !currentUser.data.temporarilyLogin) {
    accountMenuItemConf = {
      key: 'third',
      children: <LoggedInUser name={firstName} />,
      link: '/account/overview'
    };
  } else if (burger) {
    accountMenuItemConf = { key: 'third', to: '/login', link: '/login', children: ' Account' };
  } else {
    accountMenuItemConf = { key: 'third', children: <LoginDropdown />, link: '/login' };
  }

  const burgerMenuItems = [
    { key: 'first', to: '/gallery', link: '/gallery', children: 'Shop' },
    { key: 'second', to: '/journal', link: '/journal', children: 'Journal' },
    accountMenuItemConf,
    { key: 'fourth', to: '/faq', link: '/faq', children: 'Help' }
  ];
  const renderBurgerIcon = () => (
    <DropdownMenu
      toggleLabel={
        <SvgIcon>
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </SvgIcon>
      }
      panelId="my-account"
      menuItems={burgerMenuItems}
    />
  );

  const handlePromoClose = useCallback(() => {
    setPromoVisible(!promoVisible);
  }, [promoVisible, setPromoVisible]);

  const segmentTrackNavigationClick = e => {
    window.analytics.track('Navigation Clicked', {
      label: e.target.innerText ? e.target.innerText : '',
      site_location: segmentSiteLocation()
    });
  };

  const renderPromoBanner = () => {
    if (burger) {
      return (
        <Grid container item xs={12} className="headerBar">
          <Grid item xs={12}>
            <StyledBox fontSize={9}>
              <NavLink onClick={segmentTrackNavigationClick} to={promoBanner.href}>
                {promoBanner.text}
              </NavLink>
              <CloseIcon className="closeIconMobile" onClick={handlePromoClose} />
            </StyledBox>
          </Grid>
        </Grid>
      );
    }
    return (
      <div className="headerBar">
        <Container>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <StyledBox fontSize={12}>
                <NavLink onClick={segmentTrackNavigationClick} to={promoBanner.href}>
                  {promoBanner.text}
                </NavLink>
                <div
                  className="closeIcon"
                  role="button"
                  onClick={handlePromoClose}
                  onKeyPress={handlePromoClose}
                  tabIndex={0}
                >
                  Close
                  <CloseIcon
                    onClick={handlePromoClose}
                    style={{
                      position: 'relative',
                      top: 9,
                      paddingLeft: 5
                    }}
                  />
                </div>
              </StyledBox>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  };

  const renderHeader = () => {
    if (burger) {
      return (
        <>
          <Grid container className="top">
            <Grid item xs={1}>
              {renderBurgerIcon()}
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={8} className="logo text-center">
              <NavLink onClick={segmentTrackNavigationClick} to="/">
                <Logo />
              </NavLink>
            </Grid>
            <Grid item xs={1} className="mobile-cart-icon">
              {!isCheckoutPage && <ShoppingCart />}
              {cartNotification && <CartNotification isCheckoutPage={isCheckoutPage} />}
            </Grid>
          </Grid>
          {promoVisible && promoBanner && renderPromoBanner()}
        </>
      );
    }
    return (
      <>
        {promoVisible && promoBanner && renderPromoBanner()}
        <div className="holder">
          <Container>
            <Grid container>
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={6} className="h-pding">
                    <StyledLink
                      onClick={segmentTrackNavigationClick}
                      component={RouterLink}
                      to="/gallery"
                    >
                      Shop
                    </StyledLink>
                  </Grid>
                  <Grid item xs={6} className="h-pding">
                    <StyledLink
                      onClick={segmentTrackNavigationClick}
                      component={RouterLink}
                      to="/journal"
                    >
                      Journal
                    </StyledLink>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} className="logo text-center">
                <NavLink onClick={segmentTrackNavigationClick} to="/">
                  <Logo />
                </NavLink>
              </Grid>
              <Grid item xs={4}>
                <Grid container className="align-right">
                  <Grid item xs={6} className="acct h-pding">
                    <StyledLink
                      component={RouterLink}
                      {...accountMenuItemConf}
                      onClick={segmentTrackNavigationClick}
                    />
                  </Grid>
                  <Grid item xs={6} className="header-shop-holder h-pding">
                    {!isCheckoutPage && <ShoppingCart />}
                    {cartNotification && <CartNotification isCheckoutPage={isCheckoutPage} />}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      </>
    );
  };

  const renderHeaderContainer = () => {
    if (isCheckoutPage || isOrderPage) {
      return <CheckoutHeader />;
    }
    if (isLandingNoHeader && !isLandingWithHeader) {
      return null;
    }
    return (
      <Grid container item xs={12} className="headerContainer">
        <Grid container item xs={12} spacing={0}>
          {renderHeader()}
        </Grid>
      </Grid>
    );
  };

  return <div className="Header">{renderHeaderContainer()}</div>;
};

Header.propTypes = {
  currentUser: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const enhance = compose(withCurrentUser, withRouter);

export default enhance(Header);
