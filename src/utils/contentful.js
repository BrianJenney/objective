import { BURTS_SPACE } from '../constants/contentfulSpaces';

const contentful = require('contentful');

const productionVars = {
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN,
  host: process.env.REACT_APP_CONTENTFUL_HOSTNAME
};
const previewVars = {
  accessToken: process.env.REACT_APP_CONTENTFUL_PREVIEW_TOKEN,
  host: process.env.REACT_APP_CONTENTFUL_PREVIEW_HOSTNAME
};

const { hostname } = window.location;
const clientVars =
  hostname === 'preview.localhost' || hostname.split('-')[0] === 'preview'
    ? previewVars
    : productionVars;

export const contentfulClient = contentful.createClient({
  space: BURTS_SPACE,
  ...clientVars
});
