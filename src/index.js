import './config';
import Stomp from 'stompjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import { initializeApp } from './actions';
import store from './store';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

const wss = new WebSocket(process.env.REACT_APP_CLOUDAMQP_HOSTNAME);
const stompClient = Stomp.over(wss);
const replyTo = ObjectId();

stompClient.connect(process.env.REACT_APP_CLOUDAMQP_USERNAME, process.env.REACT_APP_CLOUDAMQP_PASSWORD, () => {
  console.log('Successfully Connected');
  store.dispatch(initializeApp(stompClient, replyTo));
  stompClient.subscribe('/queue/' + replyTo, msg => {
    let obj = JSON.parse(msg.body);
    let json = JSON.parse(msgpack.decode(obj.data));
    console.log('****************** Response ******************');
    console.log(json.data);
    console.log(json.fields);
    console.log(json.properties);
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