import { OBJECTIVE_SPACE } from '../constants/contentfulSpaces';

const contentful = require('contentful');
const contentfulClient = contentful.createClient({
  space: OBJECTIVE_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
});

export const fetchBlogHome = async () => {
  let results = {};
  let response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.isFeatured': true,
    select: 'fields.title,fields.featuredImage,fields.teaser,fields.minuteRead,fields.categories,fields.slug,fields.isFeaturedDisplayOrder',
    limit: 4,
    order: '-fields.isFeaturedDisplayOrder'
  });

  results.featured = response.items;

  let featuredIds = [];
  response.items.forEach(item => {
    featuredIds.push(item.sys.id);
  });

  response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    'sys.id[nin]': featuredIds.toString(),
    select: 'fields.title,fields.featuredImage,fields.teaser,fields.minuteRead,fields.categories,fields.slug',
    limit: 8 - featuredIds.length,
    order: '-sys.updatedAt'
  });

  results.posts = response.items;

  return results;
}

export const fetchPost = async slug => {
  let response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug
  });

  if (response.total < 1) {
    // @TODO Need to redirect to a 404 page
  } else {
    return response.items[0];
  }
}