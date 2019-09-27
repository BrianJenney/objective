import React from 'react';
import Grid from '@material-ui/core/Grid';
import Logo from './common/Icons/Logo/Logo';
import { NavLink } from './common';

class CheckoutHeader extends React.Component {
  render() {
    return (
      <Grid
        item
        xs={12}
        className="logo text-center"
        style={{ paddingTop: 35 }}
      >
        <NavLink to="/">
          <Logo />
        </NavLink>
      </Grid>
    );
  }
}

export default CheckoutHeader;
