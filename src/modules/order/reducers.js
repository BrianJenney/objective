import {
  REQUEST_CREATE_ORDER,
  RECEIVED_CREATE_ORDER,
  REQUEST_FIND_ALL_ORDERS,
  RECEIVED_FIND_ALL_ORDERS,
  REQUEST_GET_ORDER,
  RECEIVED_GET_ORDER,
  REQUEST_FIND_ORDERS_BY_ACCOUNT,
  REQUEST_REFUND_TRANSACTION,
  RECEIVED_TRANSACTION_REQUEST_REFUND
} from './types';

const INITIAL_STATE = {
  isLoading: false,
  order: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CREATE_ORDER:
      return { ...state, isLoading: true, order: null };
    case RECEIVED_CREATE_ORDER:
      console.log(action);
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
    case REQUEST_REFUND_TRANSACTION:
      return { ...state, refunding: true };
    case RECEIVED_TRANSACTION_REQUEST_REFUND:
      console.log('reducer');
      return { ...state, order: action.payload, refunding: false };
    default:
      return state;
  }
};
