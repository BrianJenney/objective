import React, { Component } from 'react';
import ProductContext from '../../contexts/ProductContext';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

import store from '../../store';

import { requestPatchCart } from '../../modules/cart/actions';

const msgpack = require('msgpack-lite');
const ObjectId = require('bson-objectid');

class VariantSelectionForm extends Component {
  static contextType = ProductContext;

  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { selectedVariantIndex: null };
  }

  calculateCartTotal(c) {
    let total = 0;
    for(var i = 0; i < c.length; i++) {
      total += (c[i].unit_price * c[i].quantity); 
    }
    return total;
  }

  addToCart = (e) => {
    const { cart } = store.getState();

    let variant = this.context.variants[this.state.selectedVariantIndex];

    const localStorageClient = require('store');

    let newitems = cart.items;

    let alreadyInCart = false;

    for(var i = 0; i < newitems.length; i++) {
      if(newitems[i].variant_id == variant._id) {
        alreadyInCart = true;
        newitems[i].quantity++;
      }
    }
    
    
    if(!alreadyInCart) {
      let newitem = {
        product_id: this.context.product._id,
        variant_id: variant._id,
        product_name: this.context.product.name,
        variant_name: variant.name,
        quantity: 1,
        unit_price: parseFloat(variant.price.$numberDecimal)
      }
      newitems.push(newitem);
    }
//    console.log(cart.subtotal, newitem.unit_price);

    let patches = {
      items: newitems,
      subtotal: this.calculateCartTotal(newitems),
      total: this.calculateCartTotal(newitems)
    }

    store.dispatch(requestPatchCart(localStorageClient.get('cartId'), patches));

  }

  handleChange(e) {
    this.setState({selectedVariantIndex: e.target.value});
  }

  render() {
    if (!this.context.variants)
      return <div></div>;

    return (
      <Container>
        <form>
          <FormLabel component="legend">Select an Option:</FormLabel>
          <RadioGroup onChange={this.handleChange} >
            {Object.values(this.context.variants).map((variant, index) => (
              <FormControlLabel value={index} control={<Radio />} label={variant.sku + ':  ' + variant.price.$numberDecimal} key={variant._id}  />
            ))}
          </RadioGroup>
          <Button
            color="primary"
            disabled={this.state.selectedVariantIndex === null}
            onClick={(e) => this.addToCart(e)}
            variant="contained"
          >
            Add To Cart
          </Button>
        </form>
      </Container>
    );
  }
}

export default VariantSelectionForm;