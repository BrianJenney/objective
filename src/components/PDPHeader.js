import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import ProductContext from '../contexts/ProductContext';

export default class PDPHeader extends Component {

  render() {
    return (
      <ProductContext.Consumer>
        { 
          value => { 
            return (
              <Segment>
                <Header as='h3'>{value.product.name}</Header>
                <div>{value.product.description}</div>
              </Segment>
            )
          }
        }
      </ProductContext.Consumer>
      )
  }
}

