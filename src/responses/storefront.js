import store from '../store';

export const handleStorefrontResponse = (data, fields, properties) => {
  switch (fields.routingKey) {
    case 'store.request.find':
      console.log('****************** Response ******************');
      console.log(data);
      console.log(fields);
      console.log(properties);
      store.dispatch({
        type: 'RECEIVED_STOREFRONT',
        payload: data.data[0]
      });
      break;
    default:
      console.log('bad response');
  }
}