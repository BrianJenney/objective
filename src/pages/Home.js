import React, { Component } from 'react';

import { Container, Header } from 'semantic-ui-react';

import Gallery from './Gallery';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header as='h2'>Home Page</Header>
        <Gallery />
      </Container>
    );
  }
}