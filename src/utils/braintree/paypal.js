import paypal from 'paypal-checkout';
import braintreePaypalCheckout from 'braintree-web/paypal-checkout';
import braintreeDataCollector from 'braintree-web/paypal-checkout';
import { env } from './config';
import createClient from './client';

export const sendPaypalCheckoutRequest = async (
  amount,
  shippingAddress,
  flow
) => {
  const commit = true;
  const currency = 'USD';
  const enableShippingAddress = true;
  const shippingAddressEditable = false;

  const shippingAddressOverride = shippingAddress && {
    recipientName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
    line1: shippingAddress.address1,
    line2: shippingAddress.address2,
    city: shippingAddress.city,
    countryCode: shippingAddress.country,
    postalCode: shippingAddress.zipcode,
    state: shippingAddress.state
  };

  try {
    const client = await createClient();

    if (flow === 'vault') {
      const dataCollector = await braintreeDataCollector.create({
        client,
        paypal: true
      });

      console.log(dataCollector.deviceData);
    }

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
              shippingAddressOverride: shippingAddress
                ? shippingAddressOverride
                : null
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
    console.log(err);
    throw err;
  }
};
