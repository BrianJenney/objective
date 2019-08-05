import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


class AddressForm extends React.Component{

  constructor(props) {
    super(props);
    this.state = props.cart.shippingAddress || {};
    this.handleChange = this.handleChange.bind(this);
  }

  validate() {
    return ((this.state.firstName) && (this.state.lastName) && (this.state.address1) && (this.state.city) && (this.state.zip) && (this.state.country));
  }

  getData() {
    return {shippingAddress: this.state};
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
        Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label={!this.state.firstName ? "First name" : ''}
              fullWidth
              autoComplete="fname"
              onChange={this.handleChange}
              value={this.state.firstName ? this.state.firstName : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label={!this.state.lastName ? "Last name" : ''}
              fullWidth
              autoComplete="lname"
              onChange={this.handleChange}
              value={this.state.lastName ? this.state.lastName : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label={!this.state.address1 ? "Address line 1" : ''}
              fullWidth
              autoComplete="billing address-line1"
              onChange={this.handleChange}
              value={this.state.address1 ? this.state.address1 : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label={!this.state.address2 ? "Address line 2" : ''}
              fullWidth
              autoComplete="billing address-line2"
              onChange={this.handleChange}
              value={this.state.address2 ? this.state.address2 : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label={!this.state.city ? "City" : ''}
              fullWidth
              autoComplete="billing address-level2"
              onChange={this.handleChange}
              value={this.state.city ? this.state.city : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              id="state" 
              name="state" 
              label={!this.state.state ? "State/Province/Region" : ''} 
              fullWidth 
              onChange={this.handleChange}
              value={this.state.state ? this.state.state : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label={!this.state.zip ? "Zip/Postal Code" : ''}
              fullWidth
              autoComplete="billing postal-code"
              onChange={this.handleChange}
              value={this.state.zip ? this.state.zip : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label={!this.state.country ? "Country" : ''}
              fullWidth
              autoComplete="billing country"
              onChange={this.handleChange}
              value={this.state.country ? this.state.country : ''}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AddressForm;