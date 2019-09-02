import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Box, CssBaseline } from '@material-ui/core';
import { withAuthToken } from './hoc';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Static from './pages/Static';
import Gallery from './pages/Gallery';
import Cart from './pages/Cart';
import Account from './pages/Account';
import {
  AccountProfile,
  AccountAddresses,
  AccountResetPassword
} from './components/account';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Product from './pages/Product';
import LoggedInUser from './components/LoggedInUser';

import { requestFetchAccount as requestFetchAccountAction } from './modules/account/actions';
import {
  requestFetchCart as requestFetchCartAction,
  requestCreateCart as requestCreateCartAction
} from './modules/cart/actions';
import { requestFetchStorefront as requestFetchStorefrontAction } from './modules/storefront/actions';
import { requestFetchCatalog as requestFetchCatalogAction } from './modules/catalog/actions';

const jwt = require('jsonwebtoken');
const localStorageClient = require('store');

class App extends Component {
  static propTypes = {
    authToken: PropTypes.string,
    requestFetchAccount: PropTypes.func.isRequired,
    requestFetchCart: PropTypes.func.isRequired,
    requestCreateCart: PropTypes.func.isRequired,
    requestFetchStorefront: PropTypes.func.isRequired,
    storefront: PropTypes.object,
    requestFetchCatalog: PropTypes.func.isRequired,
    products: PropTypes.object
  };

  componentDidMount() {
    const {
      authToken,
      requestFetchCart,
      requestCreateCart,
      requestFetchStorefront,
      requestFetchAccount,
      requestFetchCatalog,
      request
    } = this.props;

    requestFetchStorefront(process.env.REACT_APP_STORE_CODE);

    /**
     * if the user has a jwt, decode it to find the account it,
     * then get user details & put them in the store
     */
    if (authToken) {
      const accountId = jwt.decode(localStorageClient.get('token')).account_id;
      requestFetchAccount(accountId);
    }

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
    const { account, authToken, storefront, products } = this.props;

    return (
      <>
        <CssBaseline />
        <BrowserRouter>
          <Header />
          <Box bgcolor="rgba(252, 248, 244, 0.5)" px={15} py={10}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/cart" component={Cart} />
              <Route path="/login" component={Login} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/account" component={Account} />
              <Route path="/manage-profile" component={AccountProfile} />
              <Route path="/manage-addresses" component={AccountAddresses} />
              <Route path="/reset-password" component={AccountResetPassword} />
              <Route path="/product/:id" component={Product} />
              <Route path="/:page" component={Static} />
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

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withAuthToken
);

export default enhance(App);
