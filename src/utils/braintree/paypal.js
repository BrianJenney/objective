import paypal from 'paypal-checkout';
import braintreePaypalCheckout from 'braintree-web/paypal-checkout';
import { env } from './config';
import createClient from './client';

/*
 * @description - Initiates a PayPal checkout button
 * @param {Number} amount - the dollar figure amount to issue with the PayPal checkout request
 * @param {Object} shippingAddress - the shipping address override to issue to PayPal (optional)
 * @param {String} buttonSelect - the selector string for the PayPal button node in the DOM
 * @return {Object} tokenized PayPal payment request
 */

export const sendPaypalCheckoutRequest = async (amount, shippingAddress, buttonStyle, buttonSelector) => {
  const commit = true;
  const flow = 'checkout';
  const currency = 'USD';
  const enableShippingAddress = true;
  const shippingAddressEditable = true;

  try {
    const client = await createClient();
    const paypalCheckout = await braintreePaypalCheckout.create({ client });
    const checkoutPromise = new Promise((resolve, reject) => {
      if (document.querySelector(buttonSelector) === null) {
        reject({ message: `Node ${buttonSelector} does not exist` });
        return;
      }
      //Hide container until PayPal button has finished rendering
      document.querySelector(buttonSelector).style.filter = 'blur(5px)';
      paypal.Button.render(
        {
          env,
          commit,
          style: buttonStyle,
          payment: () =>
            paypalCheckout.createPayment({
              flow,
              amount,
              currency,
              enableShippingAddress,
              shippingAddressEditable
            }),
          onAuthorize: async data => {
            const payload = await paypalCheckout.tokenizePayment(data);
            resolve(payload);
          },
          onCancel: data => reject(data),
          onError: err => reject(err)
        },
        buttonSelector
      ).then(() => {
        //Show container when PayPal button has finished rendering
        setTimeout(() => {
          document.querySelector(buttonSelector).style.filter = 'none';
        }, 500);
      });
    });

    const paypalResponse = await checkoutPromise;

    return paypalResponse;
  } catch (err) {
    throw err;
  }
};
