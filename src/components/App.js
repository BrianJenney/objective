import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
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
        <Route exact path="/" component={Home} />
        <Route path="/terms" component={Static} />
        <Route path="/about" component={Static} />
        <Route path="/gallery" component={Gallery} />
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