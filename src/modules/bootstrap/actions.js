import { REQUEST_FETCH_BOOTSTRAP } from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');
const localStorageClient = require('store');

export const requestFetchBootstrap = () => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const cartId = localStorageClient.get('cartId');

  const params = {
    cartId
  };

  const obj = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/bootstrap-orchestration/bootstrap-orchestration.request.get',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    obj
  );

  dispatch({
    type: REQUEST_FETCH_BOOTSTRAP,
    payload: {}
  });
};
