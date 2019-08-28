import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import store from '../../store';
import { requestFindOrdersByAccount } from '../../modules/order/actions';
const OrderList = props => {
  const { account } = props;
  store.dispatch(requestFindOrdersByAccount(account.account_jwt));

  return <h2>Your Orders</h2>;
};

export default OrderList;