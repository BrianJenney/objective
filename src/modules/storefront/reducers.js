import { RECEIVED_FETCH_STOREFRONT } from './types';

const siteMap = {
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

const INITIAL_STATE = {
  name: '',
  domain: '',
  catalogId: '',
  siteMap
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVED_FETCH_STOREFRONT:
      if (typeof action.payload == 'undefined') {
        console.log('need to handle this gracefully');
      }
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
