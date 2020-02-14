import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Button from './Button';

const Dialog = ({ title, onClose, actions, children, open, ...rest }) => (
  <MuiDialog onClose={onClose} open={open} {...rest}>
    <Box
      display="flex"
      justifyContent="flex-end"
      position="absolute"
      width={1}
      height="51.5px"
      zIndex={1}
    >
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
    <Box mt="51.5px">
      {title && <MuiDialogTitle id="dialog-title">{title}</MuiDialogTitle>}
      {children}
      {!!actions.length && (
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          {actions.map((action, index) => (
            <Button
              key={`btn_${index.toString()}`}
              className={action.className}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  </MuiDialog>
);

Dialog.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
      className: PropTypes.any
    })
  ),
  open: PropTypes.bool.isRequired,
  children: PropTypes.node
};

Dialog.defaultProps = {
  actions: []
};

export default Dialog;
