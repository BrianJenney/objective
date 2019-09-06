import {
  LoginPage,
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
  CheckoutPage
} from './pages';

export default [
  { path: '/', exact: true, component: HomePage },
  { path: '/login', exact: true, nonAuth: true, component: LoginPage },
  { path: '/gallery', exact: true, component: GalleryPage },
  { path: '/cart', exact: true, component: CartPage },
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
    path: '/products/:product_slug/:variant_slug',
    exact: true,
    component: ProductPage
  },
  { path: '/:page', exact: true, component: StaticPage }
];
