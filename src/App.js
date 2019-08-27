import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withAuthToken } from './hoc';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Static from './pages/Static';
import Gallery from './pages/Gallery';
import Cart from './pages/Cart';
import Account from './pages/Account';
import ManageProfile from './pages/account/ManageProfile';
import ManageAddresses from './pages/account/ManageAddresses';
import ResetPassword from './pages/account/ResetPassword';
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

const jwt = require('jsonwebtoken');
const localStorageClient = require('store');

class App extends Component {
  static propTypes = {
    authToken: PropTypes.string,
    requestFetchAccount: PropTypes.func.isRequired,
    requestFetchCart: PropTypes.func.isRequired,
    requestCreateCart: PropTypes.func.isRequired,
    requestFetchStorefront: PropTypes.func.isRequired,
    storefront: PropTypes.object
  };

  componentDidMount() {
    const {
      authToken,
      requestFetchCart,
      requestCreateCart,
      requestFetchStorefront,
      requestFetchAccount
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
    const { account, authToken, storefront } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <div>
            <Link to="/">{storefront.name}</Link>
          </div>
          <Header />
          {authToken || (account && account.account_jwt)&& <LoggedInUser />}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/account" component={Account} />
            <Route path="/manage-profile" component={ManageProfile} />
            <Route path="/manage-addresses" component={ManageAddresses} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/product/:id" component={Product} />
            <Route path="/:page" component={Static} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  stompClient: state.stomp.client,
  storefront: state.storefront,
  cart: state.cart,
  account: state.account
});

const mapDispatchToProps = {
  requestFetchAccount: requestFetchAccountAction,
  requestFetchStorefront: requestFetchStorefrontAction,
  requestFetchCart: requestFetchCartAction,
  requestCreateCart: requestCreateCartAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthToken(App));
