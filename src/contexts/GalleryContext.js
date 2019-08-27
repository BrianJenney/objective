import React, { Component } from 'react';

import store from '../store';
import EventEmitter from '../events';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');
const _ = require('lodash');

const Context = React.createContext();

export class GalleryStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      variants: [],
      prices: []
    };
  }

  componentDidMount() {
    EventEmitter.addListener('product.request.find', data => {
      this.setState({ 'products': data.data.data });
    });
    EventEmitter.addListener('variant.request.find', data => {
      this.setState({ ...this.state, 'variants': data.data.data });
    });
    EventEmitter.addListener('price.request.find', data => {
      this.setState({ ...this.state, 'prices': data.data.data });
    });
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
    let params = {
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

    params = {
      'params': {
        'query': {
          'product_id': { $in: this.props.productIds }
        }
      }
    };

    obj = JSON.stringify(msgpack.encode(params));
    stompClient.send('/exchange/variant/variant.request.find', {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    }, obj);

    params = {
      'params': {
        'query': {
          'product_id': { $in: this.props.productIds }
        }
      }
    };
    obj = JSON.stringify(msgpack.encode(params));
    stompClient.send('/exchange/price/price.request.find', {
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