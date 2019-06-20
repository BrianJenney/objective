import { FETCH_STOREFRONT } from '../constants/action-types';
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const fetchStore = storefrontId => async (dispatch, getState) => {
  const stompClient = getState().global.stompClient;
  const replyTo = getState().global.replyTo;
  const params = {
    'params': {
      '_id': storefrontId
    }
  };
  var obj = JSON.stringify(msgpack.encode(params));
  stompClient.send('/exchange/store/store.request.find', {
    'reply-to': replyTo,
    'correlation-id': ObjectId()
  }, obj);
  dispatch({
    type: FETCH_STOREFRONT,
    payload: {}
  });
}