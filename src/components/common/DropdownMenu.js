import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Menu, MenuItem, Typography } from '@material-ui/core';
import MenuLink from './MenuLink';

const DropdownMenu = ({
  toggleLabel,
  dropdownTitle,
  panelId,
  menuItems,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box {...rest}>
      <Button
        aria-owns={open ? panelId : undefined}
        aria-haspopup="true"
        onClick={handleMenu}
        children={toggleLabel}
      />
      <Menu
        id={panelId}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
      >
        {dropdownTitle && (
          <Box p={2}>
            <Typography color="primary" children={dropdownTitle} />
          </Box>
        )}
        {menuItems.map(({ key, ...itemRestProps }) => (
          <MenuItem key={key} onClick={handleClose}>
            <MenuLink {...itemRestProps} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

DropdownMenu.propTypes = {
  toggleLabel: PropTypes.node.isRequired,
  dropdownTitle: PropTypes.string,
  panelId: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.object)
};

DropdownMenu.defaultProps = {
  panelId: 'truehealth-dropdown',
  menuItems: []
};

export default DropdownMenu;
