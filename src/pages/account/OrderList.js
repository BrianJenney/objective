import React from 'react';
import store from '../../store';
import { requestFindOrdersByAccount } from '../../modules/order/actions';

const OrderList = props => {
  const { account } = props;

  if (!account.orders) {
    store.dispatch(requestFindOrdersByAccount(account.account_jwt));
    return <div></div>;
  }

  const orderList = account.orders.map(order => (
    <tr>
      <td>{order._id}</td>
      <td>{order.createdAt.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$2/$3/$1')}</td>
      <td>{order.cart.total}</td>
      <td>-</td>
    </tr>
  ));

  return (
    <>
      <h2>Your Orders</h2>
      <table>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Tracking Information</th>
        </tr>
        {orderList}
      </table>
    </>
  );
};

export default OrderList;
