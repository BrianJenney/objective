import { REQUEST_FETCH_BOOTSTRAP, RECEIVED_FETCH_BOOTSTRAP } from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestFetchBootstrap = (storefrontCode, accountId, cartId) => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  const params = {
    storeCode: storefrontCode,
    accountId,
    cartId
  };

  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/bootstrap-orchestration/bootstrap-orchestration.request.get', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);

  dispatch({
    type: REQUEST_FETCH_BOOTSTRAP,
    payload: {}
  });
};
