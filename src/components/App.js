import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Container, Header } from 'semantic-ui-react';
import Home from '../pages/Home';
import Static from '../pages/Static';
import Gallery from '../pages/Gallery';

import { requestFetchStorefront } from '../modules/storefront/actions';

class App extends Component {
  componentWillMount() {
    this.props.requestFetchStorefront(process.env.REACT_APP_STORE_ID);
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
          <Route path="/:page" component={Static} />
        </Switch>
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