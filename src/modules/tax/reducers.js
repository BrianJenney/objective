import {
  REQUEST_CALCULATE_TAX,
  RECEIVED_CALCULATE_TAX,
} from './types';

const INITIAL_STATE = {
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CALCULATE_TAX:
      return { ...state, isLoading: true};

    case RECEIVED_CALCULATE_TAX:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
