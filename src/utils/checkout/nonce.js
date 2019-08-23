import {
  sendCreditCardBraintreeRequest,
  sendPaypalCheckoutBraintreeRequest
} from '../braintree';

export const fetchCreditCardBrainTreeNonce = async ({
  paymentDetails,
  billingAddress
}) => {
  try {
    const creditCardResponse = await sendCreditCardBraintreeRequest({
      ...paymentDetails,
      postalCode: billingAddress.postalCode
    });
    const { nonce } = creditCardResponse.creditCards[0];

    return nonce;
  } catch (err) {
    throw err;
  }
};

export const fetchPaypalCheckoutBrainTreeNonce = async ({
  total,
  shippingAddress
}) => {
  try {
    const paypalCheckoutResponse = await sendPaypalCheckoutBraintreeRequest(
      total,
      shippingAddress
    );
    const { nonce } = paypalCheckoutResponse;

    return nonce;
  } catch (err) {
    throw err;
  }
};
