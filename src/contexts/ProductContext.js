import React, { Component } from 'react';

import PropTypes from 'prop-types';
import store from '../store';
import EventEmitter from '../events';

import { contentfulClient } from '../utils/contentful';

const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

const Context = React.createContext();

export class ProductStore extends Component {
  static propTypes = {
    productSlug: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
  };

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
        this.setState({ content: entry.items[0].fields });
      })
      .catch(() => {
        this.setState({ content: null });
      });

    EventEmitter.addListener('product.request.pdp', data => {
      if (data.status === 'success' && data.data) {
        const { product, variants, prices } = data.data;

        this.setState({ product, variants, prices });
      }
    });

    this.getProductData(stompClient, replyTo);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productSlug !== this.props.productSlug) {
      contentfulClient
        .getEntries({
          content_type: 'product',
          'fields.Slug': this.props.productSlug
        })
        .then(entry => {
          this.setState({ content: entry.items[0].fields });
        })
        .catch(() => {
          this.setState({ content: null });
        });
      const { stomp } = store.getState();
      const stompClient = stomp.client;
      const { replyTo } = stomp;
      this.getProductData(stompClient, replyTo);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const updated = !(
      nextState.product === null ||
      nextState.variants.length === 0 ||
      nextState.prices.length === 0
    );
    return updated;
  }

  getProductData(stompClient, replyTo) {
    const params = {
      params: {
        query: {
          slug: this.props.productSlug
        }
      }
    };

    const obj = JSON.stringify(msgpack.encode(params));

    stompClient.send(
      '/exchange/product/product.request.pdp',
      {
        'reply-to': replyTo,
        'correlation-id': ObjectId(),
        token: localStorageClient.get('olympusToken')
      },
      obj
    );
  }

  render() {
    return <Context.Provider value={{ ...this.state }}>{this.props.children}</Context.Provider>;
  }
}

export default Context;
