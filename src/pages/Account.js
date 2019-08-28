import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Box,
  Container,
  Typography,
  Paper,
  Grid
} from '@material-ui/core';
import { requestFetchAccount } from '../modules/account/actions';
import {
  ShippingAddressForm,
  BillingAddressForm,
  PaymentForm
} from '../components/forms';

const pStyle = {
  padding: 20,
  textAlign: 'center'
};

const FORMS = {
  SHIPPING_ADDRESS: 'shippingAddress',
  BILLING_ADDRESS: 'billingAddress',
  PAYMENT: 'payment'
};

class Account extends React.Component {
  state = {
    shippingAddress: {}
  };

  componentDidMount() {
    this.props.requestFetchAccount('5cdc7405da53494ee0f3bafe');
    console.log('******************MOUNTED****************************');
  }

  saveFormValues = (form, values) => {
    if (form === FORMS.SHIPPING_ADDRESS) {
      this.setState({ shippingAddress: values });
    }
    // @TODO Save form values
  };

  render() {
    if (!this.props.account.contactPreferences) {
      return <div>No Account</div>;
    }
    let user = this.props.account;
    const { shippingAddress } = this.state;

    return (
      <Container>
        <Box my={2}>
          <Typography variant="h2" gutterBottom>
            My Account
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <ShippingAddressForm
              onSubmit={values =>
                this.saveFormValues(FORMS.SHIPPING_ADDRESS, values)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <BillingAddressForm
              shippingAddressSeed={{ shippingAddress }}
              onSubmit={values =>
                this.saveFormValues(FORMS.BILLING_ADDRESS, values)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PaymentForm
              onSubmit={values => this.saveFormValues(FORMS.PAYMENT, values)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} key={user._id}>
            <Link variant="button" color="textPrimary">
              <RouterLink to="/manage-profile">Manage Profile</RouterLink>
            </Link>
            <Grid item xs={12}>
              <Paper style={pStyle}>
                <Typography variant="h3" gutterBottom>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Email: {user.email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Phone: {user.phoneBook.defaultNum}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Preferred Contact Method: {user.contactPreferences.preferred}
                </Typography>
              </Paper>
            </Grid>
            <Link variant="button" color="textPrimary">
              <RouterLink to="/manage-addresses">Manage Addresses</RouterLink>
            </Link>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper style={pStyle}>
                  <Typography variant="h6" gutterBottom>
                    Default Address
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {user.defaultAddress.address1}
                    {user.defaultAddress.address2}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {user.defaultAddress.city}, {user.defaultAddress.state}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {user.defaultAddress.zipcode} {user.defaultAddress.country}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    stompClient: state.stomp.client,
    account: state.account
  };
};

const mapDispatchToProps = {
  requestFetchAccount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
