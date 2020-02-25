import { OBJECTIVE_SPACE } from '../constants/contentfulSpaces';

const contentful = require('contentful');
const contentfulClient = contentful.createClient({
  space: OBJECTIVE_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN,
  host: process.env.REACT_APP_CONTENTFUL_HOSTNAME
});


export const fetchLP = async slug => {
  const response = await contentfulClient.getEntries({
    content_type: 'landingPage',
    'fields.slug': slug,
  });

  if (response.total < 1) {
    window.location.href = '/404';
  } else {
    anchorTagsToObj(response.items[0].fields.anchorTags.content);
    return response.items[0];
  }
};

export const anchorTagsToObj = data => {
  console.log('this anchor ', data);
};
