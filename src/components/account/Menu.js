import React from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem, ListItemText } from '@material-ui/core';
import { ACCOUNT_MENU_ITEMS } from '../../constants/menu';

const AccountMenu = ({ onMenuItemClick }) => (
  <Box width={1} borderColor="#979797" borderRight={1}>
    <List component="nav">
      {ACCOUNT_MENU_ITEMS.map(menuItem => (
        <ListItem
          key={menuItem.key}
          button
          onClick={() => onMenuItemClick(menuItem.key)}
        >
          <ListItemText primary={menuItem.label} />
        </ListItem>
      ))}
    </List>
  </Box>
);

AccountMenu.propTypes = {
  onMenuItemClick: PropTypes.func.isRequired
};

export default AccountMenu;
