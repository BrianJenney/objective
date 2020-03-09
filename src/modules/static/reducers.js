import { REQUEST_PAGE } from './types';

const INITIAL_STATE = {
  page: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_PAGE:
      return { ...state };
    default:
      return state;
  }
};
