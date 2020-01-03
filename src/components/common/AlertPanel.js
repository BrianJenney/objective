import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

export const ALERT_TYPES = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error'
};

const COLOR_MAP = {
  [ALERT_TYPES.SUCCESS]: '#155724',
  [ALERT_TYPES.INFO]: '#0c5460',
  [ALERT_TYPES.WARNING]: '#856404',
  [ALERT_TYPES.ERROR]: '#721c24'
};

const BG_COLOR_MAP = {
  [ALERT_TYPES.SUCCESS]: '#d4edda',
  [ALERT_TYPES.INFO]: '#d1ecf1',
  [ALERT_TYPES.WARNING]: '#fff3cd',
  [ALERT_TYPES.ERROR]: '#f8d7da'
};

const AlertPanel = ({ type, text, style, onClose, notClosable, ...rest }) => {
  const [visible, setVisible] = useState(true);
  const color = COLOR_MAP[type];
  const bgColor = BG_COLOR_MAP[type];

  useEffect(() => {
    setVisible(true);
  }, [text]);

  const onPanelClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!visible || !text) {
    return null;
  }

  return (
    <Box
      display="flex"
      position="relative"
      py={2}
      pr={4}
      pl={2}
      my={2}
      color={color}
      bgcolor={bgColor}
      alignItems="center"
      width={1}
      {...rest}
    >
      <Typography variant="body2" style={style} children={text} />
      {!notClosable && (
        <Box position="absolute" right={10} top={10}>
          <IconButton
            onClick={onPanelClose}
            aria-label="close"
            style={{ padding: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

AlertPanel.propTypes = {
  type: PropTypes.oneOf(Object.values(ALERT_TYPES)),
  text: PropTypes.string,
  style: PropTypes.any,
  onClose: PropTypes.func,
  notClosable: PropTypes.bool,
  variant: PropTypes.string
};

AlertPanel.defaultProps = {
  type: ALERT_TYPES.INFO
};

export default AlertPanel;
