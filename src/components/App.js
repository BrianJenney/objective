import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Container, Header } from 'semantic-ui-react';

import Home from '../pages/Home';
import Static from '../pages/Static';
import Gallery from '../pages/Gallery';
import Cart from '../pages/Cart';

import { requestFetchStorefront } from '../modules/storefront/actions';
import { requestFetchCart, requestCreateCart } from '../modules/cart/actions';

const localStorageClient = require('store');

class App extends Component {
  componentWillMount() {
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
      <BrowserRouter>
        <Segment>
          <Container>
            <Link to ='/'>
              <Header as='h1' textAlign='center'>{this.props.storefront.name}</Header>
            </Link>
          </Container>
        </Segment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/cart" component={Cart} />
          <Route path="/:page" component={Static} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    stompClient: state.stomp.client,
    storefront: state.storefront,
    cart: state.cart
  };
};

const mapDispatchToProps = {
  requestFetchStorefront,
  requestFetchCart,
  requestCreateCart
};

export default connect(mapStateToProps, mapDispatchToProps)(App);