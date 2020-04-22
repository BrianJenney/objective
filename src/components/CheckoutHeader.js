import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCartNotification } from '../modules/utils/actions'
import Logo from './common/Icons/Logo/Logo';

const CheckoutHeader = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCartNotification(false));
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
