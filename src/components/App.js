import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestFetchStore } from '../actions';

class App extends Component {
  componentWillMount() {
    this.props.requestFetchStore(process.env.REACT_APP_STORE_ID);
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