import React, { Component } from 'react';

import { Container } from 'semantic-ui-react';

import store from '../store';
import { EventEmitter } from '../events';

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

  renderContent(content) {
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
    const { content } = this.state;

    return this.renderContent(content);
  }
}

export default Static;