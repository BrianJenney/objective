import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import './config';
import Stomp from 'stompjs';
/* simple text-based protocol for message-oriented middleware.
 * It provides interoperable wire format allows STOMP clients to talk with any message broker supporting the protocol
 * without it, message will send lack of info to make Spring route it to a specific message handler method */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { SnackbarProvider } from 'notistack';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { makeStyles } from '@material-ui/core/styles';

import App from './App';
import store from './store';
import handleResponse from './responses';
import { connectStomp } from './modules/stomp/actions';

import nxtTheme from './components/Theme/Theme';
import './assets/styles/global.scss';
import './fonts/fonts.css';

import { createAnonymousToken } from './utils/token';
import { requestFetchStorefrontSeo } from './modules/storefront/actions';

import Voucherify from 'voucherify.js'

function voucherifyInit() {
  Voucherify.initialize(
    process.env.REACT_APP_VOUCHERIFY_APPLICATION_ID,
    process.env.REACT_APP_VOUCHERIFY_SECRET_KEY
  );
  Voucherify.setBaseUrl(process.env.REACT_APP_VOUCHERIFY_URL)
};

voucherifyInit();

const localStorageClient = require('store');
const ObjectId = require('bson-objectid');

const useStyles = makeStyles(() => ({
  success: { backgroundColor: 'green' },
  error: { backgroundColor: '#fad9dd', color: '#231f20' },
  warning: { backgroundColor: 'orange' },
  info: { backgroundColor: 'yellow' }
}));

const Main = () => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <IntlProvider locale="en">
        <ThemeProvider theme={nxtTheme}>
          <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'top'
            }}
            classes={{
              variantSuccess: classes.success,
              variantError: classes.error,
              variantWarning: classes.warning,
              variantInfo: classes.info
            }}
            autoHideDuration={2000}
          >
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </IntlProvider>
    </Provider>
  );
};

let olympusToken = null;
if (localStorageClient.get('olympusToken')) {
  // Validate is a JSON token (use decode not verify); at some point add token expiration
  olympusToken = localStorageClient.get('olympusToken');
} else {
  olympusToken = createAnonymousToken();
  localStorageClient.set('olympusToken', olympusToken);
}

const wss = new WebSocket(process.env.REACT_APP_CLOUDAMQP_HOSTNAME);
const stompClient = Stomp.over(wss);

if (process.env.REACT_APP_ENVIRONMENT !== 'development') {
  stompClient.debug = null;
}

const connectWebsocket = () => {
  console.log('Trying to connect to Websocket Server...');
  stompClient.connect(
    process.env.REACT_APP_CLOUDAMQP_USERNAME,
    process.env.REACT_APP_CLOUDAMQP_PASSWORD,
    onStompConnectSuccess,
    onStompConnectError,
    process.env.REACT_APP_CLOUDAMQP_USERNAME
  );
};

/**
 * STOMP connect success callback handler
 *
 * @return none
 */
const onStompConnectSuccess = async () => {
  console.log('Successfully Connected');
  const replyTo = ObjectId();

  store.dispatch(connectStomp(stompClient, replyTo));

  stompClient.subscribe(
    `/queue/${replyTo}`,
    body => {
      handleResponse(body);
    },
    {
      'auto-delete': true
    }
  );

  // Fetch seo metatags for storefront
  await store.dispatch(requestFetchStorefrontSeo(true));

  ReactDOM.render(<Main />, document.querySelector('#root'));
};

/**
 * STOMP connect error callback handler
 *
 * @param  object e
 */
const onStompConnectError = e => {
  triggerReconnect();
};

connectWebsocket();

const triggerReconnect = () => {
  // @TODO I'm sure we can do better than this --- but, for now, we'll leave it like this
  window.location.reload();
};

window.addEventListener('offline', () => {
  triggerReconnect();
});
window.addEventListener('online', () => {
  triggerReconnect();
});
