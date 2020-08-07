import { RECEIVED_FETCH_STOREFRONT, RECIEVED_FETCH_STOREFRONT_SEO } from './types';
import { fetchStorefrontSeo } from '../../utils/blog';

export const receivedFetchStorefront = storeFront => ({
  type: RECEIVED_FETCH_STOREFRONT,
  payload: storeFront
});

export const requestFetchStorefrontSeo = loadingFromContentFul => async dispatch => {
  const seoMap = await fetchStorefrontSeo(loadingFromContentFul);
  dispatch({
    type: RECIEVED_FETCH_STOREFRONT_SEO,
    payload: seoMap
  });
};
