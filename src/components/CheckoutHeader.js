import React from 'react';
import Typography from '@material-ui/core/Typography';
import Logo from './common/Icons/Logo/Logo';

class CheckoutHeader extends React.Component {
  render() {
    return (
      <div className="checkout-header">
        <Logo />
      </div>
    );
  }
}

export default CheckoutHeader;
