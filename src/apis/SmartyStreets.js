const SmartyStreetsSDK = require('smartystreets-javascript-sdk');
const SmartyStreetsCore = SmartyStreetsSDK.core;

const websiteKey = '14917304965143845'; // Your website key here
const smartyStreetsSharedCredentials = new SmartyStreetsCore.SharedCredentials(
  websiteKey
);

//const client = SmartyStreetsCore.buildClient.usStreet(credentials);
const usStreetClientBuilder = new SmartyStreetsCore.ClientBuilder(
  smartyStreetsSharedCredentials
);
const usStreetClient = usStreetClientBuilder.buildUsStreetApiClient();

// Documentation for input fields can be found at:
// https://smartystreets.com/docs/us-street-api#input-fields

export const validateAddress = async address => {
  let lookup = new SmartyStreetsSDK.usStreet.Lookup();
  lookup.street = address.address1;
  lookup.secondary = address.address2;
  lookup.city = address.city;
  lookup.state = address.state;
  lookup.zipCode = address.zipcode;
  lookup.maxCandidates = 1;

  try {
    const result = await usStreetClient.send(lookup);
    const addresstmp = result.lookups[0].result[0];

    // Clean up address and fix format
    let address1 = '';
    if (addresstmp.components.primaryNumber)
      address1 += addresstmp.components.primaryNumber;
    if (addresstmp.components.streetName)
      address1 += ' ' + addresstmp.components.streetName;
    if (addresstmp.components.streetSuffix)
      address1 += ' ' + addresstmp.components.streetSuffix;
    if (addresstmp.components.streetPostdirection)
      address1 += ' ' + addresstmp.components.streetPostdirection;

    let address2 = '';
    if (addresstmp.components.secondaryDesignator)
      address2 += addresstmp.components.secondaryDesignator;
    if (addresstmp.components.secondaryNumber)
      address2 += ' ' + addresstmp.components.secondaryNumber;

    const zipcode = addresstmp.components.plus4Code
      ? `${addresstmp.components.zipCode}-${addresstmp.components.plus4Code}`
      : addresstmp.components.zipCode;

    const returnAddress = {
      address1,
      address2,
      city: addresstmp.components.cityName,
      state: addresstmp.components.state,
      zipcode
    };
    return returnAddress;
  } catch (e) {
    console.log('error smarty streets api', e);
    return e;
  }
};
