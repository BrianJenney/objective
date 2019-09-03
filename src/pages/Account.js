import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Box, Paper } from '@material-ui/core';
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
import { requestLogout as requestLogoutAction } from '../modules/account/actions';

const Account = ({ account, logout }) => {
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
    <Box component={Paper} py={7}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Box borderColor="#979797" borderRight={1}>
            <AccountMenu onMenuItemClick={handleMenuItemClick} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
          <If condition={currentMenuKey === ACCOUNT_MENU_KEYS.OVERVIEW}>
            <AccountOverview account={account} />
          </If>
          <If condition={currentMenuKey === ACCOUNT_MENU_KEYS.YOUR_ORDERS}>
            <AccountOrders account={account} />
          </If>
          <If condition={currentMenuKey === ACCOUNT_MENU_KEYS.SAVED_ADDRESSES}>
            <AccountAddresses account={account} />
          </If>
          <If condition={currentMenuKey === ACCOUNT_MENU_KEYS.PAYMENT_DETAILS}>
            <AccountPaymentDetails account={account} />
          </If>
          <If condition={currentMenuKey === ACCOUNT_MENU_KEYS.YOUR_PROFILE}>
            <AccountProfile account={account} />
          </If>
        </Grid>
      </Grid>
    </Box>
  );
};

Account.propTypes = {
  account: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  account: state.account
});

const mapDispatchToProps = {
  logout: requestLogoutAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
