import { sendCreditCardRequest } from './creditCard';
import { sendPaypalCheckoutRequest } from './paypal';

export const fetchCreditCardBrainTreeNonce = async ({
  paymentDetails,
  billingAddress
}) => {
  try {
    const creditCardResponse = await sendCreditCardRequest({
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
    const paypalCheckoutResponse = await sendPaypalCheckoutRequest(
      total,
      shippingAddress
    );
    const { nonce } = paypalCheckoutResponse;

    return nonce;
  } catch (err) {
    throw err;
  }
};
