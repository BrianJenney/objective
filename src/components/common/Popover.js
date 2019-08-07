import React from 'react';
import PropTypes from 'prop-types';
import { Box, Popover } from '@material-ui/core';

const PopoverView = ({ panelId, toggleContent, popoverContent, ...rest }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? panelId : null;

  return (
    <Box width="100%" {...rest}>
      <Box
        width="100%"
        aria-describedby={id}
        onClick={handleClick}
        children={toggleContent}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        children={popoverContent}
      />
    </Box>
  );
};

PopoverView.propTypes = {
  panelId: PropTypes.string,
  toggleContent: PropTypes.node.isRequired,
  popoverContent: PropTypes.node.isRequired
};

PopoverView.defaultProps = {
  panelId: 'default-popover'
};

export default PopoverView;
