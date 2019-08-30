import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem, ListItemText } from '@material-ui/core';
import { ACCOUNT_MENU_KEYS, ACCOUNT_MENU_ITEMS } from '../../constants/menu';

const AccountMenu = ({ onMenuItemClick }) => {
  const [selectedMenuKey, setSelectedMenuKey] = useState(
    ACCOUNT_MENU_KEYS.OVERVIEW
  );
  const handleMenuItemClick = menuKey => {
    setSelectedMenuKey(menuKey);
    onMenuItemClick(menuKey);
  };

  return (
    <Box width={1}>
      <List component="nav">
        {ACCOUNT_MENU_ITEMS.map(menuItem => (
          <ListItem
            key={menuItem.key}
            button
            onClick={() => handleMenuItemClick(menuItem.key)}
          >
            <ListItemText
              primary={
                <Box
                  fontWeight={
                    selectedMenuKey === menuItem.key ? 'bold' : 'normal'
                  }
                  px={7}
                  children={menuItem.label}
                />
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
  onMenuItemClick: PropTypes.func.isRequired
};

export default AccountMenu;
