import React from 'react';
import Logo from './common/Icons/Logo/Logo';
import { NavLink } from 'react-router-dom';

class CheckoutHeader extends React.Component {
  render() {
    return (
      <div className="checkout-header">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
    );
  }
}

export default CheckoutHeader;
