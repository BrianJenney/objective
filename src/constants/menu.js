export const ACCOUNT_MENU_KEYS = {
  OVERVIEW: 'overview',
  YOUR_ORDERS: 'yourOrders',
  SAVED_ADDRESSES: 'savedAddresses',
  PAYMENT_DETAILS: 'paymentDetails',
  YOUR_PROFILE: 'yourProfile',
  LOGOUT: 'logout'
};

export const ACCOUNT_MENU_ITEMS = [
  { key: 'overview', label: 'Account Overview', to: '/account/overview' },
  { key: 'yourOrders', label: 'Your Orders', to: '/account/orders' },
  {
    key: 'savedAddresses',
    label: 'Saved Addresses',
    to: '/account/addresses'
  },
  {
    key: 'paymentDetails',
    label: 'Saved Payment Method',
    to: '/account/payment-details'
  },
  { key: 'yourProfile', label: 'Your Profile', to: '/account/profile' },
  { key: 'logout', label: 'LOGOUT' }
];
