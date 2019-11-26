import { RECEIVED_FETCH_STOREFRONT } from './types';

const siteMap = {
  home: { title: 'Objective | Home', description: 'Objective Home'},
  gallery: { title: 'Objective | Gallery', description: 'Gallery of products from Objective'},
  contact: { title: 'Objective | Contact Us', description: 'Contact us at Objective'},
  faq: { title: 'Objective | FAQ', description: 'Frequently Asked Questions at Objective'},
  about_us: { title: 'Objective | About Us', description: 'About us at Objective'},
  privacypolicy: { title: 'Objective | Privacy Policy', description: 'Privacy Policy at Objective'},
  terms: { title: 'Objective | Terms of Use', description: 'Terms of Use at Objective'},
  journal: { title: 'Objective | The Journal', description: 'The Journal at Objective'},
  product_slugs: {
    'immune-wellness': { title: 'Objective | Immune + Wellness' , description: 'Immune + Wellness - 60 Gummies'},
    'proactive-prostate': { title: 'Objective | Proactive Prostate', description: 'Proactive Prostate - 60 Softgels'},
    'full-body-fix': { title: 'Objective | Full Body Fix', description: 'Full Body Fix - 60 Veggie Capsules '},
    'everything-armor': { title: 'Objective | Everything Armor', description: 'Everything Armor - 30 Softgels'},
    'healthy-blood-flow': { title: 'Objective | Healthy Blood Flow', description: 'Healthy Blood Flow - 60 Veggie Capsules'},
    'weight-loss-energy': { title: 'Objective | Weight Loss + Energy', description: 'Weight Loss + Energy - 60 Veggie Capsules'},
    'relief-cooling': { title: 'Objective | Relief + Cooling', description: 'Relief + Cooling - 3FL oz'},
    'keep-cool': { title: 'Objective | Keep Cool', description: 'Keep Cool - 30 Veggie Capsules'},
    'focus-clarity': { title: 'Objective | Focus + Clarity', description: 'Focus + Clarity - 30 Veggie Capsules'},
    'fast-asleep': { title: 'Objective | Fast Asleep', description: 'Fast Asleep - 30 Chocolates'},
    'smooth-luminous': { title: 'Objective | Smooth + Luminous', description: 'Smooth + Luminous - 2.7oz'},
    'lift-smooth': { title: 'Objective | Lift + Smooth', description: 'Lift + Smooth - 8oz'}
  },
  journal_category_slugs: {
    'health-and-wellness': { title: 'Journal Category | Health And Wellness', description: 'Objective Journal Category: Health And Wellness'},
    'science': { title: 'Journal Category | Science', description: 'Objective Journal Category: Science'},
  },
  journal_tag_slugs: {
    'antioxidants': { title: 'Journal Tag | Antioxidants', description: 'Objective Journal Tag: Antioxidants'},
    'brain-health': { title: 'Journal Tag | Brain Health', description: 'Objective Journal Tag: Brain Health'},
    'free-radicals': { title: 'Journal Tag | Free Radicals', description: 'Objective Journal Tag: Free Radicals'},
    'immune-health': { title: 'Journal Tag | Immune Health', description: 'Objective Journal Tag: Immune Health'},
    'seasonal-support': { title: 'Journal Tag | Seasonal Support', description: 'Objective Journal Tag: Seasonal Support'},
    'womens-health': { title: 'Journal Tag | Womens Health', description: 'Objective Journal Tag: Womens Health'},
    'astaxanthin': { title: 'Journal Tag | Astaxanthin', description: 'Objective Journal Tag: Astaxanthin'},
    'inflammation': { title: 'Journal Tag | Inflammation', description: 'Objective Journal Tag: Inflammation'},
    'skin-health': { title: 'Journal Tag | Skin Health', description: 'Objective Journal Tag: Skin Health'},
    'beauty': { title: 'Journal Tag | Beauty', description: 'Objective Journal Tag: Beauty'},
    'studies': { title: 'Journal Tag | Studies', description: 'Objective Journal Tag: Studies'},
  },
  journal_post_slugs: {
    'the-bee-glue-secret-to-stronger-immune-health' : {
      title: 'Journal Post | The “Bee Glue” Secret to Stronger Immune Health',
      description: 'Objective Journal Post: The “Bee Glue” Secret to Stronger Immune Health'
    },
    'the-epic-antioxidant-power-of-astaxanthin': {
      title: 'Journal Post | The Epic Antioxidant Power of Astaxanthin',
      description: 'Objective Journal Post: The Epic Antioxidant Power of Astaxanthin'
    },
    '5-things-you-need-to-know-before-trying-collagen-for-your-skin': {
      title: 'Journal Post | 5 Things You Need to Know Before Trying Collagen for Your Skin',
      description: 'Objective Journal Post: 5 Things You Need to Know Before Trying Collagen for Your Skin'
    },
    'not-your-average-blueberry-and-how-your-chardonnay-could-make-you-smarter': {
      title: 'Journal Post | Not Your Average Blueberry...and How Your Chardonnay Could Make You Smarter',
      description: 'Objective Journal Post: Not Your Average Blueberry...and How Your Chardonnay Could Make You Smarter'
    },
    'the-smoothie-that-smooths-your-skin': {
      title: 'Journal Post | The Smoothie That Smooths Your Skin',
      description: 'Objective Journal Post: The Smoothie That Smooths Your Skin'
    },
    '5-minute-fix-for-better-focus': {
      title: 'Journal Post | 5-Minute Fix for Better Focus',
      description: 'Objective Journal Post: 5-Minute Fix for Better Focus'
    },
    'behind-the-buzz-antioxidants-the-superheroes-of-your-cells': {
      title: 'Journal Post | Behind the Buzz: Antioxidants, the Superheroes of Your Cells',
      description: 'Objective Journal Post: Behind the Buzz: Antioxidants, the Superheroes of Your Cells'
    },
    'pros-and-cons-of-the-big-6-hormone-helping-herbs-for-hot-flashes-mood-and': {
      title: 'Journal Post | Pros & Cons of the Big 6 Hormone-Helping Herbs for Hot Flashes, Mood and More',
      description: 'Objective Journal Post: Pros & Cons of the Big 6 Hormone-Helping Herbs for Hot Flashes, Mood and More'
    },
    'a-study-in-studies-what-science-backed-really-means': {
      title: 'Journal Post | A Study in Studies: What “Science-Backed” Really Means',
      description: 'Objective Journal Post: A Study in Studies: What “Science-Backed” Really Means'
    },
    '7-reasons-to-start-taking-turmeric-today': {
      title: 'Journal Post | 7 Reasons to Start Taking Turmeric Today',
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
