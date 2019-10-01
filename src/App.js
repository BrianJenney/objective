import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

import { requestFetchBootstrap } from './modules/bootstrap/actions';
import { RouteWithSubRoutes } from './components/common';
import Header from './components/Header';
import Footer from './components/Footer';
import routes from './routes';

const jwt = require('jsonwebtoken');
const localStorageClient = require('store');

class App extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    storefront: PropTypes.object.isRequired,
    catalog: PropTypes.object.isRequired,
    requestFetchBootstrap: PropTypes.func.isRequired
  };

  componentDidMount() {
    // disable horizontal scrolling
    window.addEventListener('touchstart', this.touchStart);
    window.addEventListener('touchmove', this.preventTouch, { passive: false });

    const { account, requestFetchBootstrap } = this.props;
    const { data: accountData } = account;

    let accountId = null;

    if (accountData.account_jwt && !accountData.account_id) {
      accountId = jwt.decode(accountData.account_jwt).account_id;
    }

    let cartId = null;
    if (localStorageClient.get('cartId')) {
      cartId = localStorageClient.get('cartId');
    }

    requestFetchBootstrap(process.env.REACT_APP_STORE_CODE, accountId, cartId);
  }

  componentWillUnmount() {
    // disable horizontal scrolling
    window.removeEventListener('touchstart', this.touchStart);
    window.removeEventListener('touchmove', this.preventTouch, {
      passive: false
    });
  }

  // disable horizontal scrolling
  touchStart(e) {
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  // eslint-disable-next-line consistent-return
  // disable horizontal scrolling
  preventTouch(e) {
    const minValue = 5; // threshold

    this.clientX = e.touches[0].clientX - this.firstClientX;
    this.clientY = e.touches[0].clientY - this.firstClientY;

    // Vertical scrolling does not work when you start swiping horizontally.
    if (Math.abs(this.clientX) > minValue) {
      e.preventDefault();
      e.returnValue = false;
      return false;
    }
  }

  /**
   * @todo
   *
   * Static Component needs to throw 404 if a page is not found
   *
   * @note
   *
   * The order that routes are defined matters, make sure /:page is the very last one
   */
  render() {
    return (
      <>
        <CssBaseline />
        <BrowserRouter>
          <Header />
          <Box>
            <Switch>
              {routes.map(route => (
                <RouteWithSubRoutes key={route.path} {...route} />
              ))}
            </Switch>
          </Box>
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

const mapStateToProps = state => ({
  stompClient: state.stomp.client,
  storefront: state.storefront,
  cart: state.cart,
  account: state.account,
  catalog: state.catalog
});

const mapDispatchToProps = {
  requestFetchBootstrap: requestFetchBootstrap
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
