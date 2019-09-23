import { RECEIVED_FETCH_CATALOG } from './types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVED_FETCH_CATALOG:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
