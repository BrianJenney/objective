import {
  LoginPage,
  HomePage,
  StaticPage,
  GalleryPage,
  ProductPage,
  CartPage,
  AccountPage,
  CheckoutPage
} from './pages';

export default [
  { path: '/', exact: true, component: HomePage },
  { path: '/login', exact: true, nonAuth: true, component: LoginPage },
  { path: '/gallery', exact: true, component: GalleryPage },
  { path: '/cart', exact: true, component: CartPage },
  { path: '/checkout', exact: true, component: CheckoutPage },
  { path: '/account', exact: true, auth: true, component: AccountPage },
  { path: '/products/:id/:variant_slug', exact: true, component: ProductPage },
  { path: '/:page', exact: true, component: StaticPage }
];
