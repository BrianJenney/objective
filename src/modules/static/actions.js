import { REQUEST_PAGE, RECEIVED_PAGE, REQUEST_PRIVACY, RECEIVED_PRIVACY } from './types';

const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');
const nodeCache = require( "node-cache" );

const myCache = new nodeCache( { stdTTL: 100, checkperiod: 120 } );

export const requestPage = slug => (dispatch, getState) => {

  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    params: {
      query: {
        slug
      },
      collation: {
        locale: 'en_US',
        strength: 2
      }
    }
  };
  const payload = JSON.stringify(msgpack.encode(params));

  stompClient.send(
    '/exchange/content/content.request.contentful',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );

  dispatch({
    type: REQUEST_PAGE,
    payload: {}
  });
};

export const receivedPage = page => async (dispatch, getState) => {
  dispatch({
    type: RECEIVED_PAGE,
    payload: page
  });
};

export const requestPrivacy = slug => (dispatch, getState) => {
  if (slug === undefined) {
    slug = "";
  }
  // If page is in cache, fake a received event to redux
  const cacheKey =  'privacy-' + slug;
  const page = myCache.get(cacheKey);
  if (page !== undefined) {
    dispatch({
      type: RECEIVED_PRIVACY,
      payload: page
    });
  }

  // Otherwise, send message to microservice to fetch page
  else {
    const { client: stompClient, replyTo } = getState().stomp;
    const params = {
      params: {
        query: {
          slug
        }
      }
    };
    const payload = JSON.stringify(msgpack.encode(params));
    stompClient.send(
      '/exchange/content/content.request.privacy',
      {
        'reply-to': replyTo,
        'correlation-id': ObjectId(),
        token: localStorageClient.get('olympusToken')
      },
      payload
    );

    // Let redux know we send request... why?
    dispatch({
      type: REQUEST_PRIVACY,
      payload: {}
    });
  }
};

export const receivedPrivacy = page => async (dispatch, getState) => {
  //  Store page in cache, name make it last one hour
  const cacheKey =  'privacy-' + page.slug;
  myCache.set(cacheKey, page, 3600);

  // Send received event to redux
  dispatch({
    type: RECEIVED_PRIVACY,
    payload: page
  });
};