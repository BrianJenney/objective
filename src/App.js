import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

import { requestFetchBootstrap } from './modules/bootstrap/actions';
import { requestCreateCart, requestPatchCart, requestMergeCarts } from './modules/cart/actions';
import { RouteWithSubRoutes } from './components/common';
import Header from './components/Header';
import Footer from './components/Footer';
import routes from './routes';
import EventEmitter from './events';

import { createAnonymousToken } from './utils/token';
import { getDaysDiff } from './utils/misc';

const jwt = require('jsonwebtoken');
const localStorageClient = require('store');

class App extends Component {
  static propTypes = {
    cart: PropTypes.object,
    requestFetchBootstrap: PropTypes.func.isRequired,
    requestCreateCart: PropTypes.func.isRequired,
    requestPatchCart: PropTypes.func.isRequired,
    requestMergeCarts: PropTypes.func.isRequired
  };

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { requestFetchBootstrap, requestPatchCart, requestMergeCarts } = this.props;

    // ImpactRadius, Segment click id logic
    // Ref: Jira DC-846
    const oldClickId = localStorageClient.get('clickId');
    const params = new URLSearchParams(window.location.search);
    const clickId = params.get('irclickid');
    if (oldClickId && getDaysDiff(localStorageClient.get('clickIdSetupTime')) > 30) {
      localStorageClient.remove('clickIdSetupTime');
      localStorageClient.remove('clickId');
    }
    if (clickId !== null) {
      if (!oldClickId) {
        localStorageClient.set('clickId', clickId);
        localStorageClient.set('clickIdSetupTime', new Date());
      } else if (oldClickId && clickId !== oldClickId) {
        localStorageClient.set('clickId', clickId);
        localStorageClient.set('clickIdSetupTime', new Date());
      }
    }

    requestFetchBootstrap();

    EventEmitter.addListener('account.created', ({ token }) => {
      localStorageClient.set('olympusToken', token);

      const accountId = jwt.decode(token).account_id;

      requestPatchCart(this.props.cart._id, {
        accountId
      });
    });

    EventEmitter.addListener('user.logged.in', ({ token }) => {
      localStorageClient.set('olympusToken', token);

      const accountId = jwt.decode(token).account_id;

      if (localStorageClient.get('cartId')) {
        requestMergeCarts(localStorageClient.get('cartId'), accountId);
      }
    });

    EventEmitter.addListener('user.logged.out', () => {
      const olympusToken = createAnonymousToken();
      localStorageClient.set('olympusToken', olympusToken);
    });
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
          <Box className="appMain">
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
  cart: state.cart
});

const mapDispatchToProps = {
  requestFetchBootstrap,
  requestCreateCart,
  requestPatchCart,
  requestMergeCarts
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
