import {
  REQUEST_CALCULATE_TAX,
  RECEIVED_CALCULATE_TAX,
} from './types';

const INITIAL_STATE = {
  isLoading: false,
  tax: null,
  rate: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CALCULATE_TAX:
      return { ...state, isLoading: true, tax: null, rate: null };

    case RECEIVED_CALCULATE_TAX:
      const { tax, rate} = action.payload;
      return { ...state, tax, rate,  isLoading: false };

    default:
      return state;
  }
};
