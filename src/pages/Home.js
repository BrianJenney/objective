import React, { Component } from 'react';
import Gallery from './Gallery';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Typography gutterBottom variant="h3">Homepage</Typography>
        <Gallery />
      </Container>
    );
  }
}