import { FE_ORDER_SUBMITTED } from './types';

const localStorageClient = require('store');
const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

export const emitOrderSubmitted = args => async (dispatch, getState) => {
  dispatch({
    type: FE_ORDER_SUBMITTED,
    payload: { isLoading: true }
  });

  const { client: stompClient, replyTo } = getState().stomp;
  const { merchantAccountId } = getState().storefront;
  const params = {
    data: { ...args },
    params: {
      merchantAccountId,
      ...(localStorageClient.get('clickId') && {
        clickId: localStorageClient.get('clickId')
      })
    }
  };

  const payload = JSON.stringify(msgpack.encode(params));
  stompClient.send(
    '/exchange/fe-events/fe.order.submitted',
    {
      'reply-to': replyTo,
      'correlation-id': ObjectId(),
      token: localStorageClient.get('olympusToken')
    },
    payload
  );
  // @segment - Order Submitted Event
  window.analytics.track('Order Submitted', {
    cart_id: args.cartId
  });
};
