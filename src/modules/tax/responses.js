import store from '../../store';
import { receivedCalculateTax } from './actions';

export const handleTaxResponse = (status, data, fields, properties) => {
  switch (fields.routingKey) {
    case 'tax.request.calculate':
      console.log('****************** Calculate Tax Response ******************');
      console.log(status);
      console.log(data);
      console.log(fields);
      console.log(properties);
      // This is in the *account* module, so state updates are made in that reducer.
      store.dispatch(receivedCalculateTax(data));
      break;
    default:
      console.log('bad response ' + fields.routingKey);
  }
};
