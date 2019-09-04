import { REQUEST_FETCH_CATALOG, RECEIVED_FETCH_CATALOG } from './types';

const localStorageClient = require('store');

const INITIAL_STATE = {
  products: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_FETCH_CATALOG:
      return { ...state };
    case RECEIVED_FETCH_CATALOG:
      localStorageClient.set('products', action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
