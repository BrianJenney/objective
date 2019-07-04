import { handleStorefrontResponse } from './modules/storefront/responses';
import { handleContentResponse } from './modules/content/responses';
import { handleProductResponse } from './modules/products/responses';
//import { handleCartResponse } from './modules/cart/responses';
import { handleAccountResponse } from './modules/account/responses';

const msgpack = require('msgpack-lite');

export default body => {
  let json = JSON.parse(msgpack.decode(JSON.parse(body.body).data));
  let status = json.status;
  let data = json.data;
  let fields = json.fields;
  let properties = json.properties;
  switch (fields.exchange) {
    case 'store':
      handleStorefrontResponse(status, data, fields, properties);
      break;
    /* case 'cart':
      handleCartResponse(status, data, fields, properties);
      break; */
    case 'content':
      handleContentResponse(status, data, fields, properties);
      break;
    case 'product':
      handleProductResponse(status, data, fields, properties);
      break;
    case 'account':
      handleAccountResponse(status, data, fields, properties);
      break;
    default:
      console.log('no response handler ... ruh roh!');
  }
}