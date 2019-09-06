export const STEPS = [
  'Step 1 Account',
  'Step 2 Shipping Method',
  'Step 3 Shipping Address',
  'Step 4 Billing Address',
  'Step 5 Payment Details',
  'Step 6 Review & Order',
  'Step 7 Result'
];
export const STEP_KEYS = [
  'account',
  'shippingMethod',
  'shippingAddress',
  'billingAddress',
  'paymentDetails',
  'reviewAndOrder',
  'result'
];
export const DATA_KEYS = [
  'account',
  'shippingMethod',
  'addressBook',
  'addressBook',
  'paymentMethods',
  'reviewAndOrder',
  'result'
];
export const shippingMethods = {
  ground: {
    displayName: 'Ground',
    name: 'ground',
    price: 0.0,
    deliveryEstimate: '3-7 Business Days'
  },
  twodayair: {
    displayName: '2 Day Air',
    name: '2dayair',
    price: 17.9,
    deliveryEstimate: '2 Business Days'
  }
};
