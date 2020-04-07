import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { requestGetOrder, receivedGetOrder } from '../../modules/order/actions';
import LoaderInProgress from '../../components/common/LoaderInProgress';

import OrderDetail from './OrderDetail';

const Order = ({ history, match: { params } }) => {
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);

  useEffect(() => {
    dispatch(requestGetOrder(account.account_jwt, params.id));
    return () => {
      //Set order state back to null
      dispatch(receivedGetOrder(null));
    };
  }, [dispatch, params.id, account.account_jwt]);

  useEffect(() => {
    if (order.order && order.order.status === 'unauthorized-access' && !order.order._id) {
      history.push('/account/orders');
    }
  }, [order.order]);

  if (order.order && order.order.status === 'unauthorized-access' && !order.order._id) {
    return <LoaderInProgress />;
  }

  return order.isLoading ? <LoaderInProgress /> : <OrderDetail />;
};

export default withRouter(Order);
