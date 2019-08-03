import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class PaymentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.cart.paymentDetails || { };
    this.handleChange = this.handleChange.bind(this);
  }

  validate() {
    return ((this.state.cardName)  && (this.state.cardNumber)  && (this.state.expDate) && (this.state.cvv));
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  getData() {
    return {paymentDetails: this.state};
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField 
              required 
              id="cardName" 
              label={!this.state.cardName ? "Name on Card" : ''}
              fullWidth 
              onChange={this.handleChange}
              value={this.state.cardName ? this.state.cardName : ''}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              required 
              id="cardNumber" 
              label={!this.state.cardNumber ? "Card Number" : ''} 
              fullWidth 
              onChange={this.handleChange}
              value={this.state.cardNumber ? this.state.cardNumber : ''}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField 
              required 
              id="expDate" 
              label={!this.state.expDate ? "Expiry Date" : ''} 
              fullWidth 
              onChange={this.handleChange}
              value={this.state.expDate ? this.state.expDate : ''}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label={!this.state.cvv ? "CVV" : ''}
              helperText="Last three digits on signature strip"
              fullWidth
              onChange={this.handleChange}
              value={this.state.cvv ? this.state.cvv : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label="Remember credit card details for next time"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default PaymentForm;