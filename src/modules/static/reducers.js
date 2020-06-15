import {
  REQUEST_PAGE,
  RECEIVED_PAGE,
  REQUEST_PRIVACY,
  RECEIVED_PRIVACY,
  REQUEST_PROMOBANNER,
  RECEIVED_PROMOBANNER
} from './types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_PAGE || REQUEST_PRIVACY || REQUEST_PROMOBANNER:
      return { ...state };
    case RECEIVED_PAGE || RECEIVED_PRIVACY || RECEIVED_PROMOBANNER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
