import { handleStorefrontResponse } from './modules/storefront/responses';
import { handleContentResponse } from './modules/content/responses';

const msgpack = require('msgpack-lite');

export default body => {
  let json = JSON.parse(msgpack.decode(JSON.parse(body.body).data));
  let data = json.data;
  let fields = json.fields;
  let properties = json.properties;
  switch (fields.exchange) {
    case 'store':
      handleStorefrontResponse(data, fields, properties);
      break;
    case 'content':
        handleContentResponse(data, fields, properties);
        break;
    default:
      console.log('no response handler ... ruh roh!');
  }
}