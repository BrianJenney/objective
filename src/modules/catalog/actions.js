import { REQUEST_FETCH_CATALOG, RECEIVED_FETCH_CATALOG } from './types';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const requestFetchCatalog = catalogId => async (dispatch, getState) => {
  const stompClient = getState().stomp.client;
  const replyTo = getState().stomp.replyTo;
  let params = {
    'id': catalogId
  };

  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/catalog/catalog.request.get', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);

  dispatch({
    type: REQUEST_FETCH_CATALOG,
    payload: {}
  });
};

export const receivedFetchCatalog = catalog => {
  return {
    type: RECEIVED_FETCH_CATALOG,
    payload: catalog
  };
};
