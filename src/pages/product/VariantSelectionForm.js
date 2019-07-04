import React, { Component } from 'react';

import { Button, Divider, Form, Segment } from 'semantic-ui-react';

import ProductContext from '../../contexts/ProductContext';

class VariantSelectionForm extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { selectedVariantIndex: null };
  }

  addToCart = (e) => {
    let msg = this.context.product.name + ' - ' + this.context.variants[this.state.selectedVariantIndex].sku + ' will be added to your cart.';
    alert(msg);
  }

  handleChange(e, { varindex }) {
    this.setState({selectedVariantIndex: varindex});
  }

  render() {
    return (
      <ProductContext.Consumer>
        {
          value => {
            return (
              <Segment>
                <Form onSubmit={this.addToCart}>
                  <Form.Group widths='equal' style={{display:'block'}}>
                    {value.variants.map((variant, index) => (
                      <Form.Checkbox radio checked={this.state.selectedVariantIndex===index} key={variant._id} varindex={index} label={variant.sku + ':  ' + variant.price.$numberDecimal} name='variant' onChange={this.handleChange} sku={variant.sku} />
                    ))}
                  </Form.Group>
                  <Divider horizontal />
                  <Button color='blue' content='Add To Cart' disabled={this.state.selectedVariantIndex === null} type='submit' />
                </Form>
              </Segment>
            );
          }
        }
      </ProductContext.Consumer>
    );
  }
}
VariantSelectionForm.contextType = ProductContext;

export default VariantSelectionForm;