import React, { Component } from 'react';

const Context = React.createContext();

export class GalleryStore extends Component {
  render() {
    return (
      <Context.Provider value={ this.props.products }>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
