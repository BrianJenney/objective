import React from 'react';
import Grid from '@material-ui/core/Grid';
import Logo from './common/Icons/Logo/Logo';

class CheckoutHeader extends React.Component {
  render() {
    return (
      <Grid item xs={12} className="logo text-center">
        
          <Logo />
        
      </Grid>
    );
  }
}

export default CheckoutHeader;
