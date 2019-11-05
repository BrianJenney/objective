const SmartyStreetsSDK = require('smartystreets-javascript-sdk');
const SmartyStreetsCore = SmartyStreetsSDK.core;


const websiteKey = "14917303982694558"; // Your website key here
const smartyStreetsSharedCredentials = new SmartyStreetsCore.SharedCredentials(websiteKey);

//const client = SmartyStreetsCore.buildClient.usStreet(credentials);
const usStreetClientBuilder = new SmartyStreetsCore.ClientBuilder(smartyStreetsSharedCredentials);
const usStreetClient = usStreetClientBuilder.buildUsStreetApiClient();

// Documentation for input fields can be found at:
// https://smartystreets.com/docs/us-street-api#input-fields

export const validateAddress = async address => {

  let lookup = new SmartyStreetsSDK.usStreet.Lookup();
  lookup.street = address.address1;
  lookup.city = address.city;
  lookup.state = address.state;
  lookup.zipCode = address.zipcode;
  lookup.maxCandidates = 1;

  console.log('address', address);

  try {
    const result = await usStreetClient.send(lookup);
    console.log('result', result);
    return result;
  } catch (e) {
    console.log('error', e);
    return e;
  }
};
