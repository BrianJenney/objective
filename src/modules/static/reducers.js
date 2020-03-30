import { REQUEST_PAGE, RECEIVED_PAGE } from './types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_PAGE:
      return { ...state };
    case RECEIVED_PAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
