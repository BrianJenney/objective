import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Static from '../pages/Static';
import Gallery from '../pages/Gallery';
import Cart from '../pages/Cart';
import Account from '../pages/Account';
import ManageProfile from '../pages/account/ManageProfile';
import ManageAddresses from '../pages/account/ManageAddresses';
import ResetPassword from '../pages/account/ResetPassword';
import Login from '../pages/Login';
import Checkout from '../pages/Checkout';
import Product from '../pages/Product';
import LoggedInUser from './LoggedInUser';
import utils from './utils/utils';

import { requestFetchStorefront } from '../modules/storefront/actions';
import { requestFetchCart, requestCreateCart } from '../modules/cart/actions';

const localStorageClient = require('store');
//localStorageClient.clearAll();  //Uncomment this to force creation of a new cart

class App extends Component {
  componentDidMount() {
    this.props.requestFetchStorefront(process.env.REACT_APP_STORE_CODE);

    /**
     * We check to see if the user already has a cart, if they do
     * we fetch it, otherwise we create a new empty one
     *
     * @todo Is this the best place for this logic? Should it actually exist in the cart action instead?
     */
    if (localStorageClient.get('cartId')) {
      this.props.requestFetchCart(localStorageClient.get('cartId'));
    } else {
      this.props.requestCreateCart();
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
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <div>
            <Link to="/">{this.props.storefront.name}</Link>
          </div>
          <Header />
          {utils.isLoggedIn() && <LoggedInUser />}
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

const mapStateToProps = state => {
  return {
    stompClient: state.stomp.client,
    storefront: state.storefront,
    cart: state.cart,
    account: state.account
  };
};

const mapDispatchToProps = {
  requestFetchStorefront,
  requestFetchCart,
  requestCreateCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
