import React, { Component } from 'react';
import ProductContext from '../../contexts/ProductContext';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { conditionalExpression } from '@babel/types';

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
      <Container>
        <form>
          <FormLabel component="legend">Variant Options</FormLabel>
          <RadioGroup onChange={this.handleChange} >
            {Object.values(this.context.variants).map((variant, index) => (
              <FormControlLabel value={variant._id} control={<Radio />} label={variant.sku + ':  ' + variant.price.$numberDecimal} key={variant._id}  />
          ))}
          </RadioGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Add To Cart
          </Button>
        </form>
      </Container>
    );
  }
}

export default VariantSelectionForm;