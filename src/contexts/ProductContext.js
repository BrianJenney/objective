import React, { Component } from 'react';

import store from '../store';
import EventEmitter from '../events';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

const Context = React.createContext();

export class ProductStore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    EventEmitter.addListener('product.request.get', data => {
      this.setState({ ...this.state, 'product': data.data });
    });
    EventEmitter.addListener('variant.request.find', data => {
      this.setState({ ...this.state, 'variants': data.data.data });
    });
    EventEmitter.addListener('content.request.find', data => {
      this.setState({
        ...this.state,
        'hiwTab': data.data.data[0].content,
        'infoTab': data.data.data[1].content
      });
    });
    this.getProductData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId)
      this.getProductData();
  }

  getProductData() {
    const { stomp } = store.getState();
    const stompClient = stomp.client;
    const replyTo = stomp.replyTo;

    let params = {
      'id': this.props.productId
    };

    let obj = JSON.stringify(msgpack.encode(params));
    stompClient.send('/exchange/product/product.request.get', {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    }, obj);

    params = {
      'params': {
        'query': {
          'product_id': this.props.productId
        }
      }
    };

    obj = JSON.stringify(msgpack.encode(params));
    stompClient.send('/exchange/variant/variant.request.find', {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    }, obj);

    let component = '$regex: ' + this.props.productId + '$';
    let re = new RegExp(this.props.productId + '$');
    params = {
      'params': {
        'query': {
          'component': re
        }
      }
    };

    obj = JSON.stringify(msgpack.encode(params));
    stompClient.send('/exchange/content/content.request.find', {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    }, obj);

    // component = 'infoTab_' + this.props.productId;
    // params = {
    //   'params': {
    //     'query': {
    //       'component': component
    //     }
    //   }
    // };

    // obj = JSON.stringify(msgpack.encode(params));
    // stompClient.send('/exchange/content/content.request.find', {
    //   'reply-to': replyTo,
    //   'correlation-id': ObjectId()
    // }, obj);

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