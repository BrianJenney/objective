import { REQUEST_PAGE, RECEIVED_PAGE } from './types';

const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestPage = slug => (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  console.log('this request page ', slug);
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
