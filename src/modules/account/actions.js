import {
  REQUEST_CREATE_ACCOUNT,
  RECEIVED_CREATE_ACCOUNT_SUCCESS,
  RECEIVED_CREATE_ACCOUNT_FAILURE,
  CLEAR_CREATE_ACCOUNT_ERROR,
  REQUEST_FETCH_ACCOUNT,
  RECEIVED_FETCH_ACCOUNT_SUCCESS,
  RECEIVED_FETCH_ACCOUNT_FAILURE,
  CLEAR_FETCH_ACCOUNT_ERROR,
  RECEIVED_FIND_ORDERS_BY_ACCOUNT,
  REQUEST_LOGIN,
  RECEIVED_LOGIN_SUCCESS,
  RECEIVED_LOGIN_FAILURE,
  CLEAR_LOGIN_ERROR,
  REQUEST_PATCH_ACCOUNT,
  RECEIVED_PATCH_ACCOUNT_SUCCESS,
  RECEIVED_PATCH_ACCOUNT_FAILURE,
  CLEAR_PATCH_ACCOUNT_ERROR,
  REQUEST_CHANGE_PASSWORD,
  RECEIVED_CHANGE_PASSWORD_SUCCESS,
  RECEIVED_CHANGE_PASSWORD_FAILURE,
  CLEAR_CHANGE_PASSWORD_ERROR,
  REQUEST_LOGOUT,
  REQUEST_FORGOT_PASSWORD,
  REQUEST_SIGNUP_EMAIL,
  REQUEST_PASSWORD_RESET,
  RECEIVED_PASSWORD_RESET_SUCCESS,
  RECEIVED_PASSWORD_RESET_FAILURE,
  REQUEST_CHECK_EMAIL_EXISTENCE,
  RECEIVED_CHECK_EMAIL_EXISTENCE
} from './types';
import EventEmitter from '../../events';
import { unsetCheckoutPaypalPayload } from '../paypal/actions';
import returnSiteLocation from '../../utils/segmentSiteLocation';
const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestCreateAccount = account => (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const { firstName, lastName, email, password, newsletter } = account;

  const params = {
    data: {
      firstName,
      lastName,
      email,
      password,
      newsletter
    }
  };

  if (account.hasOwnProperty('isGuest')) {
    params.data.isGuest = account.isGuest;
  }

  if (account.hasOwnProperty('disableGuestLogic')) {
    params.data.disableGuestLogic = account.disableGuestLogic;
  }

  if (account.hasOwnProperty('passwordSet')) {
    params.data.passwordSet = account.passwordSet;
  }

  const payload = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/account/account.request.register',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );

  dispatch({
    type: REQUEST_CREATE_ACCOUNT,
    payload: {}
  });

  window.analytics.track('Sign Up Email Capture', {
    email
  });
};

export const receivedCreateAccountSuccess = (account, token) => dispatch => {
  EventEmitter.emit('account.created', {
    account,
    token
  });

  dispatch({
    type: RECEIVED_CREATE_ACCOUNT_SUCCESS,
    payload: account
  });

  window.analytics.track('Account Created', {
    email: account.email,
    first_name: account.firstName,
    last_name: account.lastName,
    phone: '',
    signup_type: 'organic',
    title: '',
    username: account.email,
    site_location: 'account creation'
  });

  if (account.newsletter) {
    window.analytics.track('Subscribed', {
      email: account.email,
      site_location: 'account creation'
    });

    window.analytics.track('Subscribed Listrak Auto', {
      email: account.email,
      site_location: 'account creation'
    });
  }
};

export const receivedCreateAccountFailure = error => dispatch => {
  dispatch({
    type: RECEIVED_CREATE_ACCOUNT_FAILURE,
    payload: error
  });

  window.analytics.track('Sign Up Failed', {
    error_message: 'Account with email already exists'
  });
};

export const clearCreateAccountError = () => dispatch => {
  dispatch({
    type: CLEAR_CREATE_ACCOUNT_ERROR
  });
};

export const requestFetchAccount = (data, find = false) => (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = find
    ? { params: { ...data, token: localStorageClient.get('olympusToken') } }
    : data;
  const payload = JSON.stringify(msgpack.encode(params));
  const exchangeTopic = find
    ? '/exchange/account/account.request.find'
    : '/exchange/account/account.request.get';
  stompClient.send(
    exchangeTopic,
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );

  dispatch({
    type: REQUEST_FETCH_ACCOUNT,
    payload: {}
  });
};

export const receivedFetchAccountSuccess = account => dispatch => {
  dispatch({
    type: RECEIVED_FETCH_ACCOUNT_SUCCESS,
    payload: account
  });
};

export const receivedFetchAccountFailure = error => dispatch => {
  dispatch({
    type: RECEIVED_FETCH_ACCOUNT_FAILURE,
    payload: error
  });
};

export const clearFetchAccountError = () => dispatch => {
  dispatch({
    type: CLEAR_FETCH_ACCOUNT_ERROR
  });
};

export const requestPatchAccount = (authToken, patches, actions) => (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    id: authToken,
    data: patches,
    params: {
      account_jwt: authToken
    }
  };

  const payload = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/account/account.request.patch',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );

  dispatch({
    type: REQUEST_PATCH_ACCOUNT,
    payload: {},
    onSuccess: () => {
      if (actions) {
        actions.setSubmitting(false);
      }
    },
    onFailure: () => {
      if (actions) {
        actions.setSubmitting(false);
      }
    }
  });
};

export const receivedPatchAccountSuccess = account => dispatch => {
  dispatch({
    type: RECEIVED_PATCH_ACCOUNT_SUCCESS,
    payload: account
  });
};

export const receivedPatchAccountFailure = patchError => dispatch => {
  dispatch({
    type: RECEIVED_PATCH_ACCOUNT_FAILURE,
    payload: patchError
  });
};

export const clearPatchAccountError = () => dispatch => {
  dispatch({
    type: CLEAR_PATCH_ACCOUNT_ERROR
  });
};

export const requestChangePassword = (authToken, patches, { setSubmitting }) => (
  dispatch,
  getState
) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    id: authToken,
    data: patches,
    params: {
      account_jwt: authToken
    }
  };

  const payload = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/account/account.request.changePassword',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );

  dispatch({
    type: REQUEST_CHANGE_PASSWORD,
    payload: {},
    onSuccess: () => setSubmitting(false),
    onFailure: () => setSubmitting(false)
  });
};

export const receivedChangePasswordSuccess = account => dispatch => {
  dispatch({
    type: RECEIVED_CHANGE_PASSWORD_SUCCESS,
    payload: account
  });
};

export const receivedChangePasswordFailure = patchError => dispatch => {
  dispatch({
    type: RECEIVED_CHANGE_PASSWORD_FAILURE,
    payload: patchError
  });
};

export const clearChangePasswordError = () => dispatch => {
  dispatch({
    type: CLEAR_CHANGE_PASSWORD_ERROR
  });
};

export const requestLogin = ({ email, password }, { setSubmitting }) => (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    params: {
      query: {
        email,
        password
      },
      collation: {
        locale: 'en_US',
        strength: 2
      }
    }
  };
  const payload = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/account/account.request.login',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );

  dispatch({
    type: REQUEST_LOGIN,
    payload: {},
    onSuccess: () => setSubmitting(false),
    onFailure: () => setSubmitting(false)
  });

  window.analytics.track('Sign In Completed', {
    email,
    site_location: returnSiteLocation()
  });
};

export const receivedLoginSuccess = (account, token) => dispatch => {
  dispatch({
    type: RECEIVED_LOGIN_SUCCESS,
    payload: account
  });

  EventEmitter.emit('user.logged.in', {
    account,
    token
  });

  window.analytics.track('Sign In Successful', {
    method: 'email',
    site_location: returnSiteLocation(),
    username: account.email
  });
};

export const receivedLoginFailure = loginError => dispatch => {
  dispatch({
    type: RECEIVED_LOGIN_FAILURE,
    payload: loginError
  });

  window.analytics.track('Sign In Failed', {
    error_message: 'Incorrect Email/Password',
    method: 'email',
    site_location: ''
  });
};

export const clearLoginError = () => dispatch => {
  dispatch({
    type: CLEAR_LOGIN_ERROR
  });
};

export const requestLogout = () => dispatch => {
  dispatch({
    type: REQUEST_LOGOUT,
    payload: {}
  });

  dispatch(unsetCheckoutPaypalPayload());

  EventEmitter.emit('user.logged.out', {});
};

export const receivedFindOrdersByAccount = orders => dispatch => {
  dispatch({
    type: RECEIVED_FIND_ORDERS_BY_ACCOUNT,
    payload: orders
  });
};

export const requestForgotPassword = (email, url) => (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    params: {
      query: {
        email,
        url
      },
      collation: {
        locale: 'en_US',
        strength: 2
      }
    }
  };
  const payload = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/account/account.request.forgotpassword',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );

  dispatch({
    type: REQUEST_FORGOT_PASSWORD,
    payload: {}
  });

  window.analytics.track('Forgot Password Request Started', {
    email
  });
};

export const requestSignupEmail = email => (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    params: {
      query: {
        email
      }
    }
  };
  const payload = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/account/account.request.signupemail',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );

  dispatch({
    type: REQUEST_SIGNUP_EMAIL,
    payload: {}
  });
};

export const requestPasswordReset = (authToken, patches, actions) => (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    id: authToken,
    data: patches,
    params: {
      account_jwt: authToken
    }
  };

  const payload = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/account/account.request.resetpassword',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: authToken
    },
    payload
  );

  dispatch({
    type: REQUEST_PASSWORD_RESET,
    payload: {},
    onSuccess: () => {
      if (actions) {
        actions.setSubmitting(false);
      }
    },
    onFailure: () => {
      if (actions) {
        actions.setSubmitting(false);
      }
    }
  });
};

export const receivedPasswordResetSuccess = (account, token) => dispatch => {
  dispatch({
    type: RECEIVED_PASSWORD_RESET_SUCCESS,
    payload: account
  });
};

export const receivedPasswordResetFailure = resetError => dispatch => {
  dispatch({
    type: RECEIVED_PASSWORD_RESET_FAILURE,
    payload: resetError
  });
};

export const requestCheckEmailExistence = email => (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    email
  };
  const payload = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/account/account.request.checkEmailExistence',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );

  dispatch({
    type: REQUEST_CHECK_EMAIL_EXISTENCE,
    payload: {}
  });
};

export const receivedCheckEmailExistence = exists => dispatch => {
  dispatch({
    type: RECEIVED_CHECK_EMAIL_EXISTENCE,
    payload: exists
  });
};
