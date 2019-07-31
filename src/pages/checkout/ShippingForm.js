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
  price: 'FREE',
  deliveryEstimate: '3-7 Business Days'
}, {
  displayName: '2 Day Air',
  name: '2dayair',
  price:  '$17.90',
  deliveryEstimate: '2 Business Days'
}];



export default function ShippingForm(props) {

  const [shippingMethod, setShippingMethod] = React.useState(0);
  
  props.cart.shipping = shippingMethods[shippingMethod];

  function handleChange(event) {
    setShippingMethod(parseInt(event.target.value));
    props.cart.shipping = shippingMethods[shippingMethod];
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping Method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <RadioGroup
            name="shippingMethod"
            onChange={handleChange}
            row
            value={shippingMethod}
          >
            {Object.values(shippingMethods).map((sm, index) => (
              <>
              <FormControlLabel key={index.toString()} value={parseInt(index)} control={<Radio />} label={sm.displayName + ' - ' + sm.price} />
              <span>Estimated delivery:  {sm.deliveryEstimate}</span>
              </> 
            ))}
          </RadioGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}