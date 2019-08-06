import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//mock shipping methods...where will this come from when we go live?
const shippingMethods = [{
  displayName: 'Ground',
  name: 'ground',
  price: 0.00,
  deliveryEstimate: '3-7 Business Days'
}, {
  displayName: '2 Day Air',
  name: '2dayair',
  price:  17.90,
  deliveryEstimate: '2 Business Days'
}];

class ShippingForm extends React.Component {

  constructor() {
    super();
    this.state = {
      shippingMethod: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  setShippingMethod(s) {
    this.setState({shippingMethod: s});
  }

  getData() {
    return {shipping: shippingMethods[this.state.shippingMethod]};
  }

  handleChange(event) {
    this.setShippingMethod(parseInt(event.target.value));
    this.props.cart.shipping = shippingMethods[this.state.shippingMethod];
    console.log(this.props.cart);
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping Method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <RadioGroup
              name="shippingMethod"
              onChange={this.handleChange}
              row
              value={this.shippingMethod}
            >
              {Object.values(shippingMethods).map((sm, index) => (
                <>
                <FormControlLabel key={index.toString()} value={parseInt(index)} control={<Radio checked={this.state.shippingMethod==index}/>} label={sm.displayName + ' - ' + sm.price} />
                <span>Estimated delivery:  {sm.deliveryEstimate}</span>
                </> 
              ))}
            </RadioGroup>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ShippingForm;