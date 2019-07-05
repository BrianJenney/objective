import React, { Component } from 'react';

import store from '../store';
import { EventEmitter } from '../events';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

const Context = React.createContext();

export class GalleryStore extends Component {
  constructor() {
    super();
    EventEmitter.subscribe('product.request.find', data => {
      this.setState({ 'products': data.data.data });
    });
  }

  state = {};

  componentDidMount() {
    const { stomp } = store.getState();
    const stompClient = stomp.client;
    const replyTo = stomp.replyTo;
    const params = {
      'params': {
        'query': {
          '_id': { $in: ['5ceea2eb0023ee3bcc730cc7', '5ceebf7ea686a03bccfa67bf', '5ceec48fa686a03bccfa67c4'] }
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