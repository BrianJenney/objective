import React from 'react';
import { connect } from 'react-redux';

import { requestFetchAccount } from '../modules/account/actions';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const pStyle = {
  padding: 20,
  textAlign: 'center'
};

class Account extends React.Component {
  componentDidMount() {
    this.props.requestFetchAccount('5cdc7405da53494ee0f3bafe');
    console.log('******************MOUNTED****************************');
  }

  render() {
    if (!this.props.account.contactPreferences) {
      return <div>No Account</div>;
    }
    let user = this.props.account;

    return (
      <Container>
        <Typography variant="h3" gutterBottom>
          My Account
        </Typography>
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
