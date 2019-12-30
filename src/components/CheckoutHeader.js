import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unSetCartMergeNotification } from '../modules/cart/actions';
import Logo from './common/Icons/Logo/Logo';

const CheckoutHeader = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(unSetCartMergeNotification());
  };

  return (
    <>
      <div className="checkout-header">
        <NavLink to="/" onClick={handleClick}>
          <Logo />
        </NavLink>
      </div>
    </>
  );
};

export default CheckoutHeader;
