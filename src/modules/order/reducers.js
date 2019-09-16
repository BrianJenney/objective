import {
  REQUEST_CREATE_ORDER,
  RECEIVED_CREATE_ORDER,
  REQUEST_FIND_ALL_ORDERS,
  RECEIVED_FIND_ALL_ORDERS,
  REQUEST_GET_ORDER,
  RECEIVED_GET_ORDER,
  REQUEST_FIND_ORDERS_BY_ACCOUNT
} from './types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CREATE_ORDER:
      return { ...state };
    case RECEIVED_CREATE_ORDER:
      return { ...state, ...action.payload };
    case REQUEST_FIND_ALL_ORDERS:
      return { ...state };
    case RECEIVED_FIND_ALL_ORDERS:
      return { ...state, ...action.payload };
    case REQUEST_GET_ORDER:
      return { ...state };
    case RECEIVED_GET_ORDER:
      return { ...state, ...action.payload };
    case REQUEST_FIND_ORDERS_BY_ACCOUNT:
      return { ...state };
    default:
      return state;
  }
};
