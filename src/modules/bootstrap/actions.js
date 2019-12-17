import { REQUEST_FETCH_BOOTSTRAP, RECEIVED_FETCH_BOOTSTRAP } from './types';

const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestFetchBootstrap = (storefrontCode, accountId, cartId) => async (dispatch, getState) => {
  const { client: stompClient, replyTo } = getState().stomp;
  const params = {
    storeCode: storefrontCode,
    accountId,
    cartId
  };

  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/bootstrap-orchestration/bootstrap-orchestration.request.get', {
    'reply-to': replyTo,
    'correlation-id': ObjectId(),
    'token': localStorageClient.get('olympusToken')
  }, obj);

  dispatch({
    type: REQUEST_FETCH_BOOTSTRAP,
    payload: {}
  });
};
