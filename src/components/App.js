import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Container, Header } from 'semantic-ui-react';

import { requestFetchStorefront } from '../modules/storefront/actions';

class App extends Component {
  componentWillMount() {
    this.props.requestFetchStorefront(process.env.REACT_APP_STORE_ID);
  }

  render() {
    return (
      <Segment>
        <Container>
          <Header as='h1' textAlign='center'>{this.props.storefront.name}</Header>
        </Container>
      </Segment>
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