import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Segment, Container, Header } from 'semantic-ui-react';

import Home from '../pages/Home';
import Static from '../pages/Static';
import Gallery from '../pages/Gallery';
import Account from '../pages/Account';
import Login from '../pages/Login';
import Checkout from '../pages/Checkout';
import Navbar from '../pages/Navbar';
import Footer from '../pages/Footer';

import { requestFetchStorefront } from '../modules/storefront/actions';

class App extends Component {
  componentWillMount() {
    this.props.requestFetchStorefront(process.env.REACT_APP_STORE_CODE);
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
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/login" component={Login} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/my-account" component={Account} />
          <Route path="/:page" component={Static} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    stompClient: state.stomp.client,
    storefront: state.storefront
  };
};

const mapDispatchToProps = {
  requestFetchStorefront
};

export default connect(mapStateToProps, mapDispatchToProps)(App);