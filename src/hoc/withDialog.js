import React, { useState, useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const StyledDialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          arial-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const withDialog = WrappedComponent => {
  const WithDialog = props => {
    const [open, setOpen] = useState(true);
    const handleDialogClose = useCallback(() => {
      setOpen(false);
    }, []);
    return (
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={false}
        disableEscapeKeyDown={true}
        onExited={props.onExited}
      >
        <StyledDialogTitle onClose={handleDialogClose} />
        <WrappedComponent closeDialog={handleDialogClose} {...props} />
      </Dialog>
    );
  };
  return WithDialog;
};

export default withDialog;
