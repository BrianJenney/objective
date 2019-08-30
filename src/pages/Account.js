import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Typography, Grid, Box } from '@material-ui/core';
import { withAuthToken } from '../hoc';
import { ACCOUNT_MENU_KEYS } from '../constants/menu';
import { If } from '../components/common';
import {
  AccountMenu,
  AccountOverview,
  AccountOrders,
  AccountAddresses,
  AccountPaymentDetails,
  AccountProfile
} from '../components/account';
import { logout as logoutAction } from '../modules/account/actions';

const Account = ({ authToken, account, logout }) => {
  const [currentMenuKey, setCurrentMenuKey] = useState(
    ACCOUNT_MENU_KEYS.OVERVIEW
  );
  const handleMenuItemClick = menuKey => {
    if (menuKey === ACCOUNT_MENU_KEYS.LOGOUT) {
      logout();
    }
    setCurrentMenuKey(menuKey);
  };

  return (
    <Box>
      {authToken || (account && account.account_jwt) ? (
        <Box>
          <Typography variant="h3" gutterBottom>
            My Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <AccountMenu onMenuItemClick={handleMenuItemClick} />
            </Grid>
            <Grid item xs={12} sm={9}>
              <If condition={currentMenuKey === ACCOUNT_MENU_KEYS.OVERVIEW}>
                <AccountOverview account={account} />
              </If>
              <If condition={currentMenuKey === ACCOUNT_MENU_KEYS.YOUR_ORDERS}>
                <AccountOrders account={account} />
              </If>
              <If
                condition={currentMenuKey === ACCOUNT_MENU_KEYS.SAVED_ADDRESSES}
              >
                <AccountAddresses account={account} />
              </If>
              <If
                condition={currentMenuKey === ACCOUNT_MENU_KEYS.PAYMENT_DETAILS}
              >
                <AccountPaymentDetails account={account} />
              </If>
              <If condition={currentMenuKey === ACCOUNT_MENU_KEYS.YOUR_PROFILE}>
                <AccountProfile account={account} />
              </If>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Redirect push to="/login" />
      )}
    </Box>
  );
};

Account.propTypes = {
  authToken: PropTypes.string,
  account: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  account: state.account
});

const mapDispatchToProps = {
  logout: logoutAction
};

export default compose(
  withAuthToken,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Account);
