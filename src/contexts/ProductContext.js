import React, { Component } from 'react';

import store from '../store';
import EventEmitter from '../events';

import { OBJECTIVE_SPACE } from '../constants/contentfulSpaces';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

const contentful = require('contentful');
const contentfulClient = contentful.createClient({
  space: OBJECTIVE_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
});

const Context = React.createContext();

export class ProductStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      variants: [],
      prices: []
    };
  }

  componentDidMount() {
    contentfulClient.getEntries({
      'content_type': 'product',
      'fields.sku': this.props.productSlug
    })
    .then(entry => {
      this.setState({ ...this.state, content: entry.items[0].fields });
    })
    .catch(err => {
      this.setState({ ...this.state, content: null });
    });
    EventEmitter.addListener('product.request.find', data => {
      this.setState({ ...this.state, product: data.data.data[0] });
    });
    EventEmitter.addListener('variant.request.find', data => {
      this.setState({ ...this.state, variants: data.data.data });
    });
    EventEmitter.addListener('price.request.find', data => {
      this.setState({ ...this.state, prices: data.data.data });
    });
    this.getProductData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productSlug !== this.props.productSlug) this.getProductData();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const updated = !(
      nextState.product === null ||
      nextState.variants.length === 0 ||
      nextState.prices.length === 0
    );
    return updated;
  }

  getProductData() {
    const { stomp } = store.getState();
    const stompClient = stomp.client;
    const replyTo = stomp.replyTo;

    let params = {
      params: {
        query: {
          slug: this.props.productSlug
        }
      }
    };

    let obj = JSON.stringify(msgpack.encode(params));
    stompClient.send(
      '/exchange/product/product.request.find',
      {
        'reply-to': replyTo,
        'correlation-id': ObjectId()
      },
      obj
    );

    params = {
      params: {
        query: {
          prodSlug: this.props.productSlug
        }
      }
    };

    obj = JSON.stringify(msgpack.encode(params));
    stompClient.send(
      '/exchange/variant/variant.request.find',
      {
        'reply-to': replyTo,
        'correlation-id': ObjectId()
      },
      obj
    );

    params = {
      params: {
        query: {
          prodSlug: this.props.productSlug
        }
      }
    };
    obj = JSON.stringify(msgpack.encode(params));
    stompClient.send(
      '/exchange/price/price.request.find',
      {
        'reply-to': replyTo,
        'correlation-id': ObjectId()
      },
      obj
    );
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
