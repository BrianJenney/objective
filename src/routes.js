import {
  LoginPage,
  SignupPage,
  HomePage,
  StaticPage,
  GalleryPage,
  ProductPage,
  AccountPage,
  AccountOverviewPage,
  OrderPage,
  AccountOrdersPage,
  AccountAddressesPage,
  AccountPaymentDetailsPage,
  AccountProfilePage,
  CheckoutPage,
  ForgotPassword,
  ConfirmPassword,
  ResetPassword,
  ResetSuccess,
  OrderConfirmationPage,
  ContactUsPage,
  FAQPage,
  Blog,
  BlogPost,
  BlogCategory,
  BlogTag,
  AboutUs,
  TermsPage,
  NotFoundPage,
  StaticPageOne,
  BundleLP,
  TrackOrderPage
} from './pages';

import PrivacyPolicyPage from './pages/static/PrivacyPage';

import {
  LoginToOrderPage,
  LoginToShippingPage,
  LoginToAccountPage,
  LoginToCheckoutPage
} from './pages/Login';

import NewYear from './pages/landingpages/NewYear';
import SleepImmunity from './pages/landingpages/SleepImmunity';
import FastAsleepIngredients from './pages/landingpages/FastAsleepIngredients';
import FastAsleepMelatonin from './pages/landingpages/FastAsleepMelatonin';
import FastAsleepMom from './pages/landingpages/FastAsleepMom';

export default [
  { path: '/', exact: true, component: HomePage },
  { path: '/login', exact: true, nonAuth: true, component: LoginPage },
  {
    path: '/login/account',
    exact: true,
    nonAuth: true,
    component: LoginToAccountPage
  },
  {
    path: '/login/order',
    exact: true,
    nonAuth: true,
    component: LoginToOrderPage
  },
  {
    path: '/login/shipping',
    exact: true,
    nonAuth: true,
    component: LoginToShippingPage
  },
  {
    path: '/login/checkout',
    exact: true,
    nonAuth: true,
    component: LoginToCheckoutPage
  },
  {
    path: '/login/checkout2',
    exact: true,
    nonAuth: true,
    component: LoginToCheckoutPage
  },
  { path: '/signup', exact: true, nonAuth: true, component: SignupPage },
  { path: '/gallery', exact: true, component: GalleryPage },
  { path: '/contact', exact: true, component: ContactUsPage },
  { path: '/faq', exact: true, component: FAQPage },
  { path: '/about_us', exact: true, component: AboutUs },
  { path: '/terms', exact: true, component: TermsPage },
  {
    path: '/order',
    auth: false,
    exact: true,
    component: OrderConfirmationPage
  },
  {
    path: '/order-tracker',
    auth: false,
    exact: true,
    component: TrackOrderPage
  },
  {
    path: '/orders/:id',
    auth: false,
    exact: true,
    injectCurrentUser: false,
    component: OrderPage
  },
  {
    path: '/checkout',
    exact: true,
    injectCurrentUser: true,
    component: CheckoutPage
  },

  {
    path: '/account',
    auth: true,
    component: AccountPage,
    routes: [
      {
        path: '/account/overview',
        exact: true,
        injectCurrentUser: true,
        component: AccountOverviewPage
      },
      {
        path: '/account/orders',
        exact: true,
        injectCurrentUser: true,
        component: AccountOrdersPage
      },
      {
        path: '/account/addresses',
        exact: true,
        injectCurrentUser: true,
        component: AccountAddressesPage
      },
      {
        path: '/account/payment-details',
        exact: true,
        injectCurrentUser: true,
        component: AccountPaymentDetailsPage
      },
      {
        path: '/account/profile',
        exact: true,
        injectCurrentUser: true,
        component: AccountProfilePage
      }
    ]
  },
  {
    path: '/products/:product_slug',
    exact: true,
    component: ProductPage
  },
  { path: '/password/forgot', exact: true, component: ForgotPassword },
  { path: '/password/confirm', exact: true, component: ConfirmPassword },
  { path: '/password/reset', exact: true, component: ResetPassword },
  { path: '/password/success', exact: true, component: ResetSuccess },
  {
    path: '/journal/category/:categorySlug',
    exact: true,
    component: BlogCategory
  },
  { path: '/journal/tag/:tag_slug', exact: true, component: BlogTag },
  { path: '/journal/posts/:slug', exact: true, component: BlogPost },
  { path: '/journal', exact: true, component: Blog },
  { path: '/newyear', exact: true, component: NewYear },
  { path: '/landing/sleepandimmunity', exact: true, component: SleepImmunity },
  { path: '/landing/fastasleep-ingredients', exact: true, component: FastAsleepIngredients },
  { path: '/landing/fastasleep-melatonin', exact: true, component: FastAsleepMelatonin },
  { path: '/landing/fastasleep-mom', exact: true, component: FastAsleepMom },
  { path: '/landing/:slug', exact: true, component: StaticPageOne },
  { path: '/bundle/:slug', exact: true, component: BundleLP },
  { path: '/privacypolicy', exact: true, component: PrivacyPolicyPage },
  { path: '/privacypolicy/:slug', exact: true, component: PrivacyPolicyPage },

  { path: '*', exact: true, component: NotFoundPage },
  { path: '/:page', exact: true, component: StaticPage }
];
