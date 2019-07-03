import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import { requestFetchProduct, requestFetchProductVariants } from '../modules/pdp/actions';
import ProductContext from '../contexts/ProductContext';

class PDP extends Component {

  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { selectedProduct: {}, selectedVariant: '', selectedVariantIndex: null };
  }

  componentWillMount() {
    this.props.requestFetchProduct(this.props.match.params.id);
    this.props.requestFetchProductVariants(this.props.match.params.id);
  }

  addToCart = (e) => {
    let msg = this.state.selectedProduct.name + ' - ' 
            + this.state.selectedVariant.sku 
            + ' will be added to your cart.'
    alert(msg);
  }

  handleChange(e, { varindex } ) {
    this.setState({
      selectedVariant: this.props.variants[varindex],
      selectedVariantIndex: varindex
    });
  }

  // handleClick(product) {
  //   this.context.selectedProduct = product;
  // }

  render() { 
    if(!this.state.selectedProduct) {
      return ( <div></div>)
    } else {
      console.log(this.state);
      console.log(this.props);
      return ( 
        <ProductContext.Consumer>
          { 
            value => {
              return (
        <>
          <Segment>
            <Header as='h3'>{this.state.selectedProduct.name}</Header>
            <div>{this.state.selectedProduct.description}</div>
          </Segment>
          <Segment> 
            <Form onSubmit={this.addToCart}>
              <Form.Group widths='equal' style={{display:'block'}}>
                {this.props.variants.map((variant, index) => (
                  <Form.Checkbox
                    radio 
                    checked={this.state.selectedVariantIndex===index}
                    key={variant._id}
                    varindex = {index}
                    label={variant.sku + ':  ' + variant.price.$numberDecimal}
                    name='variant'
                    onChange={this.handleChange}
                    sku={variant.sku}
                  />
                ))}
            </Form.Group>
            <Divider horizontal />
            <Button 
              color='blue' 
              content='Add To Cart' 
              disabled={this.state.selectedVariantIndex === null} 
              type='submit'
            />
          </Form>
        </Segment>
        </>
              )
          }
        }
        </ProductContext.Consumer>
      )
   }
  }
}
PDP.contextType = ProductContext;


const mapStateToProps = state => {
  return {
    variants: state.pdp.variants
  };
};
  
const mapDispatchToProps = {
  requestFetchProduct, requestFetchProductVariants
};

export default connect(mapStateToProps, mapDispatchToProps)(PDP);
