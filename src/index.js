import './config';
import Stomp from 'stompjs'; //simple text-based protocol for message-oriented middleware.
//It provides interoperable wire format allows STOMP clients to talk with any message broker supporting the protocol
//without it, message will send lack of info to make Spring route it to a specific message handler method
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import { connectStomp } from './modules/stomp/actions';
import store from './store';
import handleResponse from './responses';
import nxtTheme from './components/Theme/Theme';

const ObjectId = require('bson-objectid');

const wss = new WebSocket(process.env.REACT_APP_CLOUDAMQP_HOSTNAME);
const stompClient = Stomp.over(wss);
const replyTo = ObjectId();

/**
 * STOMP connect success callback handler
 *
 * @return none
 */

const onStompConnectSuccess = () => {
  console.log('Successfully Connected');
  store.dispatch(connectStomp(stompClient, replyTo));
  stompClient.subscribe(
    '/queue/' + replyTo,
    body => {
      handleResponse(body);
    },
    {
      'auto-delete': true
    }
  );
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={nxtTheme}>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top'
          }}
        >
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>,
    document.querySelector('#root')
  );
};

/**
 * STOMP connect error callback handler
 *
 * @param  object e
 */
const onStompConnectError = e => {
  console.log('******************** Error: ' + e);
  // Render a "Site down" page
};

/**
 * @todo
 *
 * Need to handle disconnections
 * - Reconnect
 * - Make sure we didn't lose any messages
 */
stompClient.connect(
  process.env.REACT_APP_CLOUDAMQP_USERNAME,
  process.env.REACT_APP_CLOUDAMQP_PASSWORD,
  onStompConnectSuccess,
  onStompConnectError,
  process.env.REACT_APP_CLOUDAMQP_USERNAME
);
