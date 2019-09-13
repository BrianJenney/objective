import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { requestFetchAccount as requestFetchAccountAction } from './modules/account/actions';
import {
  requestFetchCart as requestFetchCartAction,
  requestCreateCart as requestCreateCartAction
} from './modules/cart/actions';
import { requestFetchStorefront as requestFetchStorefrontAction } from './modules/storefront/actions';
import { requestFetchCatalog as requestFetchCatalogAction } from './modules/catalog/actions';
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
    products: PropTypes.object.isRequired,
    requestFetchAccount: PropTypes.func.isRequired,
    requestFetchCart: PropTypes.func.isRequired,
    requestCreateCart: PropTypes.func.isRequired,
    requestFetchStorefront: PropTypes.func.isRequired,
    requestFetchCatalog: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {
      account,
      requestFetchAccount,
      requestFetchCart,
      requestCreateCart,
      requestFetchStorefront,
      requestFetchCatalog
    } = this.props;
    const { data: accountData } = account;

    if (accountData.account_jwt && !accountData.account_id) {
      const accountId = jwt.decode(accountData.account_jwt).account_id;
      requestFetchAccount(accountId);
    }

    requestFetchStorefront(process.env.REACT_APP_STORE_CODE);

    /**
     * We check to see if the user already has a cart, if they do
     * we fetch it, otherwise we create a new empty one
     *
     * @todo Is this the best place for this logic? Should it actually exist in the cart action instead?
     */
    if (localStorageClient.get('cartId')) {
      requestFetchCart(localStorageClient.get('cartId'));
    } else {
      requestCreateCart();
    }

    if (localStorageClient.get('catalogId')) {
      requestFetchCatalog(localStorageClient.get('catalogId'));
    } else {
      console.log('no catalog id, cannot fetch catalog');
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
          <Box bgcolor="rgba(252, 248, 244, 0.5)">
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
  products: state.products
});

const mapDispatchToProps = {
  requestFetchAccount: requestFetchAccountAction,
  requestFetchStorefront: requestFetchStorefrontAction,
  requestFetchCart: requestFetchCartAction,
  requestCreateCart: requestCreateCartAction,
  requestFetchCatalog: requestFetchCatalogAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
