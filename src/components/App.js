import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStore } from '../actions';

class App extends Component {
  componentWillMount() {
    this.props.fetchStore('5d0a9374603b13055e1e3670');
  }

  render() {
    console.log(this.props.storefront);
    return (
      <div className="ui container">
        Hi
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stompClient: state.global.stompClient,
    storefront: state.storefront
  };
};

const mapDispatchToProps = {
  fetchStore
};

export default connect(mapStateToProps, mapDispatchToProps)(App);