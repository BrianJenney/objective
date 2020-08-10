import { BURTS_SPACE, OBJECTIVE_SPACE } from '../constants/contentfulSpaces';

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
  space: OBJECTIVE_SPACE,
  ...clientVars
});

export const burtsClient = contentful.createClient({
  space: BURTS_SPACE,
  accessToken: 'mgKV0OtFwTLvHw5_OAFeGLQ9SOzPVg5M_IBoIVBJ9H0',
  host: process.env.REACT_APP_CONTENTFUL_HOSTNAME
});
