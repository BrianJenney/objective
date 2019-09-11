import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

export const ALERT_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error'
};

const COLOR_MAP = {
  [ALERT_TYPES.INFO]: 'primary.main',
  [ALERT_TYPES.WARNING]: 'secondary.main',
  [ALERT_TYPES.ERROR]: 'error.main'
};

const AlertPanel = ({ type, text, variant, ...rest }) => {
  const color = COLOR_MAP[type];

  return (
    <Box
      // p={2}
      // display="flex"
      color={color}
      alignItems="center"
      width={1}
      {...rest}
    >
      <Typography variant={variant} children={text} />
    </Box>
  );
};

AlertPanel.propTypes = {
  type: PropTypes.oneOf(Object.values(ALERT_TYPES)),
  text: PropTypes.string
};

AlertPanel.defaultProps = {
  type: ALERT_TYPES.INFO
};

export default AlertPanel;
