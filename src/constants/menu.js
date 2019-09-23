export const ACCOUNT_MENU_KEYS = {
  OVERVIEW: 'overview',
  YOUR_ORDERS: 'yourOrders',
  SAVED_ADDRESSES: 'savedAddresses',
  PAYMENT_DETAILS: 'paymentDetails',
  YOUR_PROFILE: 'yourProfile',
  LOGOUT: 'logout'
};

export const ACCOUNT_MENU_ITEMS = [
  { key: 'overview', label: 'OVERVIEW', to: '/account/overview' },
  { key: 'yourOrders', label: 'YOUR ORDERS', to: '/account/orders' },
  {
    key: 'savedAddresses',
    label: 'SAVED ADDRESSES',
    to: '/account/addresses'
  },
  {
    key: 'paymentDetails',
    label: 'PAYMENT DETAILS',
    to: '/account/payment-details'
  },
  { key: 'yourProfile', label: 'YOUR PROFILE', to: '/account/profile' },
  { key: 'logout', label: 'LOGOUT' }
];
