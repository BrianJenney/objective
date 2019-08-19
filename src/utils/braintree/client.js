import braintreeClient from 'braintree-web/client';
import config from './config';

const { tokenizationKey } = config;

export const createClient = async () => {
  const client = await braintreeClient.create({
    authorization: tokenizationKey
  });

  return client;
};

export const sendCreditCardRequest = async payload => {
  const client = await createClient();

  const creditCardResponse = await client.request({
    endpoint: 'payment_methods/credit_cards',
    method: 'post',
    data: {
      creditCard: {
        number: payload.cardNumber,
        expirationDate: payload.expDate,
        cvv: payload.cvv,
        cardholderName: payload.cardName,
        billingAddress: payload.billingAddress
      }
    }
  });

  return creditCardResponse;
};
