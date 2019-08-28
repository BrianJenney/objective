import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import {
  requestFetchAccount as requestFetchAccountAction,
  requestPatchAccount as requestPatchAccountAction
} from '../modules/account/actions';
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
  PAYMENT: 'paymentDetails'
};

class Account extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    requestFetchAccount: PropTypes.func.isRequired,
    requestPatchAccount: PropTypes.func.isRequired
  };

  state = {
    shippingAddress: {}
  };

  componentDidMount() {
    const { requestFetchAccount } = this.props;

    requestFetchAccount('5cdc7405da53494ee0f3bafe');
  }

  saveFormValues = (form, values) => {
    const { account, requestPatchAccount } = this.props;

    if (form === FORMS.SHIPPING_ADDRESS) {
      this.setState({ shippingAddress: values });
    }
    requestPatchAccount(account._id, { [form]: values });
  };

  render() {
    const { account } = this.props;

    if (!account.contactPreferences) {
      return <div>No Account</div>;
    }
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
          <Grid item xs={12} key={account._id}>
            <Link variant="button" color="textPrimary">
              <RouterLink to="/manage-profile">Manage Profile</RouterLink>
            </Link>
            <Grid item xs={12}>
              <Paper style={pStyle}>
                <Typography variant="h3" gutterBottom>
                  {account.firstName} {account.lastName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Email: {account.email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Phone: {account.phoneBook.defaultNum}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Preferred Contact Method:{' '}
                  {account.contactPreferences.preferred}
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
                    {account.defaultAddress.address1}
                    {account.defaultAddress.address2}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {account.defaultAddress.city},{' '}
                    {account.defaultAddress.state}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {account.defaultAddress.zipcode}{' '}
                    {account.defaultAddress.country}
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

const mapStateToProps = state => ({
  account: state.account
});

const mapDispatchToProps = {
  requestFetchAccount: requestFetchAccountAction,
  requestPatchAccount: requestPatchAccountAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
