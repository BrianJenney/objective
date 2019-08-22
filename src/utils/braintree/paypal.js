import braintreePaypalCheckout from 'braintree-web/paypal-checkout';
import { env } from './config';
import createClient from './client';

export const sendPaypalCheckoutRequest = async (amount, shippingAddress) => {
  const {
    recipientName,
    line1,
    line2,
    city,
    countryCode,
    postalCode,
    state,
    phone
  } = shippingAddress;
  const commit = true;
  const flow = 'checkout';
  const currency = 'USD';
  const enableShippingAddress = true;
  const shippingAddressEditable = false;
  const shippingAddressOverride = {
    recipientName,
    line1,
    line2,
    city,
    countryCode,
    postalCode,
    state,
    phone
  };

  try {
    const client = await createClient();
    const paypalCheckout = await braintreePaypalCheckout.create({ client });
    const checkoutPromise = new Promise((resolve, reject) => {
      paypal.Button.render(
        {
          env,
          commit,
          payment: () =>
            paypalCheckout.createPayment({
              flow,
              amount,
              currency,
              enableShippingAddress,
              shippingAddressEditable,
              shippingAddressOverride
            }),
          onAuthorize: async data => {
            const payload = await paypalCheckout.tokenizePayment(data);

            resolve(payload);
          },
          onCancel: data => reject(data),
          onError: err => reject(err)
        },
        '#paypal-checkout-button'
      );
    });

    const paypalResponse = await checkoutPromise;

    return paypalResponse;
  } catch (err) {
    throw err;
  }
};
