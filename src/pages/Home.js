import React, { Component } from 'react';

import Gallery from './Gallery';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <Gallery />
      </div>
    );
  }
}