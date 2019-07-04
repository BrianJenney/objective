import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductHeader from './product/ProductHeader';
import VariantSelectionForm from './product/VariantSelectionForm';

import { requestFetchProduct, requestFetchProductVariants } from '../modules/product/actions';

import ProductContext from '../contexts/ProductContext';

class Product extends Component {
  componentWillMount() {
    this.props.requestFetchProduct(this.props.match.params.id);
    this.props.requestFetchProductVariants(this.props.match.params.id);
  }

  render() {
    if (!this.props.product) {
      return (<div></div>);
    } else {
      return (
        <ProductContext.Provider value={{ product: this.props.product, variants: this.props.variants }}>
          <ProductHeader />
          <VariantSelectionForm />
        </ProductContext.Provider>
      );
    }
  }
}
Product.contextType = ProductContext;

const mapStateToProps = state => {
  return {
    product: state.product.selectedProduct,
    variants: state.product.variants
  };
};

const mapDispatchToProps = {
  requestFetchProduct, requestFetchProductVariants
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);