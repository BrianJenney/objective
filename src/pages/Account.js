import React, { useState } from 'react';
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
import OrderList from './account/OrderList';

import { CropLandscapeOutlined } from '@material-ui/icons';

const Account = ({ authToken }) => {
  const { account } = store.getState();

  let [currentComponent, setCurrentComponent] = useState('overview');

  const handleClick = e => {
    setCurrentComponent(
      e.currentTarget.textContent.toLowerCase().replace(/\s/g, '')
    );
    console.log(currentComponent);
  };

  const getPanel = () => {
    console.log(currentComponent);
    switch (currentComponent) {
      case 'overview':
        return <AccountHome account={account} />;
      case 'yourorders':
        return <OrderList account={account} />;
      case 'savedaddresses':
        return <h2>Saved Addresses</h2>;
      case 'paymentdetails':
        return <h2>Payment Details</h2>;
      case 'yourprofile':
        return <ManageProfile account={account} />;
      case 'logout':
        return <h2>logout</h2>;
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
};

export default withAuthToken(Account);
