import {
  REQUEST_FETCH_ACCOUNT,
  RECEIVED_FETCH_ACCOUNT,
  REQUEST_LOGIN_ATTEMPT,
  RECEIVED_LOGIN_FAILURE,
  RECEIVED_LOGIN_SUCCESS,
  REQUEST_PATCH_ACCOUNT,
  RECEIVED_PATCH_ACCOUNT
} from './types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_FETCH_ACCOUNT:
      return { ...state };
    case RECEIVED_FETCH_ACCOUNT:
      return { ...state, ...action.payload };
    case REQUEST_PATCH_ACCOUNT:
      return { ...state };
    case RECEIVED_PATCH_ACCOUNT:
      return { ...state, ...action.payload };
    case REQUEST_LOGIN_ATTEMPT:
      return { ...state };
    case RECEIVED_LOGIN_FAILURE:
      return { ...state };
    case RECEIVED_LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
