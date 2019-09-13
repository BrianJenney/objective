import React from 'react';
import store from '../../store';
import { requestFindOrdersByAccount } from '../../modules/order/actions';
import {fonts} from '../../components/Theme/fonts';

const subTitles = {
  fontFamily: fonts.smallHeader,
  fontSize: 18,
  display: 'flex',
  justifyContent: 'center'
}

const orderStyle = {
  fontFamily: fonts.smallHeader,
  fontSize: 18,
  background: '#fbf7f3',
  margin: 7
}

const title = {
  fontFamily: fonts.header,
  fontSize: 48
}


const AccountOrders = props => {
  const { currentUser } = props;

  if (!currentUser.data.orders) {
    store.dispatch(requestFindOrdersByAccount(currentUser.data.account_jwt));
    return <div></div>;
  }

  const orderList = currentUser.data.orders.map(order => (
    <tr style={orderStyle}>
      <td>{order._id}</td>
      <td>
        {order.createdAt.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$2/$3/$1')}
      </td>
      <td>{order.cart.total}</td>
      <td>-</td>
    </tr>
  ));

  return (
    <>
      <h2 style={title}>Your Orders</h2>
      <table>
        <tr style={subTitles}>
          <th style={{textAlign: 'left', paddingRight: 50}}>Order ID</th>
          <th style={{textAlign: 'left', paddingRight: 50}}>Date</th>
          <th style={{textAlign: 'left', paddingRight: 50}}>Amount</th>
          <th style={{textAlign: 'left', paddingRight: 50}}>Tracking Information</th>
        </tr>
        {orderList}
      </table>
    </>
  );
};

export default AccountOrders;
