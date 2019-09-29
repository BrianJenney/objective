import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { requestGetOrder } from '../../modules/order/actions';
import LoaderInProgress from '../../components/common/LoaderInProgress';

import OrderDetail from './OrderDetail';

const Order = ({ match: { params } }) => {
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);

  useEffect(() => {
    dispatch(requestGetOrder(account.account_jwt, params.id));
  }, [dispatch, params.id, account.account_jwt]);

  return order.isLoading ? <LoaderInProgress /> : <OrderDetail />;
};

export default withRouter(Order);