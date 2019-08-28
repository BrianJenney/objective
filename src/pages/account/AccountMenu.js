import React from 'react';
import Container from '@material-ui/core/Container';
import MenuLink from '../../components/common/MenuLink';

const AccountMenu = props => {
  const handleClick = props.onClick;

  return (
    <Container>
      <MenuLink
        to="/account"
        onClick={handleClick}
        style={{ display: 'inline-block' }}
        variant="button"
        color="textPrimary"
      >
        Overview
      </MenuLink>
      <MenuLink
        to=""
        onClick={handleClick}
        style={{ display: 'inline-block' }}
        variant="button"
        color="textPrimary"
      >
        Your Orders
      </MenuLink>
      <MenuLink
        onClick={handleClick}
        style={{ display: 'inline-block' }}
        variant="button"
        color="textPrimary"
      >
        Saved Addresses
      </MenuLink>
      <MenuLink
        onClick={handleClick}
        style={{ display: 'inline-block' }}
        variant="button"
        color="textPrimary"
      >
        Payment Details
      </MenuLink>
      <MenuLink
        onClick={handleClick}
        style={{ display: 'inline-block' }}
        variant="button"
        color="textPrimary"
      >
        Your Profile
      </MenuLink>
      <MenuLink
        onClick={handleClick}
        style={{ display: 'inline-block' }}
        variant="button"
        color="textPrimary"
      >
        Logout
      </MenuLink>
    </Container>
  );
};

export default AccountMenu;
