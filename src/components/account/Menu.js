import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ACCOUNT_MENU_KEYS, ACCOUNT_MENU_ITEMS } from '../../constants/menu';
import { NavLink, MenuLink } from '../common';
import { withLogout } from '../../hoc';

const AccountMenu = ({ logout }) => {
  return (
    <Box width={1}>
      <List component="nav">
        {ACCOUNT_MENU_ITEMS.map(menuItem => (
          <ListItem key={menuItem.key} button>
            <ListItemText
              primary={
                <Box px={7}>
                  {menuItem.key === ACCOUNT_MENU_KEYS.LOGOUT ? (
                    <MenuLink onClick={logout}>{menuItem.label}</MenuLink>
                  ) : (
                    <NavLink to={menuItem.to}>{menuItem.label}</NavLink>
                  )}
                </Box>
              }
              primaryTypographyProps={{ variant: 'h6' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

AccountMenu.propTypes = {
  logout: PropTypes.func.isRequired
};

export default withLogout(AccountMenu);
