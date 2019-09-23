import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ACCOUNT_MENU_KEYS, ACCOUNT_MENU_ITEMS } from '../../constants/menu';
import { NavLink, MenuLink } from '../common';
import { withLogout } from '../../hoc';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const StyledMenuItem = withStyles(theme => ({
  root: {
    fontFamily: 'p22-underground',
    fontSize: 16,
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))(MenuItem);

const AccountMenu = ({ logout }) => {
  return (
    <Box width={1} className="account-menu-box">
      <List component="nav" className="account-left-side">
        {ACCOUNT_MENU_ITEMS.map(menuItem => (
          <ListItem key={menuItem.key}>
            <ListItemText
              primary={
                <div className="account-side-menu">
                  {menuItem.key === ACCOUNT_MENU_KEYS.LOGOUT ? (
                    <MenuLink onClick={logout}>{menuItem.label}</MenuLink>
                  ) : (
                    <NavLink to={menuItem.to}>{menuItem.label}</NavLink>
                  )}
                </div>
              }
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
