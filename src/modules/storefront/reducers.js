import { RECEIVED_FETCH_STOREFRONT } from './types';

const INITIAL_STATE = {
  name: '',
  domain: '',
  catalogId: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVED_FETCH_STOREFRONT:
      if (typeof action.payload == 'undefined') {
        console.log('need to handle this gracefully');
      }
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
