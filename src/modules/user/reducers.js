import { REQUEST_FETCH_USERINFO, RECEIVED_FETCH_USERINFO } from './types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_FETCH_USERINFO:
      return { ...state };
    case RECEIVED_FETCH_USERINFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};