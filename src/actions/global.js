import { INITIALIZE_APP } from '../constants/action-types';

export const initializeApp = (stompClient, replyTo) => {
  return {
    type: INITIALIZE_APP,
    payload: {
      stompClient, replyTo
    }
  };
};