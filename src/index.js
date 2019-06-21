import './config';
import Stomp from 'stompjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import { connectStomp } from './modules/stomp/actions';
import store from './store';
import handleResponse from './responses';

const ObjectId = require('bson-objectid');

const wss = new WebSocket(process.env.REACT_APP_CLOUDAMQP_HOSTNAME);
const stompClient = Stomp.over(wss);
const replyTo = ObjectId();

stompClient.connect(process.env.REACT_APP_CLOUDAMQP_USERNAME, process.env.REACT_APP_CLOUDAMQP_PASSWORD, () => {
  console.log('Successfully Connected');
  store.dispatch(connectStomp(stompClient, replyTo));
  stompClient.subscribe('/queue/' + replyTo, body => {
    handleResponse(body);
  }, {
    'auto-delete': true
  });
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#root')
  );
}, e => {
  console.log('******************** Error: ' + e);
  // Render a "Site down" page
}, process.env.REACT_APP_CLOUDAMQP_USERNAME);