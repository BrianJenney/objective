import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { RouteWithSubRoutes } from '../../components/common';
import { AccountMenu } from '../../components/account';
import { fonts } from '../../components/Theme/fonts';

import './account-style.scss';
export { default as AccountOverviewPage } from './Overview';
export { default as AccountOrdersPage } from './Orders';
export { default as AccountAddressesPage } from './Addresses';
export { default as AccountPaymentDetailsPage } from './PaymentDetails';
export { default as AccountProfilePage } from './Profile';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rgba(252, 248, 244, 0.5)',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      backgroundColor: '#FFF'
    }
  },
  paper: {
    padding: '58px',
    backgroundColor: '#FFF',
    [theme.breakpoints.down('xs')]: {
      padding: 0
    }
  },
  rightSideGrid: {
    paddingLeft: '58px !important',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: "12px !important"
    }
  },
  accountMenuGrid: {
    borderRight: "1px solid #231f20",
    [theme.breakpoints.down('xs')]: {
      borderRight: "unset"
    }
  }
}));
const Account = ({ routes }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} py={10}>
      <Container>
        <Box className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} className={classes.accountMenuGrid}>
              <Box>
                <AccountMenu />
              </Box>
            </Grid>
            <Grid item xs={12} md={9} className={`right-side-account ${classes.rightSideGrid}`}>
              <Switch>
                <Redirect exact from="/account" to="/account/overview" />
                {routes.map(route => (
                  <RouteWithSubRoutes key={route.path} {...route} />
                ))}
              </Switch>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
Account.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired
};
export const AccountPage = Account;
