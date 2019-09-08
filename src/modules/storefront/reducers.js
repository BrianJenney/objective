import { REQUEST_FETCH_STOREFRONT, RECEIVED_FETCH_STOREFRONT } from './types';

const localStorageClient = require('store');

const INITIAL_STATE = {
  name: '',
  domain: '',
  catalogId: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_FETCH_STOREFRONT:
      return { ...state };
    case RECEIVED_FETCH_STOREFRONT:
      if (typeof action.payload == 'undefined') {
        console.log('need to handle this gracefully');
      } else {
        localStorageClient.set('catalogId', action.payload.catalogId);
      }
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
