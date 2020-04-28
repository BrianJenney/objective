import { OBJECTIVE_SPACE } from '../constants/contentfulSpaces';

const contentful = require('contentful');
const contentfulClient = contentful.createClient({
  space: OBJECTIVE_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN,
  host: process.env.REACT_APP_CONTENTFUL_HOSTNAME
});

export const fetchBlogHome = async () => {
  const results = {};
  let response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.isFeatured': true,
    select:
      'fields.title,fields.featuredImage,fields.teaser,fields.minuteRead,fields.categories,fields.slug,fields.isFeaturedDisplayOrder',
    limit: 4,
    order: '-fields.isFeaturedDisplayOrder'
  });

  results.featured = response.items;

  const featuredIds = [];
  response.items.forEach(item => {
    featuredIds.push(item.sys.id);
  });

  response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    'sys.id[nin]': featuredIds.toString(),
    select: 'fields.title,fields.featuredImage,fields.teaser,fields.minuteRead,fields.categories,fields.slug',
    order: '-sys.updatedAt'
  });

  results.posts = response.items;

  return results;
};

export const fetchPost = async slug => {
  const response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug
  });

  if (response.total < 1) {
    // @TODO Need to redirect to a 404 page
  } else {
    return response.items[0];
  }
};

export const fetchPostsByCategory = async slug => {
  let response = await contentfulClient.getEntries({
    content_type: 'blogCategory',
    'fields.slug': slug
  });

  if (response.total < 1) {
    // @TODO need to throw a 404 here
  }

  const { title } = response.items[0].fields;

  response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.categories.sys.id': response.items[0].sys.id
  });

  if (response.total < 1) {
    // @TODO Need to redirect to a 404 page
  } else {
    return {
      title,
      posts: response.items
    };
  }
};

export const fetchPostsByTag = async slug => {
  let response = await contentfulClient.getEntries({
    content_type: 'blogTag',
    'fields.slug': slug
  });

  if (response.total < 1) {
    // @TODO need to throw a 404 here
  }

  const { tag } = response.items[0].fields;

  response = await contentfulClient.getEntries({
    content_type: 'blogPost',
    'fields.tags.sys.id': response.items[0].sys.id
  });

  if (response.total < 1) {
    // @TODO Need to redirect to a 404 page
  } else {
    return {
      tag,
      posts: response.items
    };
  }
};

export const fetchLinkedCategory = async id => {
  const response = await contentfulClient.getEntries({
    content_type: 'blogCategory',
    'sys.id': id
  });

  if (response.total < 1) {
    return null;
  }
  return response.items[0];
};

export const fetchStorefrontSeo = async () => {
  const seoMetadata = {};
  const response = await contentfulClient.getEntries({
    content_type: 'seoMetadata'
  });
  response.items.forEach(({ fields }) => {
    const { page, title, description } = fields;
    seoMetadata[page] = { title, description };
  });
  return seoMetadata;
};
