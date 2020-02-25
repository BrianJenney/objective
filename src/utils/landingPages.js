import { get, isEmpty, omit } from 'lodash';
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
    'fields.slug': slug
  });

  if (response.total < 1) {
    window.location.href = '/404';
  } else {
    const anchorTags = transformAnchorTags(response);
    //console.log('this response', response.items[0]);
    // console.log('this ', response.items[0].fields.title);
    return {
      slug: response.items[0].fields.slug,
      anchorTags,
      title: response.items[0].fields.title,
      subtitle: response.items[0].fields.subTitle
    };
  }
};

export const transformAnchorTags = data => {
  const anchorTags = [];
  if (!isEmpty(data.items[0].fields.anchorTags.content)) {
    data.items[0].fields.anchorTags.content.map(item => {
      if (item.nodeType === 'embedded-entry-block') {
        anchorTags.push({
          title: item.data.target.fields.title,
          scrollToId: item.data.target.fields.scrollToId,
          content: item.data.target.fields.content.content[0].content[0].value
        });
      }
    });
  }
  return anchorTags;
};
