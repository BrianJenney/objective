import React from 'react';

import { useStompRequest } from '../hooks';

const Context = React.createContext();

export const MyProductStore = ({ productId }) => {
  const product = useStompRequest({ id: productId }, '/exchange/product','product.request.get');
  const variants = useStompRequest( { params: { query: { product_id: productId }}}, '/exchange/variant','variant.request.find');
  // const content = useStompRequest({ params: { query: { component: new RegExp(productId + '$')}}},'/exchange/content/content.request.find');

  const productContext = {
    product: product.data,
    variants: variants.data.data,
  };
  return (
    <Context.Provider value={productContext} >
      {this.props.children}
    </Context.Provider>
  );

};

export default Context;
