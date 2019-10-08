import EventEmitter from './events';

import { handleBootstrapResponse } from './modules/bootstrap/responses';
import { handleAccountResponse } from './modules/account/responses';
import { handleCartResponse } from './modules/cart/responses';
import { handleOrderResponse } from './modules/order/responses';

const msgpack = require('msgpack-lite');

export default body => {
  let json = JSON.parse(msgpack.decode(JSON.parse(body.body).data));
  let status = json.status;
  let data = json.data;
  let fields = json.fields;
  let properties = json.properties;

  switch (fields.exchange) {
    case 'bootstrap-orchestration':
      handleBootstrapResponse(status, data, fields, properties);
      break;

    case 'cart':
      handleCartResponse(status, data, fields, properties);
      break;

    case 'account':
      handleAccountResponse(status, data, fields, properties);
      break;

    case 'order':
    case 'transaction' :
      handleOrderResponse(status, data, fields, properties);
      break;

    default:
      EventEmitter.emit(fields.routingKey, {
        'status': status,
        'data': data,
        'fields': fields,
        'properties': properties
      });
  }
};
