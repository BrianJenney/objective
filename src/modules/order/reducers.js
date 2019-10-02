import {
  REQUEST_CREATE_ORDER,
  RECEIVED_CREATE_ORDER_SUCCESS,
  RECEIVED_CREATE_ORDER_FAILURE,
  REQUEST_FIND_ALL_ORDERS,
  RECEIVED_FIND_ALL_ORDERS,
  REQUEST_GET_ORDER,
  RECEIVED_GET_ORDER,
  REQUEST_FIND_ORDERS_BY_ACCOUNT,
  REQUEST_REFUND_TRANSACTION,
  RECEIVED_TRANSACTION_REQUEST_REFUND,
  RESET_ORDER_STATE
} from './types';

const INITIAL_STATE = {
  isLoading: false,
  transactionError: null,
  order: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CREATE_ORDER:
      return { ...state, isLoading: true, transactionError: null };
    case RECEIVED_CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        isLoading: false,
        transactionError: false
      };
    case RECEIVED_CREATE_ORDER_FAILURE:
      return {
        ...state,
        order: action.payload,
        isLoading: false,
        transactionError: true
      };
    case REQUEST_FIND_ALL_ORDERS:
      return { ...state, isLoading: true };
    case RECEIVED_FIND_ALL_ORDERS:
      return { ...state, ...action.payload, isLoading: false };
    case REQUEST_GET_ORDER:
      return { ...state, isLoading: true, order: null };
    case RECEIVED_GET_ORDER:
      return { ...state, order: action.payload, isLoading: false };
    case REQUEST_FIND_ORDERS_BY_ACCOUNT:
      return { ...state };
    case REQUEST_REFUND_TRANSACTION:
      return { ...state, isLoading: true };
    case RECEIVED_TRANSACTION_REQUEST_REFUND:
      return { ...state, order: action.payload, isLoading: false };
    case RESET_ORDER_STATE:
      return { ...state, isLoading: false, transactionError: null }
    default:
      return state;
  }
};
