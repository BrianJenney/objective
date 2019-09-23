import { REQUEST_FETCH_BOOTSTRAP } from './types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_FETCH_BOOTSTRAP:
      return state;
    default:
      return state;
  }
};
