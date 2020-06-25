import {
  REQUEST_PAGE,
  RECEIVED_PAGE,
  REQUEST_PRIVACY,
  RECEIVED_PRIVACY,
  PAGE_ERROR
} from './types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_PAGE:
      return { ...state };
    case RECEIVED_PAGE:
      return { ...state, ...action.payload };
    case REQUEST_PRIVACY:
      return { ...state };
    case RECEIVED_PRIVACY:
      return { ...state, ...action.payload };
    case PAGE_ERROR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
