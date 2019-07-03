import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import { requestFetchProductVariants } from '../modules/pdp/actions';
import ProductContext from '../contexts/ProductContext';

class PDP extends Component {

  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { selectedVariant: '', selectedVariantIndex: null };
  }

  componentWillMount() {
    this.props.requestFetchProductVariants(this.context.selectedProduct._id);
  }

  addToCart = (e) => {
    let msg = this.context.selectedProduct.name + ' - ' 
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

  render() { 
    if(!this.context.selectedProduct) {
      return ( <div></div>)
    } else {
      console.log(this.props.match);
      return ( 
        <ProductContext.Consumer>
          { 
            value => {
              return (
        <>
          <Segment>
            <Header as='h3'>{value.selectedProduct.name}</Header>
            <div>{value.selectedProduct.description}</div>
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
  requestFetchProductVariants
};

export default connect(mapStateToProps, mapDispatchToProps)(PDP);
