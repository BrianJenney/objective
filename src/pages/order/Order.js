import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { requestGetOrder, receivedGetOrder, resetOrderState } from '../../modules/order/actions';
import { receivedFetchAccountSuccess, requestLogout } from '../../modules/account/actions';
import LoaderInProgress from '../../components/common/LoaderInProgress';

import OrderDetail from './OrderDetail';

const Order = ({ history, match: { params } }) => {
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);
  let account = useSelector(state => state.account);
  const isLoading = order.isLoading;

  account = account.data;

  if (order.order && order.order.account) {
    account = order.order.account;
  }
  if (order.order && !account.hasOwnProperty('account_jwt')) {
    account = { account_jwt: false };
  }

  if (!account.hasOwnProperty('account_jwt') && !isLoading) {
    history.push('/login');
  }

  const shouldLookup = !order.order || (order.order && order.order._id !== params.id);

  useEffect(() => {
    if (account.account_jwt && shouldLookup) {
      dispatch(requestGetOrder(account.account_jwt, params.id));
      return () => {
        dispatch(receivedGetOrder(null));
        dispatch(resetOrderState());
        if (account.temporarilyLogin) {
          dispatch(requestLogout());
        }
      };
    } else {
      return () => {
        dispatch(receivedGetOrder(null));
        dispatch(resetOrderState());
        if (account.temporarilyLogin) {
          dispatch(requestLogout());
        }
      };
    }
  }, [params.id, account.account_jwt]);

  useEffect(() => {
    if (order.order && !order.order._id) {
      //Order does not belong to user, so redirect to account/orders
      history.push('/account/orders');
    }
  }, [order.order]);

  if (order.order && !order.order._id) {
    return <LoaderInProgress />;
  }

  return order.isLoading ? <LoaderInProgress /> : <OrderDetail />;
};

export default withRouter(Order);
