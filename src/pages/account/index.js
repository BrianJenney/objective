import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import { Grid, Box, Paper } from '@material-ui/core';
import { RouteWithSubRoutes } from '../../components/common';
import { AccountMenu } from '../../components/account';

export { default as AccountOverviewPage } from './Overview';
export { default as AccountOrdersPage } from './Orders';
export { default as AccountAddressesPage } from './Addresses';
export { default as AccountPaymentDetailsPage } from './PaymentDetails';
export { default as AccountProfilePage } from './Profile';

const Account = ({ routes }) => (
  <Box component={Paper} py={7}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <Box borderColor="#979797" borderRight={1} height={1}>
          <AccountMenu />
        </Box>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Switch>
          <Redirect exact from="/account" to="/account/overview" />
          {routes.map(route => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
        </Switch>
      </Grid>
    </Grid>
  </Box>
);

Account.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export const AccountPage = Account;
