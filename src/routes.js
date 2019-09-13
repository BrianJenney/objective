import {
  LoginPage,
  SignupPage,
  HomePage,
  StaticPage,
  GalleryPage,
  ProductPage,
  CartPage,
  AccountPage,
  AccountOverviewPage,
  AccountOrdersPage,
  AccountAddressesPage,
  AccountPaymentDetailsPage,
  AccountProfilePage,
  CheckoutPage,
  ForgotPassword,
  ConfirmPassword,
  ResetPassword,
  ResetSuccess,
  OrderConfirmationPage
} from './pages';

export default [
  { path: '/', exact: true, component: HomePage },
  { path: '/login', exact: true, nonAuth: true, component: LoginPage },
  { path: '/signup', exact: true, nonAuth: true, component: SignupPage },
  { path: '/gallery', exact: true, component: GalleryPage },
  { path: '/order', auth: true, exact: true, component: OrderConfirmationPage },
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
        seedEnabled: true,
        useSeedLabel: 'Use default address',
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
    path: '/products/:product_slug/:variant_slug',
    exact: true,
    component: ProductPage
  },
  { path: '/password/forgot', exact: true, component: ForgotPassword },
  { path: '/password/confirm', exact: true, component: ConfirmPassword },
  { path: '/password/reset', exact: true, component: ResetPassword },
  { path: '/password/success', exact: true, component: ResetSuccess },
  { path: '/:page', exact: true, component: StaticPage }
];
