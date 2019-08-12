import React, {Component} from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import GalleryContext from '../../contexts/GalleryContext';
import ProductSummary from './ProductSummary';

class Products extends Component {
  static contextType = GalleryContext;

  render() {
    const { products } = this.context;
    if (!products) {
      return null;
    }
    return (
      <Container>
        <Grid container spacing={4}>
          {products.map(product => <ProductSummary key={product._id} product={product} />)}
        </Grid>
      </Container>
    );
  }
}

export default Products;
