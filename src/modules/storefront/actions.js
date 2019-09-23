import { RECEIVED_FETCH_STOREFRONT } from './types';

export const receivedFetchStorefront = storeFront => {
  return {
    type: RECEIVED_FETCH_STOREFRONT,
    payload: storeFront
  };
};