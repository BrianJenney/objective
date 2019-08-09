import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import { object, number } from 'yup';
import { Container, FormLabel } from '@material-ui/core';
import ProductContext from '../../contexts/ProductContext';
import { requestPatchCart } from '../../modules/cart/actions';
import store from '../../store';
import { Button } from '../../components/common';
import { RadioGroupField } from '../../components/form-fields';

const localStorageClient = require('store');

const calculateCartTotal = cartItems =>
  cartItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);

const schema = object().shape({ selectedVariantIndex: number() });
const INITIAL_VALUES = {
  selectedVariantIndex: null
};

export default class VariantSelectionForm extends Component {
  static contextType = ProductContext;

  renderForm = ({ values }) => {
    const { variants } = this.context;
    const variantOptions = Object.values(variants).map((variant, index) => ({
      key: variant._id,
      label: `${variant.sku}: ${variant.price.$numberDecimal}`,
      value: index
    }));

    return (
      <Form>
        <FormLabel component="legend">Select an Option:</FormLabel>
        <Field
          component={RadioGroupField}
          name="selectedVariantIndex"
          options={variantOptions}
        />
        <Button disabled={values.selectedVariantIndex === null} type="submit">
          Add To Cart
        </Button>
      </Form>
    );
  };

  handleSubmit = values => {
    const { cart } = store.getState();
    const variant = this.context.variants[values.selectedVariantIndex];
    const newItems = cart.items;
    let alreadyInCart = false;

    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].variant_id == variant._id) {
        alreadyInCart = true;
        newItems[i].quantity++;
      }
    }

    if (!alreadyInCart) {
      const newItem = {
        product_id: this.context.product._id,
        variant_id: variant._id,
        product_name: this.context.product.name,
        variant_name: variant.name,
        quantity: 1,
        unit_price: parseFloat(variant.price.$numberDecimal)
      };
      newItems.push(newItem);
    }

    const patches = {
      items: newItems,
      subtotal: calculateCartTotal(newItems),
      total: calculateCartTotal(newItems)
    };

    store.dispatch(requestPatchCart(localStorageClient.get('cartId'), patches));
  };

  render() {
    const { variants } = this.context;

    if (!variants) {
      return null;
    }

    return (
      <Container>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={this.handleSubmit}
          validationSchema={schema}
          render={this.renderForm}
        />
      </Container>
    );
  }
}
