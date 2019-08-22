import braintreeClient from 'braintree-web/client';
import { tokenizationKey } from './config';

const createClient = async () => {
  try {
    const client = await braintreeClient.create({
      authorization: tokenizationKey
    });

    return client;
  } catch (err) {
    throw err;
  }
};

export default createClient;
