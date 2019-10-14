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
  AboutUs
} from './pages';

import {
  LoginToOrderPage,
  LoginToShippingPage,
  LoginToAccountPage
} from './pages/Login';

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
  { path: '/:page', exact: true, component: StaticPage }
];
