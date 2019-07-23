import React, { Component } from 'react';

import store from '../store';
import { EventEmitter } from '../events';
import Container from '@material-ui/core/Container';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

class Static extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    EventEmitter.subscribe('content.request.find', data => {
      this.setState({ 'content': data.data.data[0].content });
    });
  }

  componentDidMount() {
    this.getStaticData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page)
      this.getStaticData();
  }

  getStaticData() {
    const { stomp } = store.getState();
    const stompClient = stomp.client;
    const replyTo = stomp.replyTo;
    const { page } = this.props.match.params;
    const params = {
      'params': {
        'query': {
          'slug': page
        }
      }
    };

    var obj = JSON.stringify(msgpack.encode(params));
    stompClient.send('/exchange/content/content.request.find', {
      'reply-to': replyTo,
      'correlation-id': ObjectId()
    }, obj);
  }

  renderContent() {
    if (!this.state.content)
      return <div></div>;

    let { content } = this.state;

    if (content === '404') {
      return <Container><p>404 Page</p></Container>;
    } else {
      return (
        <Container>
          <div dangerouslySetInnerHTML={{__html: content}} />
        </Container>
      );
    }
  }

  render() {
    return this.renderContent();
  }
}

export default Static;