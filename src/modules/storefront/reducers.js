import {
  RECEIVED_FETCH_STOREFRONT,
  RECIEVED_FETCH_STOREFRONT_SEO
} from './types';

const INITIAL_STATE = {
  name: '',
  domain: '',
  catalogId: '',
  seoMap: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVED_FETCH_STOREFRONT:
      if (typeof action.payload === 'undefined') {
        console.log('need to handle this gracefully');
      }
      return { ...state, ...action.payload };

    case RECIEVED_FETCH_STOREFRONT_SEO:
      return {
        ...state,
        seoMap: action.payload
      };

    default:
      return state;
  }
};
