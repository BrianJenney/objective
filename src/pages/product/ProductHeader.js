import React, { Component } from 'react';
import ProductContext from '../../contexts/ProductContext';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class ProductHeader extends Component {
  static contextType = ProductContext;

  render() {
    if (!this.context.product) {
      return (<div></div>);
    }

    return (
      <Container>
        <Typography component="h1" variant="h3" align="center">{this.context.product.name}</Typography>
        <div>{this.context.product.description}</div>
      </Container>
    );
  }
}

export default ProductHeader;