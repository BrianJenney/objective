import createClient from './client';

export const sendCreditCardRequest = async payload => {
  const { cardholderName, number, expirationDate, cvv, zipcode } = payload;

  try {
    const client = await createClient();
    const creditCardResponse = await client.request({
      endpoint: 'payment_methods/credit_cards',
      method: 'post',
      data: {
        creditCard: {
          cardholderName,
          number: parseInt(number, 10),
          expirationDate,
          cvv: parseInt(cvv, 10),
          postalCode: zipcode
        }
      }
    });

    return creditCardResponse;
  } catch (err) {
    throw err;
  }
};
