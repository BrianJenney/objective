import {
  REQUEST_CREATE_ORDER,
  RECEIVED_CREATE_ORDER,
  REQUEST_FIND_ALL_ORDERS,
  RECEIVED_FIND_ALL_ORDERS,
  REQUEST_GET_ORDER,
  RECEIVED_GET_ORDER,
  REQUEST_FIND_ORDERS_BY_ACCOUNT
} from './types';

const INITIAL_STATE = {
  isLoading: false,
  order: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CREATE_ORDER:
      return { ...state, isLoading: true, order: null };
    case RECEIVED_CREATE_ORDER:
      return { ...state, order: action.payload, isLoading: false };
    case REQUEST_FIND_ALL_ORDERS:
      return { ...state };
    case RECEIVED_FIND_ALL_ORDERS:
      return { ...state, ...action.payload };
    case REQUEST_GET_ORDER:
      return { ...state, isLoading: true, order: null };
    case RECEIVED_GET_ORDER:
      return { ...state, order: action.payload, isLoading: false };
    case REQUEST_FIND_ORDERS_BY_ACCOUNT:
      return { ...state };
    default:
      return state;
  }
};
