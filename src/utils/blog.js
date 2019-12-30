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
    limit: 15 - featuredIds.length,
    order: '-sys.updatedAt'
  });

  results.posts = response.items;

  return results;
};

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
};

export const fetchPostsByCategory = async slug => {
  let response = await contentfulClient.getEntries({
    content_type: 'blogCategory',
    'fields.slug': slug
  });

  if (response.total < 1) {
    // @TODO need to throw a 404 here
  }

  let title = response.items[0].fields.title;

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
    }
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

  let tag = response.items[0].fields.tag;

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
    }
  }
};

export const fetchLinkedCategory = async id => {
  let response = await contentfulClient.getEntries({
    content_type: 'blogCategory',
    'sys.id': id
  });

  if (response.total < 1) {
    return null;
  } else {
    return response.items[0];
  }
};

const defaultSeoMap = {
  home: { title: 'Home | Objective', description: 'Objective Home'},
  gallery: { title: 'Gallery | Objective', description: 'Gallery of products from Objective'},
  contact: { title: 'Contact Us | Objective', description: 'Contact us at Objective'},
  faq: { title: 'FAQ | Objective', description: 'Frequently Asked Questions at Objective'},
  about_us: { title: 'About Us | Objective', description: 'About us at Objective'},
  privacypolicy: { title: 'Privacy Policy | Objective', description: 'Privacy Policy at Objective'},
  terms: { title: 'Terms of Use | Objective', description: 'Terms of Use at Objective'},
  journal: { title: 'The Journal | Objective', description: 'The Journal at Objective'},
  product_slugs: {
    'immune-wellness': { title: 'Immune + Wellness | Objective' , description: 'Immune + Wellness - 60 Gummies'},
    'proactive-prostate': { title: 'Proactive Prostate | Objective', description: 'Proactive Prostate - 60 Softgels'},
    'full-body-fix': { title: 'Full Body Fix | Objective', description: 'Full Body Fix - 60 Veggie Capsules '},
    'everything-armor': { title: 'Everything Armor | Objective', description: 'Everything Armor - 30 Softgels'},
    'healthy-blood-flow': { title: 'Healthy Blood Flow | Objective', description: 'Healthy Blood Flow - 60 Veggie Capsules'},
    'weight-loss-energy': { title: 'Weight Loss + Energy | Objective', description: 'Weight Loss + Energy - 60 Veggie Capsules'},
    'relief-cooling': { title: 'Relief + Cooling | Objective', description: 'Relief + Cooling - 3FL oz'},
    'keep-cool': { title: 'Keep Cool | Objective', description: 'Keep Cool - 30 Veggie Capsules'},
    'focus-clarity': { title: 'Focus + Clarity | Objective', description: 'Focus + Clarity - 30 Veggie Capsules'},
    'fast-asleep': { title: 'Fast Asleep | Objective', description: 'Fast Asleep - 30 Chocolates'},
    'smooth-luminous': { title: 'Smooth + Luminous | Objective', description: 'Smooth + Luminous - 2.7oz'},
    'lift-smooth': { title: 'Lift + Smooth | Objective', description: 'Lift + Smooth - 8oz'}
  },
  journal_category_slugs: {
    'health-and-wellness': { title: 'Health And Wellness - Journal Category | Objective', description: 'Objective Journal Category: Health And Wellness'},
    'science': { title: 'Science - Journal Category | Objective', description: 'Objective Journal Category: Science'},
  },
  journal_tag_slugs: {
    'antioxidants': { title: 'Antioxidants - Journal Tag | Objective', description: 'Objective Journal Tag: Antioxidants'},
    'brain-health': { title: 'Brain Health - Journal Tag | Objective', description: 'Objective Journal Tag: Brain Health'},
    'free-radicals': { title: 'Free Radicals - Journal Tag | Objective', description: 'Objective Journal Tag: Free Radicals'},
    'immune-health': { title: 'Immune Health - Journal Tag | Objective', description: 'Objective Journal Tag: Immune Health'},
    'seasonal-support': { title: 'Seasonal Support - Journal Tag | Objective', description: 'Objective Journal Tag: Seasonal Support'},
    'womens-health': { title: 'Womens Health - Journal Tag | Objective', description: 'Objective Journal Tag: Womens Health'},
    'astaxanthin': { title: 'Astaxanthin - Journal Tag | Objective', description: 'Objective Journal Tag: Astaxanthin'},
    'inflammation': { title: 'Inflammation - Journal Tag | Objective', description: 'Objective Journal Tag: Inflammation'},
    'skin-health': { title: 'Skin Health - Journal Tag | Objective', description: 'Objective Journal Tag: Skin Health'},
    'beauty': { title: 'Beauty - Journal Tag | Objective', description: 'Objective Journal Tag: Beauty'},
    'studies': { title: 'Studies - Journal Tag | Objective', description: 'Objective Journal Tag: Studies'},
  },
  journal_post_slugs: {
    'the-bee-glue-secret-to-stronger-immune-health' : {
      title: 'The “Bee Glue” Secret to Stronger Immune Health | Objective Journal Post',
      description: 'Objective Journal Post: The “Bee Glue” Secret to Stronger Immune Health'
    },
    'the-epic-antioxidant-power-of-astaxanthin': {
      title: 'The Epic Antioxidant Power of Astaxanthin | Objective Journal Post',
      description: 'Objective Journal Post: The Epic Antioxidant Power of Astaxanthin'
    },
    '5-things-you-need-to-know-before-trying-collagen-for-your-skin': {
      title: '5 Things You Need to Know Before Trying Collagen for Your Skin | Objective Journal Post',
      description: 'Objective Journal Post: 5 Things You Need to Know Before Trying Collagen for Your Skin'
    },
    'not-your-average-blueberry-and-how-your-chardonnay-could-make-you-smarter': {
      title: 'Not Your Average Blueberry...and How Your Chardonnay Could Make You Smarter | Objective Journal Post',
      description: 'Objective Journal Post: Not Your Average Blueberry...and How Your Chardonnay Could Make You Smarter'
    },
    'the-smoothie-that-smooths-your-skin': {
      title: 'The Smoothie That Smooths Your Skin | Objective Journal Post',
      description: 'Objective Journal Post: The Smoothie That Smooths Your Skin'
    },
    '5-minute-fix-for-better-focus': {
      title: '5-Minute Fix for Better Focus | Objective Journal Post',
      description: 'Objective Journal Post: 5-Minute Fix for Better Focus'
    },
    'behind-the-buzz-antioxidants-the-superheroes-of-your-cells': {
      title: 'Behind the Buzz: Antioxidants, the Superheroes of Your Cells | Objective Journal Post',
      description: 'Objective Journal Post: Behind the Buzz: Antioxidants, the Superheroes of Your Cells'
    },
    'pros-and-cons-of-the-big-6-hormone-helping-herbs-for-hot-flashes-mood-and': {
      title: 'Pros & Cons of the Big 6 Hormone-Helping Herbs for Hot Flashes, Mood and More | Objective Journal Post',
      description: 'Objective Journal Post: Pros & Cons of the Big 6 Hormone-Helping Herbs for Hot Flashes, Mood and More'
    },
    'a-study-in-studies-what-science-backed-really-means': {
      title: 'A Study in Studies: What “Science-Backed” Really Means | Objective Journal Post',
      description: 'Objective Journal Post: A Study in Studies: What “Science-Backed” Really Means'
    },
    '7-reasons-to-start-taking-turmeric-today': {
      title: '7 Reasons to Start Taking Turmeric Today | Objective Journal Post',
      description: 'Objective Journal Post: 7 Reasons to Start Taking Turmeric Today'
    },
  }
};

const fetchStorefrontSeoFromContentful = async () => {
  const blogCategoryResponse = await contentfulClient.getEntries({
    content_type: 'blogCategory',
    select: 'fields.slug,fields.seoTitle,fields.seoDescription',
  });
  const journal_category_slugs = {};
  // console.log('fetchStorefrontSeo', { blogCategories: blogCategoryResponse.items })
  blogCategoryResponse.items.forEach(blogCategory => journal_category_slugs[blogCategory.fields.slug] = {
    title: blogCategory.fields.seoTitle,
    description: blogCategory.fields.seoDescription
  });

  const journal_tag_slugs = {};
  const blogTagResponse = await contentfulClient.getEntries({
    content_type: 'blogTag',
    select: 'fields.slug,fields.seoTitle,fields.seoDescription',
  });
  // console.log('fetchStorefrontSeo', { blogTags: blogTagResponse.items })
  blogTagResponse.items.forEach(blogTag => journal_tag_slugs[blogTag.fields.slug] = {
    title: blogTag.fields.seoTitle,
    description: blogTag.fields.seoDescription
  });

  const journal_post_slugs = {};
  const blogPostResponse = await contentfulClient.getEntries({
    content_type: 'blogPost',
    select: 'fields.slug,fields.seoTitle,fields.seoDescription',
  });
   // console.log('fetchStorefrontSeo', { blogPosts: blogPostResponse.items })
  blogPostResponse.items.forEach(blogPost => journal_post_slugs[blogPost.fields.slug] = {
    title: blogPost.fields.seoTitle,
    description: blogPost.fields.seoDescription
  });

  const product_slugs = {};
  const blogProductResponse = await contentfulClient.getEntries({
    content_type: 'product',
    select: 'fields.Slug,fields.seoTitle,fields.seoDescription',
  });
  // console.log('fetchStorefrontSeo', { blogProducts: blogProductResponse.items })
  blogProductResponse.items.forEach(blogProduct => product_slugs[blogProduct.fields.Slug] = {
    title: blogProduct.fields.seoTitle,
    description: blogProduct.fields.seoDescription
  });

  const homePageResponse = await contentfulClient.getEntries({
    content_type: 'homepage',
    select: 'fields.seoTitle,fields.seoDescription',
  });
  const homePage = homePageResponse.items[0];
  // console.log('fetchStorefrontSeo', { homePage })
  const home = { title: homePage.seoTitle, description: homePage.seoDescription };

  const galleryPageResponse = await contentfulClient.getEntries({
    content_type: 'gallerypage',
    select: 'fields.seoTitle,fields.seoDescription',
  });
  const galleryPage = galleryPageResponse.items[0];
  // console.log('fetchStorefrontSeo', { galleryPage })
  const gallery = { title: galleryPage.seoTitle, description: galleryPage.seoDescription };

  const contactPageResponse = await contentfulClient.getEntries({
    content_type: 'contactpage',
    select: 'fields.seoTitle,fields.seoDescription',
  });
  const contactPage = contactPageResponse.items[0];
  // console.log('fetchStorefrontSeo', { contactPage })
  const contact = { title: contactPage.seoTitle, description: contactPage.seoDescription };

  const faqPageResponse = await contentfulClient.getEntries({
    content_type: 'faqpage',
    select: 'fields.seoTitle,fields.seoDescription',
  });
  const faqPage = faqPageResponse.items[0];
  // console.log('fetchStorefrontSeo', { faqPage })
  const faq = { title: faqPage.seoTitle, description: faqPage.seoDescription };

  const aboutusResponse = await contentfulClient.getEntries({
    content_type: 'aboutuspage',
    select: 'fields.seoTitle,fields.seoDescription',
  });
  const aboutusPage = aboutusResponse.items[0];
  // console.log('fetchStorefrontSeo', { aboutusPage })
  const about_us = { title: aboutusPage.seoTitle, description: aboutusPage.seoDescription };

  const privacyPolicyResponse = await contentfulClient.getEntries({
    content_type: 'privacypolicypage',
    select: 'fields.seoTitle,fields.seoDescription',
  });
  const privacyPolicyPage = privacyPolicyResponse.items[0];
  // console.log('fetchStorefrontSeo', { privacyPolicyPage })
  const privacypolicy = { title: privacyPolicyPage.seoTitle, description: privacyPolicyPage.seoDescription };

  const termsResponse = await contentfulClient.getEntries({
    content_type: 'termspage',
    select: 'fields.seoTitle,fields.seoDescription',
  });
  const termsPage = termsResponse.items[0];
  // console.log('fetchStorefrontSeo', { termsPage })
  const terms = { title: termsPage.seoTitle, description: termsPage.seoDescription };

  const journalResponse = await contentfulClient.getEntries({
    content_type: 'journalpage',
    select: 'fields.seoTitle,fields.seoDescription',
  });
  const journalPage = journalResponse.items[0];
  // console.log('fetchStorefrontSeo', { journalPage })
  const journal = { title: journalPage.seoTitle, description: journalPage.seoDescription };

  const seoMap = {
    home,
    gallery,
    contact,
    faq,
    about_us,
    privacypolicy,
    terms,
    journal,
    journal_category_slugs,
    journal_tag_slugs,
    journal_post_slugs,
    product_slugs,
  };
  return seoMap;
};

export const fetchStorefrontSeo = async (loadingFromContentFul = true) => {
  let seoMap = defaultSeoMap;
  if (loadingFromContentFul) {
    seoMap = await fetchStorefrontSeoFromContentful();
  }
  return seoMap;
};

