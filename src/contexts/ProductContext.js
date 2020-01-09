import React, { Component } from 'react';

import store from '../store';
import EventEmitter from '../events';

import { OBJECTIVE_SPACE } from '../constants/contentfulSpaces';

const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');
const contentful = require('contentful');

const Context = React.createContext();
const contentfulClient = contentful.createClient({
  space: OBJECTIVE_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
});

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
    const { client: stompClient, replyTo } = store.getState().stomp;

    contentfulClient
      .getEntries({
        content_type: 'product',
        'fields.Slug': this.props.productSlug
      })
      .then(entry => {
        this.setState({ ...this.state, content: entry.items[0].fields });
      })
      .catch(err => {
        this.setState({ ...this.state, content: null });
      });

    EventEmitter.addListener('product.request.pdp', data => {
      if (data.status === 'success' && data.data) {
        let { product, variants, prices } = data.data;

        this.setState({ ...this.state, product, variants, prices });
      }
    });

    this.getProductData(stompClient, replyTo);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productSlug !== this.props.productSlug) {
      const { stomp } = store.getState();
      const stompClient = stomp.client;
      const replyTo = stomp.replyTo;
      this.getProductData(stompClient, replyTo);
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const updated = !(
      nextState.product === null ||
      nextState.variants.length === 0 ||
      nextState.prices.length === 0
    );
    return updated;
  }

  getProductData(stompClient, replyTo) {
    let params = {
      params: {
        query: {
          slug: this.props.productSlug
        }
      }
    };

    let obj = JSON.stringify(msgpack.encode(params));

    stompClient.send(
      '/exchange/product/product.request.pdp',
      {
        'reply-to': replyTo,
        'correlation-id': ObjectId(),
        'token': localStorageClient.get('olympusToken')
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
