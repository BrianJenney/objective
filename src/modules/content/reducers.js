import { REQUEST_FETCH_CONTENT, RECEIVED_FETCH_CONTENT } from './types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_FETCH_CONTENT:
      return { ...state };
    case RECEIVED_FETCH_CONTENT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};