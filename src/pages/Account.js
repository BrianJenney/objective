import React, { useState } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
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
<<<<<<< HEAD
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
=======
=======
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import store from '../store';
import { withAuthToken } from '../hoc';
import AccountHome from './account/AccountHome';
import AccountMenu from './account/AccountMenu';
import ManageProfile from './account/ManageProfile';
import { CropLandscapeOutlined } from '@material-ui/icons';

const Account = ({ authToken }) => {
  const { account } = store.getState();

  let [currentComponent, setCurrentComponent] = useState('overview');

  const handleClick = e => {
    setCurrentComponent(e.currentTarget.textContent.toLowerCase().replace(/\s/g, ''));
    console.log(currentComponent);
  };

  const getPanel = () => {
    console.log(currentComponent);
    switch (currentComponent) {
      case 'overview':
        return <AccountHome account={account} />;
      case 'yourorders':
        return <h2>Your Orders</h2>;
      case 'savedaddresses':
        return <h2>Saved Addresses</h2>;
      case 'paymentdetails':
        return <h2>Payment Details</h2>;
      case 'yourprofile':
        return <ManageProfile account={account} />;
      case 'logout':
        return <h2>Logout</h2>;
      default:
        return null;
    }
  };

  return (
    <div>
      {authToken || (account && account.account_jwt) ? (
        <Container>
          <Typography variant="h3" gutterBottom>
            My Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={3} key={account.firstName}>
              <AccountMenu onClick={handleClick} />
>>>>>>> Making account section more like mockup
            </Grid>
            <Grid item xs={9} key={account.firstName}>
              <>{getPanel()}</>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
>>>>>>> Making account section more like mockup
};

export default withAuthToken(Account);
