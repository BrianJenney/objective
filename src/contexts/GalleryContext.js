import React, { Component } from 'react';

import store from '../store';
import { EventEmitter } from '../events';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');
const _ = require('lodash');

const Context = React.createContext();

export class GalleryStore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    EventEmitter.subscribe('product.request.find', data => {
      this.setState({ 'products': data.data.data });
    });
  }

  componentDidMount() {
    this.getGalleryData();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.productIds, this.props.productIds)) {
      this.getGalleryData();
    }
  }

  getGalleryData() {
    const { stomp } = store.getState();
    const stompClient = stomp.client;
    const replyTo = stomp.replyTo;
    const params = {
      'params': {
        'query': {
          '_id': { $in: this.props.productIds }
        }
      }
    };

    var obj = JSON.stringify(msgpack.encode(params));
    stompClient.send('/exchange/product/product.request.find', {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    }, obj);
  }

  render() {
    return (
      <Context.Provider value={{ ...this.state }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;