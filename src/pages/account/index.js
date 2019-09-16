import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { RouteWithSubRoutes } from '../../components/common';
import { AccountMenu } from '../../components/account';
import {fonts} from '../../components/Theme/fonts';

export { default as AccountOverviewPage } from './Overview';
export { default as AccountOrdersPage } from './Orders';
export { default as AccountOrderPage } from './Order';

export { default as AccountAddressesPage } from './Addresses';
export { default as AccountPaymentDetailsPage } from './PaymentDetails';
export { default as AccountProfilePage } from './Profile';

const Account = ({ routes }) => (
  <Box component={Paper} py={7}
  // bgcolor="rgba(252, 248, 244, 0.5)"
  >
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <Box borderColor="#979797" borderRight={1} height={1} fontFamily={fonts.smallHeader}>
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
