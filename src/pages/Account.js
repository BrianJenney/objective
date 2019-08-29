import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import store from '../store';
import { withAuthToken } from '../hoc';
import AccountHome from './account/AccountHome';
import AccountMenu from './account/AccountMenu';
import ManageAddresses from './account/ManageAddresses';
import ManageProfile from './account/ManageProfile';
import OrderList from './account/OrderList';

const Account = ({ authToken }) => {
  const { account } = store.getState();
  const [currentComponent, setCurrentComponent] = useState('overview');

  const handleClick = e => {
    setCurrentComponent(
      e.currentTarget.textContent.toLowerCase().replace(/\s/g, '')
    );
  };

  const getPanel = () => {
    switch (currentComponent) {
      case 'overview':
        return <AccountHome account={account} />;
      case 'yourorders':
        return <OrderList account={account} />;
      case 'savedaddresses':
        return <ManageAddresses account={account} />;
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
