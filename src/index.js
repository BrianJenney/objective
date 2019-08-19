import './config';
import Stomp from 'stompjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import App from './components/App';
import { connectStomp } from './modules/stomp/actions';
import store from './store';
import handleResponse from './responses';
import nxtTheme from './components/Theme/Theme';
import { SnackbarProvider } from 'notistack';

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
  stompClient.subscribe('/queue/' + replyTo, body => {
    handleResponse(body);
  }, {
    'auto-delete': true
  });
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={nxtTheme}>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top'}
          }
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
