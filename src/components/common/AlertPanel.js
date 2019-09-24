import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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

const AlertPanel = ({ type, text, style, ...rest }) => {
  const color = COLOR_MAP[type];

  return (
    <Box color={color} alignItems="center" width={1} {...rest}>
      <Typography variant="body2" style={style} children={text} />
    </Box>
  );
};

AlertPanel.propTypes = {
  type: PropTypes.oneOf(Object.values(ALERT_TYPES)),
  text: PropTypes.string,
  style: PropTypes.any,
  variant: PropTypes.string
};

AlertPanel.defaultProps = {
  type: ALERT_TYPES.INFO
};

export default AlertPanel;
