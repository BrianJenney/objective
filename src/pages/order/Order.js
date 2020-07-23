import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { requestGetOrder, receivedGetOrder, resetOrderState } from '../../modules/order/actions';
import { requestLogout } from '../../modules/account/actions';
import LoaderInProgress from '../../components/common/LoaderInProgress';

import OrderDetail from './OrderDetail';

const Order = ({ history, match: { params } }) => {
  const dispatch = useDispatch();
  const { state } = history.location;
  const order = useSelector(st => st.order);
  let account = useSelector(st => st.account);
  const { isLoading } = order;

  account = account.data;

  if (order.order && !account.account_jwt) {
    account = { account_jwt: false };
  }

  if (!account.account_jwt && !isLoading) {
    history.push('/login');
  }

  const shouldLookup = !order.order || (order.order && order.order._id !== params.id);

  useEffect(() => {
    if (account.account_jwt && shouldLookup) {
      dispatch(requestGetOrder(account.account_jwt, params.id));
    }
    return () => {
      dispatch(receivedGetOrder(null));
      dispatch(resetOrderState());
      if (account.temporarilyLogin) {
        dispatch(requestLogout());
      }
    };
  }, [params.id, account.account_jwt]);

  useEffect(() => {
    if (order.order && !order.order._id) {
      // Order does not belong to user, so redirect to account/orders
      history.push('/account/orders', state);
    }
  }, [order.order]);

  if (order.order && !order.order._id) {
    return <LoaderInProgress />;
  }

  return order.isLoading ? <LoaderInProgress /> : <OrderDetail hideLPCoupon={state} />;
};

Order.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(Order);
