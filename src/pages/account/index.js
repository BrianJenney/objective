import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { RouteWithSubRoutes } from '../../components/common';
import { AccountMenu } from '../../components/account';
import { fonts } from '../../components/Theme/fonts';
import { makeStyles } from '@material-ui/core/styles';
export { default as AccountOverviewPage } from './Overview';
export { default as AccountOrdersPage } from './Orders';
export { default as AccountAddressesPage } from './Addresses';
export { default as AccountPaymentDetailsPage } from './PaymentDetails';
export { default as AccountProfilePage } from './Profile';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rgba(252, 248, 244, 0.5)',
    padding: theme.spacing(3)
  },
  paper: {
    backgroundColor: theme.palette.common.white,
    margin: theme.spacing(5, 5)
  }
}));
const Account = ({ routes }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Box
              borderColor="#979797"
              borderRight={1}
              height={1}
              fontFamily={fonts.smallHeader}
            >
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
    </Box>
  );
};
Account.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired
};
export const AccountPage = Account;





