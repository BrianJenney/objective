import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestFetchProduct, requestFetchProductVariants } from '../modules/pdp/actions';
import PDPHeader from '../components/PDPHeader';
import VariantSelectionForm from '../components/VariantSelectionForm';
import ProductContext from '../contexts/ProductContext';

class PDP extends Component {

  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    this.props.requestFetchProduct(this.props.match.params.id);
    this.props.requestFetchProductVariants(this.props.match.params.id);
  }



  render() { 
    if(!this.props.selectedProduct) {
      return ( <div></div>)
    } else {
      return ( 
        <ProductContext.Provider value={{ product: this.props.selectedProduct, variants: this.props.variants }}>
          <PDPHeader/>
          <VariantSelectionForm/>
        </ProductContext.Provider>
      )
   }
  }
}
PDP.contextType = ProductContext;


const mapStateToProps = state => {
  return {
    selectedProduct: state.pdp.selectedProduct,
    variants: state.pdp.variants
  };
};
  
const mapDispatchToProps = {
  requestFetchProduct, requestFetchProductVariants
};

export default connect(mapStateToProps, mapDispatchToProps)(PDP);
