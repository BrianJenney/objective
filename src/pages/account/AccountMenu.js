import React from 'react';
import { Container, Grid } from '@material-ui/core';
import MenuLink from '../../components/common/MenuLink';

const AccountMenu = props => {
  const handleClick = props.onClick;

  return (
    <Container>
      <Grid item xs={12}>
        <MenuLink
          to="/account"
          onClick={handleClick}
          style={{ display: 'inline-block' }}
          variant="button"
          color="textPrimary"
        >
          Overview
        </MenuLink>
      </Grid>
      <Grid item xs={12}>
        <MenuLink
          to=""
          onClick={handleClick}
          style={{ display: 'inline-block' }}
          variant="button"
          color="textPrimary"
        >
          Your Orders
        </MenuLink>
      </Grid>
      <Grid item xs={12}>
        <MenuLink
          onClick={handleClick}
          style={{ display: 'inline-block' }}
          variant="button"
          color="textPrimary"
        >
          Saved Addresses
        </MenuLink>
      </Grid>
      <Grid item xs={12}>
        <MenuLink
          onClick={handleClick}
          style={{ display: 'inline-block' }}
          variant="button"
          color="textPrimary"
        >
          Payment Details
        </MenuLink>
      </Grid>
      <Grid item xs={12}>
        <MenuLink
          onClick={handleClick}
          style={{ display: 'inline-block' }}
          variant="button"
          color="textPrimary"
        >
          Your Profile
        </MenuLink>
      </Grid>
      <Grid item xs={12}>
        <MenuLink
          onClick={handleClick}
          style={{ display: 'inline-block' }}
          variant="button"
          color="textPrimary"
        >
          Logout
        </MenuLink>
      </Grid>
    </Container>
  );
};

export default AccountMenu;
