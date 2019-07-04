import React, { Component } from 'react'

import { Container, Form } from 'semantic-ui-react';

import { STATE_OPTIONS, COUNTRY_OPTIONS } from '../constants/location';

class Checkout extends Component {
  render() {
    return (
      <Container>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='First name' placeholder='First name' />
            <Form.Input fluid label='Last name' placeholder='Last name' />
          </Form.Group>
          <Form.Input fluid label='Address' placeholder='Address' />
          <Form.Input fluid label='Address 2 (optional)' placeholder='Apt, unit #' />
          <Form.Group widths='equal'>
            <Form.Input fluid label='City' placeholder='City' />
            <Form.Select fluid label='State' options={STATE_OPTIONS} placeholder='Select State' />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Zip Code' placeholder='Zip Code' />
            <Form.Select fluid label='Country' options={COUNTRY_OPTIONS} placeholder='Select Country' />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='First name' placeholder='First name' />
            <Form.Input fluid label='Last name' placeholder='Last name' />
          </Form.Group>
          <Form.Checkbox label='I agree to the Terms and Conditions' />
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default Checkout;