import { RECEIVED_FETCH_STOREFRONT, REQUEST_FETCH_STOREFRONT_SEO, RECIEVED_FETCH_STOREFRONT_SEO } from './types';
import { REQUEST_CREATE_ACCOUNT } from '../account/types';
import { fetchStorefrontSeo } from '../../utils/blog';

export const receivedFetchStorefront = storeFront => {
  return {
    type: RECEIVED_FETCH_STOREFRONT,
    payload: storeFront
  };
};

export const requestFetchStorefrontSeo = () => (dispatch) => {
  dispatch({
    type: REQUEST_FETCH_STOREFRONT_SEO,
  });
  const seoMap = fetchStorefrontSeo();
  dispatch({
    type: RECIEVED_FETCH_STOREFRONT_SEO,
    payload: seoMap
  });
};
