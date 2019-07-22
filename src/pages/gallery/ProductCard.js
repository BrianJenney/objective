import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GalleryContext from '../../contexts/GalleryContext';

class ProductCard extends Component {
  static contextType = GalleryContext;

  render() {
    if (!this.context.products) {
      return (<div></div>);
    }

    let prodlist = Object.values(this.context.products).map((product) => (
      <div key={product._id}>
          <h3>{product.name}</h3>
          SKU: {product.sku}<br />
          {product.description}<br />
          Price: {product.price.$numberDecimal}<br />
          <Link to={`/product/${product._id}`}>See Details</Link>
      </div>
    ));

    return <div>{prodlist}</div>;
  }
}

export default ProductCard;