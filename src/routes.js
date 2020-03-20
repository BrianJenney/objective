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
  PrivacyPolicyPage,
  TermsPage,
  NotFoundPage,
  StaticPageOne,
  Template1
} from './pages';

import { LoginToOrderPage, LoginToShippingPage, LoginToAccountPage } from './pages/Login';

import NewYear from './pages/landingpages/NewYear';
import FastAsleepIngredients from './pages/landingpages/FastAsleepIngredients';
import FastAsleepMelatonin from './pages/landingpages/FastAsleepMelatonin';
import FastAsleepLifestyle from './pages/landingpages/FastAsleepLifestyle';

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
  { path: '/signup', exact: true, nonAuth: true, component: SignupPage },
  { path: '/gallery', exact: true, component: GalleryPage },
  { path: '/contact', exact: true, component: ContactUsPage },
  { path: '/faq', exact: true, component: FAQPage },
  { path: '/about_us', exact: true, component: AboutUs },
  { path: '/privacypolicy', exact: true, component: PrivacyPolicyPage },
  { path: '/terms', exact: true, component: TermsPage },
  {
    path: '/order',
    auth: true,
    exact: true,
    component: OrderConfirmationPage
  },
  {
    path: '/orders/:id',
    auth: true,
    exact: true,
    injectCurrentUser: true,
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
    path: '/journal/category/:category_slug',
    exact: true,
    component: BlogCategory
  },
  { path: '/journal/tag/:tag_slug', exact: true, component: BlogTag },
  { path: '/journal/posts/:post_slug', exact: true, component: BlogPost },
  { path: '/journal', exact: true, component: Blog },
  { path: '/newyear', exact: true, component: NewYear },
  { path: '/landing/fastasleep-ingredients', exact: true, component: FastAsleepIngredients },
  { path: '/landing/fastasleep-melatonin', exact: true, component: FastAsleepMelatonin },
  { path: '/landing/fastasleep-lifestyle', exact: true, component: FastAsleepLifestyle },
  { path: '/landing/:slug', exact: true, component: StaticPageOne },
  { path: '/landing/:landingSlug', exact: true, component: Template1 },
  { path: '*', exact: true, component: NotFoundPage },
  { path: '/:page', exact: true, component: StaticPage }
];
