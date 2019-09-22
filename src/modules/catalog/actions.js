import { RECEIVED_FETCH_CATALOG } from './types';

export const receivedFetchCatalog = catalog => {
  return {
    type: RECEIVED_FETCH_CATALOG,
    payload: catalog
  };
};
