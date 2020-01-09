import React, { useState, useCallback } from 'react';
import { Link as RouterLink, withRouter, matchPath } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import { withCurrentUser } from '../hoc';
import { DropdownMenu, NavLink } from './common';
import ShoppingCart from '../pages/cart/ShoppingCart';
import LoggedInUser from './LoggedInUser';
import LoginDropdown from './LoginDropdown';
import Logo from './common/Icons/Logo/Logo';
import './Header-style.scss';
import CheckoutHeader from './CheckoutHeader';
import { height } from '@material-ui/system';
import segmentSiteLocation from '../utils/segmentSiteLocation';
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
    if (user['firstName']) {
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
  const isCheckoutPage = matchPath(location.pathname, { path: '/checkout' });
  const isOrderPage = matchPath(location.pathname, { path: '/order' });
  const { account_jwt, firstName } = currentUser.data;
  const [promoVisible, setPromoVisible] = useState(true);
  segmentIdentify(currentUser.data);
  const accountMenuItemConf = account_jwt
    ? {
        key: 'third',
        children: <LoggedInUser name={firstName} />,
        link: '/account/overview'
      }
    : burger
    ? { key: 'third', to: '/login', link: '/login', children: ' Account' }
    : {
        key: 'third',
        children: <LoginDropdown />,
        link: '/login'
      };
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
  

  return (
    <>
      {isCheckoutPage || isOrderPage ? (
        <CheckoutHeader />
      ) : (
        <Grid container item={true} xs={12} className="headerContainer">
          <Grid container item={true} xs={12} spacing={0}>
            {burger ? (
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
                  </Grid>
                </Grid>
                {promoVisible ? (
                  <Grid container item={true} xs={12} className="headerBar">
                    <Grid item xs={12}>
                      <StyledBox fontSize={9}>
                        <NavLink onClick={segmentTrackNavigationClick} to="/gallery">
                          Limited Time: Free Shipping for All New Customers
                        </NavLink>
                        <CloseIcon
                          className="closeIconMobile"
                          onClick={handlePromoClose}
                        />
                      </StyledBox>
                    </Grid>
                  </Grid>
                ) : null}
              </>
            ) : (
              <>
                {promoVisible ? (
                  <div className="headerBar">
                    <Container>
                      <Grid container item={true} xs={12}>
                        <Grid item xs={12}>
                          <StyledBox fontSize={12}>
                            <NavLink onClick={segmentTrackNavigationClick} to="/gallery">
                              Limited Time: Free Shipping for All New Customers
                            </NavLink>
                            <div
                              className="closeIcon"
                              onClick={handlePromoClose}
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
                ) : null}
                <div className="holder">
                  <Container>
                    <Grid container>
                      <Grid item xs={4}>
                        <Grid container>
                          <Grid item xs={6} className="h-pding">
                            <StyledLink onClick={segmentTrackNavigationClick} component={RouterLink} to="/gallery">
                              Shop
                            </StyledLink>
                          </Grid>
                          <Grid item xs={6} className="h-pding">
                            <StyledLink onClick={segmentTrackNavigationClick} component={RouterLink} to="/journal">
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
                          <Grid
                            item
                            xs={6}
                            className="header-shop-holder h-pding"
                          >
                            {!isCheckoutPage && <ShoppingCart />}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Container>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

Header.propTypes = {
  currentUser: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const enhance = compose(
  withCurrentUser,
  withRouter
);

export default enhance(Header);
