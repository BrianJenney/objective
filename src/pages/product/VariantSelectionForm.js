import React, { Component } from 'react';

import ProductContext from '../../contexts/ProductContext';

class VariantSelectionForm extends Component {
  static contextType = ProductContext;

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
    if (!this.context.variants)
      return <div></div>;

    return (
      {/* <div>
        <Form onSubmit={this.addToCart}>
          <Form.Group widths='equal' style={{display:'block'}}>
            {this.context.variants.map((variant, index) => (
              <Form.Checkbox radio checked={this.state.selectedVariantIndex===index} key={variant._id} varindex={index} label={variant.sku + ':  ' + variant.price.$numberDecimal} name='variant' onChange={this.handleChange} sku={variant.sku} />
            ))}
          </Form.Group>
          <Divider horizontal />
          <Button color='blue' content='Add To Cart' disabled={this.state.selectedVariantIndex === null} type='submit' />
        </Form>
      </div> */}
    );
  }
}

export default VariantSelectionForm;