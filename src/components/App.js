import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestFetchStore } from '../actions';

class App extends Component {
  componentWillMount() {
    this.props.requestFetchStore('5d0a9374603b13055e1e3670');
  }

  render() {
    return (
      <div className="ui container">
        {this.props.storefront.name}
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
  requestFetchStore
};

export default connect(mapStateToProps, mapDispatchToProps)(App);