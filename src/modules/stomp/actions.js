import { CONNECT_STOMP } from './types';

export const connectStomp = (stompClient, replyTo) => {
  return {
    type: CONNECT_STOMP,
    payload: {
      'client': stompClient,
      replyTo
    }
  };
};